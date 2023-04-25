class AuthController < ApplicationController
  include ActionController::Cookies
  skip_before_action :authorized, only: [:login, :signup, :refresh]
  rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found

  def refresh
    if cookies[:refresh_token]
      token = RefreshToken.find_by!(value: cookies[:refresh_token])
      if token&.active?
        # TODO: Need to add logic here for rolling the token if it's at less than half-life.
        @user = token.user
        @jwt = encode_token(user_id: @user.id)
        render json: {
          user: UserSerializer.new(@user),
          token: @jwt
        }, status: :accepted
      end
    else
      render json: { message: 'No refresh token available.'}, status: :unauthorized
    end

  end

  def login
    @user = User.find_by!(email: login_params[:email])
    if @user.authenticate(login_params[:password])
      @token = encode_token(user_id: @user.id)
      refresh_token = RefreshToken.create!({ user: @user, expires: Time.now.utc + 30.days, value: SecureRandom.hex(64) })
      cookies[:refresh_token] = {
        :value => refresh_token.value,
        :expires => Time.now.utc + 30.days,
        :path => "/auth/refresh",
        # :httponly => true,
        :same_site => :none,
        :domain => :all,
        # :secure => true,
        # :samesite => :lax,
      }

      render json: {
        user: UserSerializer.new(@user),
        token: @token
      }, status: :accepted

    else
      render json: {message: 'Invalid password.'}, status: :unauthorized
    end
  end

  def signup
    user = User.create!(signup_params)
    @token = encode_token(user_id: user.id)

    refresh_token = RefreshToken.create!({
                      user: user,
                      expires: Time.now.utc + 30.days,
                      value: SecureRandom.hex(64)})     # XXX - Move this initialization into the model
    Rails.logger.info refresh_token

    request.cookies[:refresh_token] = {
      :value => refresh_token.value,
      :expires => Time.now.utc + 30.days,
      :httponly => true,
      # :secure => true,
      # :samesite => :lax,
    }
    render json: {
      user: UserSerializer.new(user),
      token: @token
    }, status: :created
  end

  private

  def login_params
    params.permit(:email, :password)
  end

  def signup_params
    params.permit(:email, :password, :givenName, :surname)
  end

  def check_refresh_token(to_validate)
    if to_validate
      @refresh_token = RefreshToken.find_by!(value: to_validate)
      @refresh_token.active?
    end

    false
  end

  def handle_record_not_found(e)
    render json: { message: "User does not exist."}, status: :unauthorized
  end
end

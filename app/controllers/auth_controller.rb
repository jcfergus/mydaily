class AuthController < ApplicationController
  skip_before_action :authorized, only: [:login, :signup]
  rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found

  def login
    @user = User.find_by!(email: login_params[:email])
    if @user.authenticate(login_params[:password])
      # if cookies[:refresh_token]
      #   new_refresh_token = supercede_refresh_token(cookies[:refresh_token])
      # else
      #   new_refresh_token = RefreshToken.issue
      # end
      @token = encode_token(user_id: @user.id)
      if cookies[:refresh_token]
        # Check existing refresh token expiration - if it's less than 7 days out, renew it.
      else
        refresh_token = RefreshToken.create!({ user: @user, expires: Time.now.utc + 30.days, value: SecureRandom.hex(64) })
        cookies[:refresh_token] = {
          :value => refresh_token.value,
          :expires => Time.now.utc + 30.days,
          :httponly => true,
          # :secure => true,
          # :samesite => :lax,
        }
      end

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

require "test_helper"

class AuthControllerTest < ActionDispatch::IntegrationTest
  test "should sign up a new user" do
    post auth_signup_url, params: { givenName: "justin", surname: "ferguson", password: "Testtest1!", email: "jferg@lusars.net" }, as: :json, xhr: true
    assert_response :success

    assert "Got a refresh token", @response.cookies[:refresh_token]

    result = JSON.parse(@response.body)

    assert result["token"]
    assert result["user"]["email"] == "jferg@lusars.net"
    assert !result["password"]
  end

  test "should log in an existing user" do
    post auth_signup_url, params: { givenName: "justin", surname: "ferguson", password: "Testtest1!", email: "jferg@lusars.net" }, as: :json, xhr: true
    post auth_login_url, params: { email: "jferg@lusars.net", password: "Testtest1!" }
    assert_response :success
  end

end

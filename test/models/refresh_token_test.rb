require "test_helper"

class RefreshTokenTest < ActiveSupport::TestCase
  test "check active check" do
    assert refresh_tokens(:valid_token).active?
    assert !refresh_tokens(:expired_token).active?
    assert !refresh_tokens(:superceded_token).active?
    assert !refresh_tokens(:revoked_token).active?
  end

  test "superceded check" do
    assert refresh_tokens(:superceded_token).superceded?
    assert !refresh_tokens(:valid_token).superceded?
  end

  test "check expiration checking" do
    assert refresh_tokens(:expired_token).expired?
    assert !refresh_tokens(:valid_token).expired?
  end

  test "check revocation checking" do
    assert refresh_tokens(:revoked_token).revoked?
    assert !refresh_tokens(:valid_token).revoked?
  end
end

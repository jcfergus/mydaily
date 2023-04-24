class RefreshToken < ApplicationRecord
  belongs_to :user
  belongs_to :supercededBy, class_name: :RefreshToken, optional: true

  def active?
    !expired? and !superceded? and !revoked?
  end

  # Below here should be private but needs to be testable
  # private

  def superceded?
    !!supercededBy
  end

  def expired?
    expires.utc < Time.now.utc
  end

  def revoked?
    !!revokedAt
  end
end

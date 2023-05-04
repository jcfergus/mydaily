class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :givenName, :surname, :username
end

# frozen_string_literal: true

module Types
  class UserUpdateInputType < Types::BaseInputObject
    description "An update to a MyDaily user record"
    argument :givenName, String, required: false
    argument :password, String, required: false
    argument :surname, String, required: false
    argument :email, String, required: false
    argument :username, String, required: false
    argument :userAvatar, String, required: false
  end
end


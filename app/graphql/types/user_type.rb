# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    description "A MyDaily user record."
    field :id, ID, null: false
    field :givenName, String
    field :surname, String
    field :email, String
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end

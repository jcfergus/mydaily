# frozen_string_literal: true

module Types
  class SummaryType < Types::BaseObject
    description "A user-specific summary of an item."
    field :id, ID, null: false
    field :title, String
    field :text, String
    field :version, Integer
    field :user_id, Types::UuidType
    field :item_id, Types::UuidType
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end

# frozen_string_literal: true

module Types
  class ItemType < Types::BaseObject
    description "A MyDaily news item."
    field :id, ID, null: false
    field :title, String
    field :fulltext, String
    field :type, String
    field :sourceUrl, String
    field :feed, String
    field :user_id, Types::UuidType
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end

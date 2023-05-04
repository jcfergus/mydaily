require 'test_helper'
require_relative '../../graphql_test_helpers'
include GraphQL::TestHelpers

class UserUpdateTest < ActiveSupport::TestCase
  MUTATION_TYPE = "updateUser"

  MUTATION_STRING = <<-GQL
      mutation #{MUTATION_TYPE}($userId: ID!, $updates: UserUpdateInput!) {
        #{MUTATION_TYPE}(userId: $userId, updates: $updates) {
          user {
            id
            givenName
            surname
            username
          }
        }
      }
  GQL

  test "updates a user" do
    user_id = users(:good_user).id
    updates = { username: "jferg" }

    result = mutation MUTATION_STRING,
             variables: {
               userId: user_id,
               updates: updates,
             },
             context: {}

    assert result.data[MUTATION_TYPE]["user"]["username"] == "jferg"
  end

  test "fails to update a nonexistant user" do
    user_id = "abc1234"
    updates = { username: "jferg" }

    result = mutation MUTATION_STRING,
                      variables: {
                        userId: user_id,
                        updates: updates,
                      },
                      context: {}

    puts result.errors
    assert result.errors != nil

  end
end
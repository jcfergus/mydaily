require_relative '../types/user_update_input'

class Mutations::UserUpdateMutation < Mutations::BaseMutation
  argument :user_id, ID, required: true, loads: Types::UserType, prepare: ->(id, _ctx) { GraphQL::Schema::UniqueWithinType.encode("User", id) }
  argument :updates, Types::UserUpdateInputType, required: true

  field :user, Types::UserType, null: false
  field :errors, [String], null: false

  def resolve(user: nil, updates: nil)

    if user
      user.update(**updates)
      user.save

      { user: user }
    else
      GraphQL::ExecutionError.new("Record not found.")
    end

  rescue ActiveRecord::RecordInvalid => e
    GraphQL::ExecutionError.new("Invalid input: #{e.record.errors.full_messages.join(', ')}")
  end
end


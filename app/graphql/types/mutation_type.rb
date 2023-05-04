module Types
  class MutationType < Types::BaseObject
    field :updateUser, mutation: Mutations::UserUpdateMutation
  end
end

# https://dev.to/rjrobinson/testing-graphql-ruby-mutations-with-rspec-3ngc

module GraphQL::TestHelpers
  attr_accessor :gql_response

  class GQLResponse
    attr_reader :data, :errors

    def initialize(args)
      @data = args['data'] || nil
      @errors = args['errors'] || nil
    end
  end

  def query(query, variables: {}, context: {})
    converted = variables.deep_transform_keys! { |key| key.to_s.camelize(:lower)} || {}
    res = MydailySchema.execute(query, variables: converted, context: context, operation_name: nil)
    @gql_response = GQLResponse.new(res.to_h)
  end

  alias_method :mutation, :query
end
class MydailySchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)

  # For batch-loading (see https://graphql-ruby.org/dataloader/overview.html)
  use GraphQL::Dataloader

  # GraphQL-Ruby calls this when something goes wrong while running a query:
  def self.type_error(err, context)
    # if err.is_a?(GraphQL::InvalidNullError)
    #   # report to your bug tracker here
    #   return nil
    # end
    super
  end

  # Union and Interface Resolution
  def self.resolve_type(abstract_type, obj, ctx)
    type_class = "::Types::#{obj.class}Type".safe_constantize

    raise ArgumentError, "Cannot resolve type of class #{obj.class.name}" unless type_class.present?

    type_class
  end

  # Stop validating when it encounters this many errors:
  validate_max_errors(100)

  def self.id_from_object(obj, type_definition, query_ctx)
    GraphQL::Schema::UniqueWithinType.encode(obj.class.name, obj.id)
  end

  # Given a string UUID, find the object
  def self.object_from_id(global_id, query_ctx)
    return unless global_id.present?

    record_class_name, record_id = GraphQL::Schema::UniqueWithinType.decode(global_id)
    record_class = record_class_name.safe_constantize

    record_class&.find_by id: record_id
  end
end

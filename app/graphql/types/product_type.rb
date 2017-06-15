Types::ProductType = GraphQL::ObjectType.define do
  name "Product"
  field :id,types.Int
  field :title,types.String
  field :spec,types.String
  field :category,Types::CategoryType
end

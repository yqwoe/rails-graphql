Types::CategoryType = GraphQL::ObjectType.define do
  name "Category"
  field :id,types.Int
  field :name,types.String
  field :parent,Types::CategoryType
  field :children,types[Types::CategoryType]
end

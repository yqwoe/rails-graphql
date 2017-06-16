Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  # Add root-level fields here.
  # They will be entry points for queries on your schema.

  field :products do
    type Types::ProductType
    argument :id,!types.ID
    description "根据id查找Product"
    resolve ->(obj,args,ctx) {Product.find_by_id(args["id"])}
  end
  field :category do
    type Types::CategoryType
    argument :id,!types.ID
    description "根据id查找分类信息"
    resolve ->(obj,args,ctx) {::Category.includes(:parent,:children).find_by_id(args["id"])}
  end
  field :create_or_update_categories do
    type Types::CategoryType
    argument :id,types.ID
    argument :name,types.String
    argument :parent_id,types.ID
    description "创建商品分类信息"
    resolve ->(obj,args,ctx) {
      id=args["id"]
      params=args.to_h.select{|k,v| k != "id"}
      category=nil
      if id.present?
        category=Category.find_by_id(id)
        category.update(params)
      else
        category=Category.create!(params)
      end
      category
    }
  end
  field :create_or_update_products do
    type Types::ProductType
    argument :id,types.ID
    argument :title,types.String
    argument :spec,types.String
    argument :category_id,types.ID
    description "创建商品信息"
    resolve ->(obj,args,ctx) {
      id=args["id"]
      params=args.to_h.select{|k,v| k != "id"}
      product=nil
      if id.present?
        product=Product.find_by_id(id)
        product.update(params)
      else
        product=Product.create!(params)
      end
      product
    }
  end
  field :delete_products do
    type Types::ProductType
    argument :id,!types.ID
    description "删除商品信息"
    resolve ->(obj,args,ctx) {
      id=args["id"]
      product=Product.find_by_id(id)
      if product.present?
        product.destroy!
      end

    }
  end
end

class User < ApplicationRecord
  has_one     :transfer_address
  has_one     :payment_method
  has_many    :buyed_items, foreign_key: "buyer_id", class_name: "ProductsStatus"
  has_many    :selling_items, -> { where("buyer_id is NULL") }, foreign_key: "seller_id", class_name: "ProductsStatus"
  has_many    :sold_items, -> { where("buyer_id is not NULL") }, foreign_key: "seller_id", class_name: "ProductsStatus"
  has_many    :goods
  has_many    :products, through: :goods
  has_many    :sale_orders
  has_many    :transfer_orders
  has_many    :buyer_evaluations
end

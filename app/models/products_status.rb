class ProductsStatus < ApplicationRecord
  belongs_to :buyer, class_name: 'User', foreign_key: 'buyer_id'
  belongs_to :saler, class_name: 'User', foreign_key: 'seller_id'
  has_many :canseling_products
  has_many :todos
  has_many :goods
  has_many :user, through: :goods
end

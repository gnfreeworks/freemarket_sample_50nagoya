class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  
  # devise :database_authenticatable, :registerable,
  #       :recoverable, :rememberable, :validatable
  
  # set association
  has_one    :payment_method
  has_many   :buyer, class_name: 'ProductsStatus', foreign_key: 'buyer_id'
  has_many   :saler, class_name: 'ProductsStatus', foreign_key: 'seller_id'
  has_many   :goods
  has_many   :products, through: :goods
  has_many   :sale_orders
  has_many   :transfer_orders
  has_many   :buyer_evaluations
end

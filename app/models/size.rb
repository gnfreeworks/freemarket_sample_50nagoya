class Size < ApplicationRecord

  has_many  :sizes_categories
  has_many  :categories, through: :sizes_categories

end

class Category < ApplicationRecord

  belongs_to  :large_category
  belongs_to  :medium_category
  belongs_to  :small_category
  has_many    :sizes_categories
  has_many    :sizes, through: :sizes_categories

end

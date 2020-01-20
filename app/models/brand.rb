class Brand < ApplicationRecord

  def self.brand_search(search)
    return Brand.all() unless search
    Brand.where('name LIKE(?)', "%#{search}%")
  end

end

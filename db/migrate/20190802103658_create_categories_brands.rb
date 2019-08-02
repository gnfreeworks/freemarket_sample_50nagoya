class CreateCategoriesBrands < ActiveRecord::Migration[5.2]
  def change
    create_table :categories_brands do |t|

      t.integer :category_id
      t.integer :brand_id
    end
  end
end

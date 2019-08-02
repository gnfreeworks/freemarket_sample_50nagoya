class CreateCategoriesBrands < ActiveRecord::Migration[5.2]
  def change
    create_table :categories_brands do |t|

      t.references :category, foreign_key: true
      t.references :brand, foreign_key: true
    end
  end
end

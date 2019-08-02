class CreateCategoriesBrands < ActiveRecord::Migration[5.2]
  def change
    create_table :categories_brands do |t|

      t.bigint :category, foreign_key: true
      t.bigint :brand, foreign_key: true
    end
  end
end

class CreateSizesCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :sizes_categories do |t|

      t.references :category, foreign_key: true
      t.references :size, foreign_key: true
      t.timestamps
    end
  end
end

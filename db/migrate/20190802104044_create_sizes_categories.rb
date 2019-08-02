class CreateSizesCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :sizes_categories do |t|

      t.integer :category_id
      t.integer :size_id
    end
  end
end

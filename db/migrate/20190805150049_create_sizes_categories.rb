class CreateSizesCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :sizes_categories, options: "DEFAULT CHARSET=utf8" do |t|

      t.references :size, foreign_key: true
      t.integer :category_parent_id,          null: false
      t.integer :category_children_id,        null: false
      t.integer :category_grandchild_id
      t.timestamps
    end
  end
end

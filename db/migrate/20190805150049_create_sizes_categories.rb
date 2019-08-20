class CreateSizesCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :sizes_categories, options: "DEFAULT CHARSET=utf8" do |t|

      t.references :category, foreign_key: true
      t.references :size, foreign_key: true
      t.timestamps
    end
  end
end

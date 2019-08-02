class CreateSizesCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :sizes_categories do |t|

      t.bigint :category, foreign_key: true
      t.bigint :size_id, foreign_key: true
    end
  end
end

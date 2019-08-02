class CreateCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :categories do |t|

      t.integer :large_category_id, null: false
      t.integer :medium_category_id, null: false
      t.integer :smail_category_id, null: false
    end
  end
end

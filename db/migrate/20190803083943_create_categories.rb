class CreateCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :categories, options: "DEFAULT CHARSET=utf8" do |t|
      t.integer :parent_id,          null: false
      t.integer :children_id,     null: false
      t.integer :grandchild_id,   null: false
      t.timestamps
    end
  end
end

class CreateProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :products, options: "DEFAULT CHARSET=utf8" do |t|
      t.string  :name,          null: false
      t.text    :description,   null: false
      t.integer :price,         null: false
      t.integer :profit,        null: false
      t.integer :area_id,       null: false
      t.string  :brand
      t.integer :size_id
      t.integer :category_parent_id,          null: false
      t.integer :category_children_id,        null: false
      t.integer :category_grandchild_id
      t.references :sale_charge,     foreign_key: true
      t.references :status,          foreign_key: true
      t.references :shipping_charge, foreign_key: true
      t.references :shipping_time,   foreign_key: true
      t.timestamps
    end
  end
end

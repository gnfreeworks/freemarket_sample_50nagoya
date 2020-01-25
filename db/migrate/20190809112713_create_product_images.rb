class CreateProductImages < ActiveRecord::Migration[5.0]
  def change
    create_table :product_images, options: "DEFAULT CHARSET=utf8" do |t|
      t.integer :product_id, null: false
      t.string :url, null: false
      t.timestamps
    end
  end
end

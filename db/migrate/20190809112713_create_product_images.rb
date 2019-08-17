class CreateProductImages < ActiveRecord::Migration[5.0]
  def change
    create_table :product_images do |t|
      t.bigint :product_id, null: false
      t.text :url, null: false
      t.timestamps
    end
  end
end

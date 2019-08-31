class CreateProductsStatuses < ActiveRecord::Migration[5.0]
  def change
    create_table :products_statuses, options: "DEFAULT CHARSET=utf8" do |t|
      t.references :product, foreign_key: true
      t.integer :buyer_id       
      t.integer :seller_id       
      t.integer :saling_status  ,null: false
      t.integer :deading_status ,null: false
      t.timestamps
    end
  end
end

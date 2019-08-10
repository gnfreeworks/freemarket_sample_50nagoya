class CreateSaleOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :sale_orders do |t|
      t.bigint :user_id, null: false
      t.integer :sale, null: false
      t.timestamps
    end
  end
end

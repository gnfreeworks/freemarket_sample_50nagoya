class CreateTransferOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :transfer_orders do |t|
      t.bigint  :user_id, null: false
      t.integer :sale, null: false
      t.timestamps
    end
  end
end

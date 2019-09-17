class CreateTransferOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :transfer_orders, options: "DEFAULT CHARSET=utf8" do |t|
      t.integer    :user_id, null: false
      t.integer    :sale, null: false
      t.timestamps
    end
  end
end

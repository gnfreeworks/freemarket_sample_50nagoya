class CreateSaleOrders < ActiveRecord::Migration[5.0]
  def change
    create_table :sale_orders, options: "DEFAULT CHARSET=utf8" do |t|
      t.integer    :user_id, null: false
      t.integer    :status, null: false
      t.timestamps
    end
  end
end

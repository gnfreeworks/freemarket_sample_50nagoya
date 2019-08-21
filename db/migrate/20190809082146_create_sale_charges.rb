class CreateSaleCharges < ActiveRecord::Migration[5.0]
  def change
    create_table :sale_charges, options: "DEFAULT CHARSET=utf8mb4" do |t|
      t.float :rate,  null: false
      t.timestamps
    end
  end
end

class CreateSaleCharges < ActiveRecord::Migration[5.0]
  def change
    create_table :sale_charges do |t|
      t.float :rate,  null: false
      t.timestamps
    end
  end
end

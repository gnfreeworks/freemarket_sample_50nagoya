class ChangeFloatChargeToSalecharge < ActiveRecord::Migration[5.2]
  def change
    change_column :sale_charges, :charge, :float
  end
end

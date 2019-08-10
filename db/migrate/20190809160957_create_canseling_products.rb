class CreateCanselingProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :canseling_products do |t|
      t.bigint  :products_status_id, null: false
      t.integer :status, null: false
      t.timestamps
    end
  end
end

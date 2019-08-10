class CreateProductsStatuses < ActiveRecord::Migration[5.2]
  def change
    create_table :products_statuses do |t|
      t.references :product,        foreign_key: true
      t.references :buyer,          foreign_key: { to_table: :users }
      t.references :saler,          foreign_key: { to_table: :users }
      t.integer    :saling_status,  null: false
      t.integer    :deading_status, null: false

      t.timestamps
    end
  end
end

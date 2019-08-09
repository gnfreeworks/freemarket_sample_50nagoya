class CreatePaymentMethods < ActiveRecord::Migration[5.2]
  def change
    create_table :payment_methods do |t|
      t.bigint :user_id, null: false
      t.integer :card_number, null: false
      t.integer :expiration_year, null: false
      t.integer :expiration_month, null: false
      t.integer :security_code, null: false
      t.timestamps
    end
  end
end

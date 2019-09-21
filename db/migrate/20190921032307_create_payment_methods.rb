class CreatePaymentMethods < ActiveRecord::Migration[5.0]
  def change
    create_table :payment_methods, options: "DEFAULT CHARSET=utf8" do |t|
      t.references :user, foreign_key: true
      t.string     :card_number, null: false
      t.integer    :expiration_year, null: false
      t.integer    :expiration_month, null: false
      t.integer    :secrity_code, null: false
      t.timestamps
    end
  end
end

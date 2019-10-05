class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users, options: "DEFAULT CHARSET=utf8" do |t|
      t.string  :nickname, null: false
      t.string  :first_name, null: false
      t.string  :last_name, null: false
      t.string  :first_kananame, null: false
      t.string  :last_kananame, null: false
      t.integer :birthday_year, null: false
      t.integer :birthday_month, null: false
      t.integer :birthday_day, null: false
      t.string  :maildaddress, null: false, unique: true
      t.string  :password
      t.text    :profiletext
      t.string  :address_phone_number
      t.string  :address_first_name
      t.string  :address_last_name
      t.string  :address_firt_kananame
      t.string  :address_last_kananame
      t.integer :address_zipcode
      t.string  :address_prefecture
      t.string  :address_block
      t.string  :address_number
      t.string  :address_building
      t.timestamps
    end
  end
end

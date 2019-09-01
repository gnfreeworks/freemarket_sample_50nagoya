class AddFirstnameToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :first_name, :string, null: false
    add_column :users, :last_name, :string, null: false
    add_column :users, :first_kananame, :string, null: false
    add_column :users, :last_kananame, :string, null: false
    add_column :users, :birthday_year, :integer, null: false
    add_column :users, :birthday_month, :integer, null: false
    add_column :users, :birthday_day, :integer, null: false
    add_column :users, :address_phone_number, :integer
    add_column :users, :address_first_name, :string, null: false
    add_column :users, :address_last_name, :string, null: false
    add_column :users, :address_firt_kananame, :string, null: false
    add_column :users, :address_last_kananame, :string, null: false
    add_column :users, :address_number, :integer, null: false
    add_column :users, :address_prefecture, :string, null: false
    add_column :users, :address_block, :string, null: false
    add_column :users, :address_building, :string
    add_column :users, :encrypted_password, null: false
    add_column :users, :password_confirmation, null: false
  end
end

class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users, options: "DEFAULT CHARSET=utf8" do |t|
      t.string :name, null: false
      t.string :kananame, null: false
      t.date :birthdaydate, null: false
      t.string :nickname
      t.string :maildaddress, null: false, unique: true
      t.string :password
      t.text :profiletext
      t.integer :authenticphonenumber, unique: true
      t.timestamps
    end
  end
end

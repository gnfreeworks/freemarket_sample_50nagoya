class CreateTransferAddresses < ActiveRecord::Migration[5.0]
  def change
    create_table :transfer_addresses, options: "DEFAULT CHARSET=utf8" do |t|
      t.references  :user, foreign_key: true
      t.references  :bank, foreign_key: true
      t.integer     :account_type_id, null: false
      t.integer     :branch_code, null: false
      t.string      :account_number, null: false
      t.string      :account_fistname, null: false
      t.string      :account_lastname, null: false
      t.timestamps
    end
  end
end

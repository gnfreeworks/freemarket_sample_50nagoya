class CreateTransferAddresses < ActiveRecord::Migration[5.2]
  def change
    create_table :transfer_addresses do |t|
      t.bigint :user_id, null: false
      t.references :bank, foreign_key: true
      t.integer :account_type_id, null: false
      t.integer :branch_code, null: false
      t.integer :account_number, null: false
      t.string  :account_fistname, null: false
      t.string  :acctoun_lastname, null: false
      t.timestamps
    end
  end
end

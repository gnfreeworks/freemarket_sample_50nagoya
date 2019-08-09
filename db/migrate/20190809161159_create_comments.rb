class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.bigint :product_stauts_id,  null: false
      t.bigint :user_id,            null: false
      t.text   :comment,            null: false
      t.timestamps
    end
  end
end

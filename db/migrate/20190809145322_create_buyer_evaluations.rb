class CreateBuyerEvaluations < ActiveRecord::Migration[5.2]
  def change
    create_table :buyer_evaluations do |t|
      t.bigint :products_staut_id, null: false
      t.bigint :user_id, null: false
      t.references :evaluation , foreign_key: true
      t.timestamps
    end
  end
end

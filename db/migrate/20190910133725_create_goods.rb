class CreateGoods < ActiveRecord::Migration[5.0]
  def change
    create_table :goods, options: "DEFAULT CHARSET=utf8" do |t|
      t.references :products_status, foreign_key: true
      t.integer    :user_id, null: false
      t.timestamps
    end
  end
end

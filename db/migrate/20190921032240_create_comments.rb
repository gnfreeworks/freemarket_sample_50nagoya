class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments, options: "DEFAULT CHARSET=utf8" do |t|
      t.references :products_status, foreign_key: true
      t.integer    :user_id, null: false
      t.text       :text, null: false
      t.timestamps
    end
  end
end

class CreateTodos < ActiveRecord::Migration[5.2]
  def change
    create_table :todos do |t|
      t.bigint  :product_stauts_id, null: false
      t.bigint  :user_id,           null: false
      t.text    :todo,              null: false
      t.integer :status,            null: false
      t.timestamps
    end
  end
end

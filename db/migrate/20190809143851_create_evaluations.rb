class CreateEvaluations < ActiveRecord::Migration[5.2]
  def change
    create_table :evaluations do |t|
      t.string  :name, null: false
      t.text    :icon
      t.timestamps
    end
  end
end

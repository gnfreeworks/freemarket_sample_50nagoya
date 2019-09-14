class CreateEvaluations < ActiveRecord::Migration[5.0]
  def change
    create_table :evaluations, options: "DEFAULT CHARSET=utf8" do |t|
      t.string :name
      t.string :icon
      t.timestamps
    end
  end
end

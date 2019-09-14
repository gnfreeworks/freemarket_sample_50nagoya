class CreateCanselingProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :canseling_products, options: "DEFAULT CHARSET=utf8" do |t|
      t.references :products_status, foreign_key: true
      t.integer    :status, null: false
      t.timestamps
    end
  end
end

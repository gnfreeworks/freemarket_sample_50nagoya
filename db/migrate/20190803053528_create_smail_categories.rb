class CreateSmailCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :smail_categories, options: "DEFAULT CHARSET=utf8mb4" do |t|

      t.string :name
      t.timestamps
    end
  end
end

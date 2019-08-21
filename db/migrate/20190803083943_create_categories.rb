class CreateCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :categories, options: "DEFAULT CHARSET=utf8" do |t|
      t.references :large_category,    foreign_key: true
      t.references :medium_category,   foreign_key: true
      t.references :smail_category, foreign_key: true
      t.timestamps
    end
  end
end

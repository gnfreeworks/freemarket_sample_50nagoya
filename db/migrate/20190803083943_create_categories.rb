class CreateCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :categories do |t|

      t.references :large_category, foreign_key: true
      t.references :medium_category, foreign_key: true
      t.references :smail_category, foreign_key: true
      t.timestamps
    end
  end
end

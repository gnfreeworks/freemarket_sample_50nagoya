class CreateCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :categories do |t|

      t.bigint :large_category_id, foreign_key: true
      t.bigint :medium_category_id, foreign_key: true
      t.bigint :smail_category_id, foreign_key: true
    end
  end
end

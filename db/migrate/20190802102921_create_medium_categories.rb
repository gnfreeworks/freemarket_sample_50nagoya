class CreateMediumCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :medium_categories do |t|

      t.string :name
      t.timestamps
    end
  end
end

class CreateSamailCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :samail_categories do |t|

      t.string :name
    end
  end
end

class AddAncestryToViewCategory < ActiveRecord::Migration[5.0]
  def change
    add_column :view_categories, :ancestry, :string
    add_index :view_categories, :ancestry
  end

  def down
    remove_index :view_categories, :ancestry
    remove_column :view_categories, :ancestry
  end
  
end

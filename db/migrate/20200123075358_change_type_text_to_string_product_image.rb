class ChangeTypeTextToStringProductImage < ActiveRecord::Migration[5.0]
  def change
    change_column :product_images, :url, :string
  end
end

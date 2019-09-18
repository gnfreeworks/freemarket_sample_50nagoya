class AddColumnProducts < ActiveRecord::Migration[5.0]
  def change
    add_reference :products, :shipping_method, foreign_key: true
  end  
end

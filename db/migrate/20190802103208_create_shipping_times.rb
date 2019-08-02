class CreateShippingTimes < ActiveRecord::Migration[5.2]
  def change
    create_table :shipping_times do |t|

      t.string :name
    end
  end
end

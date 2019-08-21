class CreateShippingTimes < ActiveRecord::Migration[5.0]
  def change
    create_table :shipping_times, options: "DEFAULT CHARSET=utf8" do |t|

      t.string :name
      t.timestamps
    end
  end
end

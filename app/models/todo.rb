class Todo < ApplicationRecord
  belongs_to :user
  belongs_to :products_status
end

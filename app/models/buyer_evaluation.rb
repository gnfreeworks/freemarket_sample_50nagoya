class BuyerEvaluation < ApplicationRecord
  belongs_to :products_status
  belongs_to :user
  belongs_to :evaluation
end

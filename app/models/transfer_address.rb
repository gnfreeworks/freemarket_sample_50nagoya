class TransferAddress < ApplicationRecord
  belongs_to :bank

  # refer to active has github(https://github.com/zilkey/active_hash/blob/master/README.md)
  extend ActiveHash::Associations::ActiveRecordExtensions
  belongs_to_active_hash :AccountType
end

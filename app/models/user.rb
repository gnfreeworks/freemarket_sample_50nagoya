class User < ApplicationRecord
  def name
    firstname + lastname
  end
  def kananame
    firstkananame + lastkananame
  end

  def set_extra_information
    {:name => name, :kananame => kananame}
  end
end

class ProductsController < ApplicationController
  include CommonActions
  before_action :set_categories, only: :index

  def index
  end
end

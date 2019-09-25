Rails.application.routes.draw do
  root 'products#index'

  resources :products

  get 'products_statuses' => 'products_statuses#index'
end

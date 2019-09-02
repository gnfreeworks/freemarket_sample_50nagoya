Rails.application.routes.draw do
  root 'products#index'

  resources :products
  resources :users, only: :index do
    resources :mypage, only: :index 
  end
end

Rails.application.routes.draw do
  devise_for :users
  root 'products#index'
  
  resources :products
  resources :signup do
    collection do
      get   'step0'
      get   'step1'
      post  'step2'
      post  'step3'
      post  'step4'
      post  'step5'
      post  'done' 
    end
  end
  get 'signup/show' => 'signup#show'
  get 'products_statuses' => 'products_statuses#index'
  get 'products_buy' => 'products_statuses#buy'

  resources :users, only: :index do
    resources :mypage, only: :index do
      collection do
        get   'profile'
        post  'profileUpdate'
        get   'card'
        get   'cardCreate'
        post  'cardAdd'
        get   'logout'
      end
    end
  end
end

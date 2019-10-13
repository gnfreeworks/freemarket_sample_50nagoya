Rails.application.routes.draw do
  root 'products#index'
  
  resources :products

  get 'products_statuses' => 'products_statuses#index'

  resources :users, only: :index do
    resources :mypage, only: :index do
      collection do
        get   'profile'
        post  'profileUpdate'
        get   'card'
        get   'cardCreate'
        post  'cardAdd'

      end
    end
  end
end

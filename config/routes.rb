Rails.application.routes.draw do
  root 'products#index'
  
  resources :products
  resources :products_statuses
  
  resources :users, only: :index do
    resources :mypage, only: :index do
      collection do 
        get   'notification'
        get   'card'
        get   'profile'
        post  'profileupdate'

      end
    end
  end
end

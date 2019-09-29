Rails.application.routes.draw do
  root 'products#index'
  
  resources :products

  get 'products_statuses' => 'products_statuses#index'
  get 'products_buy' => 'products_statuses#buy'

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

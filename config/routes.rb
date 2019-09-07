Rails.application.routes.draw do
  root 'products#index'

  resources :products
  resources :users, only: :index do
    resources :mypage, only: :index do
      collection do 
        get 'notification'
        get 'card'
      end
    end
  end
end

Rails.application.routes.draw do
  root 'products#index'
  
  resources :products

  get 'products_statuses' => 'products_statuses#index'

  resources :users, only: :index do
    resources :mypage, only: :index do
      collection do 
        get   'notification'
        get   'profile'
        post  'profileupdate'
        get   'card'
        get   'cardcreate'
        post  'cardadd'

      end
    end
  end

end

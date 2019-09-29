Rails.application.routes.draw do
  root 'products#index'
  
  resources :products
  resources :signup do
    collection do
      get 'step0'
      get 'step1'
      get 'step2'
      get 'step3'
      get 'step4'
      get 'step5'
      get 'done' 
    end
  end

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

Rails.application.routes.draw do
  devise_for :users
  root 'search#index'
  
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

  resources :products_statuses, only: :show

  get 'signup/show' => 'signup#show'
  get 'products_buy' => 'products_statuses#buy'

  get 'sell' => 'sell#new'
  resources :sell, only: [:create,:show, :edit, :destroy] do
    collection do
      #Ajaxで動くアクションのルートを作成
      get 'get_category_children', defaults: { format: 'json' }
      get 'get_category_grandchildren', defaults: { format: 'json' }
      get 'get_size', defaults: { format: 'json' }
      get 'get_method', defaults: { format: 'json' }
    end
  end

  resources :mypage, only: :index do
    collection do
      get    'profile'
      post   'profileUpdate'
      get    'card'
      get    'cardcreate'
      post   'cardAdd'
      delete 'cardDestroy'
      get    'logout'
      get    'identification'
      post   'identificationSave'
    end
  end
end

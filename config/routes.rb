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

  resources :products_statuses, only: [:show, :destroy] do
    collection do
      post 'resume_sell'
      post 'pause_sell'
      get 'buy/:id' => 'products_statuses#buy', as: :buy
      get 'buy_confirm/:id' => 'products_statuses#buy_confirm', as: :buy_confirm
    end
  end

  get 'signup/show' => 'signup#show'

  get 'sell' => 'sell#new'
  get 'sell/edit/:id' => 'sell#edit', as: :sell_edit
  patch 'sell/edit/:id' => 'sell#update'

  resources :sell, only: [:create,:destroy] do
    collection do
      #Ajaxで動くアクションのルートを作成
      get 'get_category_children', defaults: { format: 'json' }
      get 'get_category_grandchildren', defaults: { format: 'json' }
      get 'get_size', defaults: { format: 'json' }
      get 'get_method', defaults: { format: 'json' }
      get 'get_brand', defaults: { format: 'json' }  #brandモデルにメソッド記載
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
      
      resources :listings do
        get   'listing'
        get   'in_progress'
        get   'completed'
      end

      resources :items, only: :show do

      end

    end
  end
end

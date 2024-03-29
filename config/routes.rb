Rails.application.routes.draw do

  #users::audio_settings
  put    "api/users/audio_settings" => "users/audio_settings#update"
  #users
  get    "api/users"     => "users#show"
  post   "api/users"     => "users#create"
  put    "api/users" => "users#update"
  delete "api/users" => "users#destroy"
  #sessions
  post   "api/sessions"     => "sessions#create"
  delete "api/sessions" => "sessions#destroy"
  #books
  get    "api/books"          => "books#index"
  post   "api/books/"         => "books#create"
  put    "api/books/:book_id" => "books#update"
  delete "api/books/:book_id" => "books#destroy"
  #voices
  get    "api/books/:book_id/voices"     => "voices#index"
  post   "api/books/:book_id/voices"     => "voices#create"
  put    "api/books/:book_id/voices/:id" => "voices#update"
  delete "api/books/:book_id/voices/:id" => "voices#destroy"
  #cards
  get    "api/books/:book_id/cards"          => "cards#index"
  get    "api/books/:book_id/cards/:card_id" => "cards#show_detail"
  post   "api/books/:book_id/cards"          => "cards#create"
  put    "api/books/:book_id/cards/:card_id" => "cards#update"
  delete "api/books/:book_id/cards/:card_id" => "cards#destroy"
  #views
  root "top_pages#index"
  get  "login/"                         => "top_pages#index"
  get  "signup"                         => "top_pages#index"
  get  "books/"                         => "top_pages#index"
  get  "books/:book_id/cards/:card_id/" => "top_pages#index"
  # oauth
  match 'auth/:provider/callback', to: 'sessions#oauth', via: [:get, :post]
  match 'auth/failure', to: redirect('/'), via: [:get, :post]
  # 404
  get '*path' => "top_pages#index"

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end

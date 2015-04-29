Rails.application.routes.draw do

  #users
  get "users" => "users#show"
  resources :users, only: [:create, :update, :destroy]
  #sessions
  resources :sessions, only: [:create, :destroy]
  #books
  get    "books"          => "books#index"
  post   "books/"         => "books#create"
  put    "books/:book_id" => "books#update"
  delete "books/:book_id" => "books#destroy"
  #cards
  get    "books/:book_id/cards"          => "cards#index"
  get    "books/:book_id/cards/:card_id" => "cards#show_detail"
  post   "books/:book_id/cards"          => "cards#create"
  put    "books/:book_id/cards/:card_id" => "cards#update"
  delete "books/:book_id/cards/:card_id" => "cards#destroy"
  #top page
  root 'top_pages#index'

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

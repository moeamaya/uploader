Rails.application.routes.draw do
  get 'image/index'

  get 'image/create'

  get 'image/delete'

  root 'image#index'


  namespace :api do
    namespace :v1 do
      get 'image-get', to: "image#create"
      post 'image-post', to: "image#update"
    end
  end
end
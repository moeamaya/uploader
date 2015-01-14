Rails.application.routes.draw do
  get 'image/index'

  get 'image/create'

  get 'image/delete'

  root 'image#index'
end
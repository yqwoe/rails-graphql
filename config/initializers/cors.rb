# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend.bak app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before ActionDispatch::Static, Rack::Cors do
  allow do
    origins (ENV['CORS_HOSTS'] ? ENV['CORS_HOSTS'].split(',') : '*')
    resource '*',
             headers: :any,
             methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
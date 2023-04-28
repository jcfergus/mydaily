class FrontendController < ApplicationController
  skip_before_action :authorized, only: [:index]
  # include ReverseProxy::Controller
  # require 'net/http'

  def index
    # This lets us access the frontend NextJS app via the backend by
    # proxying anything that doesn't get handled by rails through to the
    # backend.
    # reverse_proxy "http://localhost:5100" do |config|
      # config.on_missing do |code, response|
      #   redirect_to root_url and return
      # end
    # end
    render :text => "Foop."
  end
end

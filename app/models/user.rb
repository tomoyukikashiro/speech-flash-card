class User
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name,            type: String
  field :screen_name,     type: String
  field :image_path,      type: String
  field :uid,             type: String
  field :provider,        type: String
  field :remember_token,  type: String
  field :oauth_token,     type: String
  field :oauth_expires_at, type: Date

  has_many :books

  validates :name,        length: { maximum: 50 }
  validates :screen_name, length: { maximum: 50 }
  validates :image_path,  length: { maximum: 200 }
  validates :oauth_token, presence: true, length: { maximum: 500 }

  index({remember_token: 1}, {unique: true})

  before_create :create_remember_token
  before_destroy do
    books.destroy_all
  end

  def self.from_omniauth(auth)
    where(auth.slice(:provider, :uid)).first_or_initialize.tap do |user|
      p auth
      user.provider = auth.provider
      user.uid = auth.uid

      unless auth.info.blank?
        user.name = auth.info.name
        user.screen_name = auth.info.screen_name
        user.image_path = auth.info.image
      end

      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at) unless auth.credentials.expires_at.nil?
      user.save!
    end
  end

  def User.new_remember_token
    SecureRandom.urlsafe_base64
  end

  def User.encrypt(token)
    Digest::SHA1.hexdigest(token.to_s)
  end

  private
    def create_remember_token
      self.remember_token = User.encrypt(User.new_remember_token)
    end

end

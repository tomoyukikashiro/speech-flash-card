class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include ActiveModel::SecurePassword

  before_save { self.email = email.downcase }
  before_create :create_remember_token

  field :name,  type: String
  field :email, type: String
  field :password_digest, type: String
  field :remember_token, type: String

  index({email: 1}, {unique: true})
  index({remember_token: 1}, {unique: true})

  has_many :books
  embeds_one :audio_settings, class_name: "Users::AudioSettings"

  validates :name, presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }, uniqueness: {case_sensitive: false}
  validates :password, length: { minimum: 6 }

  has_secure_password

  after_create do
    self.create_audio_settings
  end

  before_destroy do
    books.destroy_all
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

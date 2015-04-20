class Book
  include Mongoid::Document

  field :name,  type: String
  has_many :cards

  validates :name, presence: true, length: { maximum: 20 }

end

class Card
  include Mongoid::Document

  field :text,  type: String
  field :note,  type: String
  belongs_to :book

  validates :text, presence: true, length: { maximum: 100 }
  validates :note, presence: true, length: { maximum: 100 }

end

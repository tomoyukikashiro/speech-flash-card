class Book
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name,  type: String
  has_many :cards
  embeds_many :voices, class_name: "Book::Voices"
  belongs_to :user

  index({id: 1}, {unique: true})

  validates :name, presence: true, length: { maximum: 20 }
  validate :check_count, on: :create

  before_destroy do
    cards.destroy_all
  end

  MAX_BOOKS_COUNT = 20

  def get_data
    first_card_id = cards.size > 0 ? cards.first.id : nil
    return {
      id: id.to_s,
      name: name,
      first_card_id: first_card_id.to_s,
      voices: Book::Voices.get_all(self)
    }
  end

  def self.get_all(user)
    if user.books.size > 0
      user.books.map do |item|
        item.get_data
      end
    else
      []
    end
  end

  private
    def check_count
      errors.add(:tmb, "too many books") if self.user.present? && self.user.books.size > MAX_BOOKS_COUNT
    end

end

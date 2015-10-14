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

  def get_data
    first_card_id = cards.size > 0 ? cards.first.id : nil
    return {
      id: id.to_s,
      name: name,
      first_card_id: first_card_id.to_s,
      voices: voices.get_all
    }
  end

  def self.get_all
    if self.all.size > 0
      self.all.map do |item|
        item.get_data
      end
    else
      []
    end
  end

  private
    def check_count
      errors.add(:tmb, "too many books") if self.user.present? && self.user.books.size > 20
    end

end

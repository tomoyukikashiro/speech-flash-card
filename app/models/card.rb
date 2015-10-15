class Card
  include Mongoid::Document
  include Mongoid::Timestamps

  field :text,  type: String
  field :note,  type: String
  belongs_to :book

  index({id: 1}, {unique: true})

  validates :text, presence: true, length: { maximum: 100 }
  validates :note, allow_nil: true, length: { maximum: 100 }
  validate :check_count, on: :create

  def get_data
    return {id: id.to_s, text: text, note: note}
  end

  def self.get_all(book)
    if book.cards.size > 0
      book.cards.map do |item|
        {id: item.id.to_s, text: item.text, note: item.note}
      end
    else
      []
    end
  end

  private
    def check_count
      errors.add(:tmc, "too many card") if self.book.present? && self.book.cards.size > 50
    end

end

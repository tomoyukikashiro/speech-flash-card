class Card
  include Mongoid::Document

  field :text,  type: String
  field :note,  type: String
  belongs_to :book

  validates :text, presence: true, length: { maximum: 100 }
  validates :note, presence: true, length: { maximum: 100 }

  def get_all
    if self.all.size > 0
      self.all.map do |item|
        {id: item.id, text: item.text, note: item.note}
      end
    else
      []
    end
  end

end

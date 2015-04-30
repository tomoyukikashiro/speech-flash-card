class Card
  include Mongoid::Document

  field :text,  type: String
  field :note,  type: String
  belongs_to :book

  index({id: 1}, {unique: true})

  validates :text, presence: true, length: { maximum: 100 }
  validates :note, allow_nil: true, length: { maximum: 100 }

  def get_data
    return {id: id.to_s, text: text, note: note}
  end

  def self.get_all
    if self.all.size > 0
      self.all.map do |item|
        {id: item.id.to_s, text: item.text, note: item.note}
      end
    else
      []
    end
  end

end

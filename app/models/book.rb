class Book
  include Mongoid::Document

  field :name,  type: String
  has_many :cards
  belongs_to :user

  validates :name, presence: true, length: { maximum: 20 }

  def get_data
    return {id: id.to_s, name: name}
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

end

class Book
  include Mongoid::Document

  field :name,  type: String
  has_many :cards
  belongs_to :user

  validates :name, presence: true, length: { maximum: 20 }

  def self.get_all
    if self.all.size > 0
      self.all.map do |item|
        {id: item.id, name: item.name}
      end
    else
      []
    end
  end

end

class Books::Voices
  include Mongoid::Document
  include Mongoid::Timestamps

  embedded_in :book

  field :name ,   type: String
  field :lang ,   type: String

  validates :name,    presence: true, length: { maximum: 30 }
  validates :lang,    presence: true, length: { maximum: 10 }

  def get_data
    {
      id: id.to_s,
      name: name,
      lang: lang
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

end

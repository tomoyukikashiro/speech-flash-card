class Books::Voices
  include Mongoid::Document
  include Mongoid::Timestamps

  embedded_in :book

  field :os,      type: String
  field :browser, type: String
  field :type ,   type: String

  validates :os,      presence: true, length: { maximum: 30 }
  validates :browser, presence: true, length: { maximum: 30 }
  validates :type,    presence: true, length: { maximum: 30 }

  def get_data
    {
      id: id.to_s,
      os: os,
      browser: browser,
      type: type
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

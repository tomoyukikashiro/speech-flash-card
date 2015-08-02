class AudioSettings
  include Mongoid::Document

  embedded_in :user

  field :speed,  type: Integer, default: 1
  field :repeat, type: String, default: "none"

  validates :repeat,  inclusion: { in: ["book", "card", "none"] }

end

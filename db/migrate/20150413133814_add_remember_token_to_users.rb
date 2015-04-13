class AddRememberTokenToUsers < ActiveRecord::Migration
  def changea
    add_column :users, :remember_token, :string
    add_index :users, :remember_token
  end
end

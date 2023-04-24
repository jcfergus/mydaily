class CreateRefreshTokens < ActiveRecord::Migration[7.0]
  def change
    create_table :refresh_tokens, id: :uuid do |t|
      t.uuid :user_id
      t.string :value
      t.datetime :expires
      t.string :createdByIp
      t.references :supercededBy, type: :uuid, foreign_key: { to_table: :refresh_tokens }
      t.string :revokedByIp
      t.datetime :revokedAt

      t.timestamps
    end
  end
end

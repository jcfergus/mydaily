class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :title
      t.text :fulltext
      t.string :type
      t.string :sourceUrl
      t.string :feed

      t.belongs_to :user, type: :uuid, index: true, foreign_key: true

      t.timestamps
    end
  end
end

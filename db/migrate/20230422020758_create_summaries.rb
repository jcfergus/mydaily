class CreateSummaries < ActiveRecord::Migration[7.0]
  def change
    create_table :summaries, id: :uuid do |t|
      t.string :title
      t.text :text
      t.integer :version

      t.belongs_to :user, type: :uuid, index: true
      t.belongs_to :item, type: :uuid, index: true

      t.timestamps
    end
  end
end

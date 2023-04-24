class CreateFeeds < ActiveRecord::Migration[7.0]
  def change
    create_table :feeds, id: :uuid do |t|
      t.string :sourceUrl
      t.string :type
      t.uuid :owner
      t.datetime :last_queried

      t.timestamps
    end
  end
end

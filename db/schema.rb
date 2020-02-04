# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20191104234302) do

  create_table "account_types", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "areas", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "banks", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "brands", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "buyer_evaluations", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "products_status_id"
    t.integer  "user_id",                          null: false
    t.integer  "evaluation_id",                    null: false
    t.text     "comment",            limit: 65535, null: false
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.index ["products_status_id"], name: "index_buyer_evaluations_on_products_status_id", using: :btree
  end

  create_table "canseling_products", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "products_status_id"
    t.integer  "status",             null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.index ["products_status_id"], name: "index_canseling_products_on_products_status_id", using: :btree
  end

  create_table "comments", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "products_status_id"
    t.integer  "user_id",                          null: false
    t.text     "text",               limit: 65535, null: false
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.index ["products_status_id"], name: "index_comments_on_products_status_id", using: :btree
  end

  create_table "evaluations", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.string   "icon"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "goods", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "products_status_id"
    t.integer  "user_id",            null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.index ["products_status_id"], name: "index_goods_on_products_status_id", using: :btree
  end

  create_table "payment_methods", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id"
    t.string   "card_number",     null: false
    t.date     "expiration_date", null: false
    t.integer  "secrity_code",    null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["user_id"], name: "index_payment_methods_on_user_id", using: :btree
  end

  create_table "product_images", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "product_id", null: false
    t.string   "url",        null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_product_images_on_product_id", using: :btree
  end

  create_table "products", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name",                                 null: false
    t.text     "description",            limit: 65535, null: false
    t.integer  "price",                                null: false
    t.integer  "profit",                               null: false
    t.integer  "area_id",                              null: false
    t.string   "brand"
    t.integer  "size_id"
    t.integer  "category_parent_id",                   null: false
    t.integer  "category_children_id",                 null: false
    t.integer  "category_grandchild_id"
    t.integer  "sale_charge_id"
    t.integer  "status_id"
    t.integer  "shipping_charge_id"
    t.integer  "shipping_time_id"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.integer  "shipping_method_id"
    t.index ["sale_charge_id"], name: "index_products_on_sale_charge_id", using: :btree
    t.index ["shipping_charge_id"], name: "index_products_on_shipping_charge_id", using: :btree
    t.index ["shipping_method_id"], name: "index_products_on_shipping_method_id", using: :btree
    t.index ["shipping_time_id"], name: "index_products_on_shipping_time_id", using: :btree
    t.index ["status_id"], name: "index_products_on_status_id", using: :btree
  end

  create_table "products_statuses", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "product_id"
    t.integer  "buyer_id"
    t.integer  "seller_id"
    t.integer  "category_parent_id"
    t.integer  "brand_id"
    t.integer  "selling_status",     null: false
    t.integer  "dealing_status",     null: false
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.index ["product_id"], name: "index_products_statuses_on_product_id", using: :btree
  end

  create_table "sale_charges", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.float    "rate",       limit: 24, null: false
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  create_table "sale_orders", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id",    null: false
    t.integer  "status",     null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shipping_charges", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shipping_methods", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shipping_times", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sizes", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sizes_categories", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "size_id"
    t.integer  "category_parent_id",     null: false
    t.integer  "category_children_id",   null: false
    t.integer  "category_grandchild_id"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.index ["size_id"], name: "index_sizes_categories_on_size_id", using: :btree
  end

  create_table "statuses", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "todos", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "products_status_id"
    t.integer  "user_id",                          null: false
    t.text     "text",               limit: 65535, null: false
    t.integer  "status",                           null: false
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.index ["products_status_id"], name: "index_todos_on_products_status_id", using: :btree
  end

  create_table "transfer_addresses", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id"
    t.integer  "bank_id"
    t.integer  "account_type_id",  null: false
    t.integer  "branch_code",      null: false
    t.string   "account_number",   null: false
    t.string   "account_fistname", null: false
    t.string   "account_lastname", null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["bank_id"], name: "index_transfer_addresses_on_bank_id", using: :btree
    t.index ["user_id"], name: "index_transfer_addresses_on_user_id", using: :btree
  end

  create_table "transfer_orders", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id",    null: false
    t.integer  "sale",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "nickname",                                          null: false
    t.string   "first_name",                                        null: false
    t.string   "last_name",                                         null: false
    t.string   "first_kananame",                                    null: false
    t.string   "last_kananame",                                     null: false
    t.date     "birthday_date"
    t.text     "profiletext",            limit: 65535
    t.string   "address_first_name"
    t.string   "address_last_name"
    t.string   "address_firt_kananame"
    t.string   "address_last_kananame"
    t.integer  "address_zipcode"
    t.string   "address_prefecture"
    t.string   "address_city"
    t.string   "address_block"
    t.string   "address_building"
    t.string   "address_phone_number"
    t.datetime "created_at",                                        null: false
    t.datetime "updated_at",                                        null: false
    t.string   "email",                                default: "", null: false
    t.string   "encrypted_password",                   default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  create_table "view_categories", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "ancestry"
    t.index ["ancestry"], name: "index_view_categories_on_ancestry", using: :btree
  end

  add_foreign_key "buyer_evaluations", "products_statuses"
  add_foreign_key "canseling_products", "products_statuses"
  add_foreign_key "comments", "products_statuses"
  add_foreign_key "goods", "products_statuses"
  add_foreign_key "payment_methods", "users"
  add_foreign_key "product_images", "products"
  add_foreign_key "products", "sale_charges"
  add_foreign_key "products", "shipping_charges"
  add_foreign_key "products", "shipping_methods"
  add_foreign_key "products", "shipping_times"
  add_foreign_key "products", "statuses"
  add_foreign_key "products_statuses", "products"
  add_foreign_key "sizes_categories", "sizes"
  add_foreign_key "todos", "products_statuses"
  add_foreign_key "transfer_addresses", "banks"
  add_foreign_key "transfer_addresses", "users"
end

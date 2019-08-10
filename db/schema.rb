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

ActiveRecord::Schema.define(version: 2019_08_10_054849) do

  create_table "account_types", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "areas", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "banks", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "brands", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "buyer_evaluations", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "products_status_id", null: false
    t.bigint "user_id", null: false
    t.bigint "evaluation_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["evaluation_id"], name: "index_buyer_evaluations_on_evaluation_id"
  end

  create_table "canseling_products", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "products_status_id", null: false
    t.integer "status", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "categories", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "large_category_id"
    t.bigint "medium_category_id"
    t.bigint "smail_category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["large_category_id"], name: "index_categories_on_large_category_id"
    t.index ["medium_category_id"], name: "index_categories_on_medium_category_id"
    t.index ["smail_category_id"], name: "index_categories_on_smail_category_id"
  end

  create_table "comments", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "products_status_id", null: false
    t.bigint "user_id", null: false
    t.text "comment", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "evaluations", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name", null: false
    t.text "icon"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "goods", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "products_status_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["products_status_id"], name: "index_goods_on_products_status_id"
    t.index ["user_id"], name: "index_goods_on_user_id"
  end

  create_table "large_categories", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "medium_categories", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "payment_methods", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "card_number", null: false
    t.integer "expiration_year", null: false
    t.integer "expiration_month", null: false
    t.integer "security_code", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "product_images", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "product_id", null: false
    t.text "url", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "products", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name", null: false
    t.text "description", null: false
    t.integer "price", null: false
    t.integer "profit", null: false
    t.integer "area_id", null: false
    t.string "brand"
    t.integer "size_id"
    t.bigint "sale_charge_id"
    t.bigint "status_id"
    t.bigint "category_id"
    t.bigint "shipping_charge_id"
    t.bigint "shipping_time_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_products_on_category_id"
    t.index ["sale_charge_id"], name: "index_products_on_sale_charge_id"
    t.index ["shipping_charge_id"], name: "index_products_on_shipping_charge_id"
    t.index ["shipping_time_id"], name: "index_products_on_shipping_time_id"
    t.index ["status_id"], name: "index_products_on_status_id"
  end

  create_table "products_statuses", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "product_id"
    t.bigint "buyer_id"
    t.bigint "saler_id"
    t.integer "saling_status", null: false
    t.integer "deading_status", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["buyer_id"], name: "index_products_statuses_on_buyer_id"
    t.index ["product_id"], name: "index_products_statuses_on_product_id"
    t.index ["saler_id"], name: "index_products_statuses_on_saler_id"
  end

  create_table "sale_charges", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.float "rate", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sale_orders", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "sale", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shipping_charges", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shipping_times", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sizes", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sizes_categories", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "category_id"
    t.bigint "size_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_sizes_categories_on_category_id"
    t.index ["size_id"], name: "index_sizes_categories_on_size_id"
  end

  create_table "smail_categories", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "statuses", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "todos", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "product_statu_id", null: false
    t.bigint "user_id", null: false
    t.text "todo", null: false
    t.integer "status", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "transfer_addresses", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "bank_id"
    t.integer "account_type_id", null: false
    t.integer "branch_code", null: false
    t.integer "account_number", null: false
    t.string "account_fistname", null: false
    t.string "acctoun_lastname", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bank_id"], name: "index_transfer_addresses_on_bank_id"
  end

  create_table "transfer_orders", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "sale", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "name", null: false
    t.string "kananame", null: false
    t.string "nickname"
    t.datetime "birthdaydate", null: false
    t.text "profiletext"
    t.integer "authenticphonenumber", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "buyer_evaluations", "evaluations"
  add_foreign_key "categories", "large_categories"
  add_foreign_key "categories", "medium_categories"
  add_foreign_key "categories", "smail_categories"
  add_foreign_key "goods", "products_statuses"
  add_foreign_key "goods", "users"
  add_foreign_key "products", "categories"
  add_foreign_key "products", "sale_charges"
  add_foreign_key "products", "shipping_charges"
  add_foreign_key "products", "shipping_times"
  add_foreign_key "products", "statuses"
  add_foreign_key "products_statuses", "products"
  add_foreign_key "products_statuses", "users", column: "buyer_id"
  add_foreign_key "products_statuses", "users", column: "saler_id"
  add_foreign_key "sizes_categories", "categories"
  add_foreign_key "sizes_categories", "sizes"
  add_foreign_key "transfer_addresses", "banks"
end

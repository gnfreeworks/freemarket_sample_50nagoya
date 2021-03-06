# For new db create process command
- $ rake db:create
- $ rake db:migrate
- $ rake db:seed

# For new db create process command
- $ rake db:drop
- $ rake db:create
- $ rake db:migrate
- $ rake db:seed

# README DB Design
## products テーブル (商品テーブル)
|Column         |  description(J)        |Type      |Options        |
|---------------|--------------------|----------|-------------------|
|name           |商品名|string|null: false|
|description    |詳細説明|text|null: false|
|price          |価格|integer|null: false|
|profit         |利益|integer|null: false|
|size|サイズid|integer||
|sale_charge_id|販売手数料id|integer|null: false, foreign_key: true|
|status_id|商品状態id|integer|null: false, foreign_key: true|
|category_id|カテゴリーid|integer|null: false, foreign_key: true|
|brand|ブランド名|string|null: false|
|area_id|都道府県id|integer|null: false, foreign_key: true|
|shipping_charge_id|配送料負担先id|integer|null: false, foreign_key: true|
|shipping_time_id|配送期間|integer|null: false, foreign_key: true|
|shipping_method_id|発送方法|integer|null: false, foreign_key: true|

### Association
- belongs_to :shipping_charge
- belongs_to :shipping_time
- belongs_to :shipping_method
- belongs_to :area
- belongs_to :status
- belongs_to :sale_charge
- belongs_to :category
- belongs_to :size
- has_many   :product_images

## product_images テーブル (商品イメージテーブル)
|Column         |  description        |Type      |Options           |
|---------------|--------------------|----------|-------------------|
|product_id     |商品id|integer|null: false|
|url            |保存URL|text|null: false|

## sale_charges テーブル(販売手数料)
|Column         |  description        |Type      |Options           |
|---------------|--------------------|----------|-------------------|
|rate     |レート|integer|null: false|

## shipping_charges テーブル (配送負担元テーブル)
|Column         |  description        |Type      |Options           |
|---------------|--------------------|----------|-------------------|
|name     |名前|string|null: false|

## shipping_times テーブル (配送期間テーブル)
|Column         |  description        |Type      |Options           |
|---------------|--------------------|----------|-------------------|
|name           |名前    |string|null: false|

## shipping_methods テーブル (発送方法テーブル)
|Column         |  description        |Type      |Options           |
|---------------|--------------------|----------|-------------------|
|name           |名前    |string|null: false|

## areas テーブル (都道府県テーブル)
- Let input next.
  -- install it gem 'active_hash'
  -- rails g model Address areas_id:integer name:string」
  -- refer to https://kossy-web-engineer.hatenablog.com/entry/2019/01/08/205702

### Association
- belongs_to_active_hash:areas

## statuses テーブル (商品状態テーブル)
|Column         |  description        |Type      |Options           |
|---------------|--------------------|----------|-------------------|
|name           |名前    |string|null: false|

## categories テーブル (カテゴリーテーブル)
|Column         |  description        |Type      |Options           |
|---------------|--------------------|----------|-------------------|
| parent_id     |親カテゴリーid |integer|null: false, foreign_key: true|
| children_id   |子カテゴリーid |integer|null: false, foreign_key: true|
| grandchild_id |孫カテゴリーid |integer|null: false, foreign_key: true|

### Association
- belongs_to :large_category
- belongs_to :medium_category
- belongs_to :smail_category
- has_many   :sizes, through: :size_categories

## view_categories テーブル (階層カテゴリーテーブル)
|Column         |  description        |Type      |Options           |
|---------------|--------------------|----------|-------------------|
| name          |カテゴリー名 |integer|null: false|
| ancestry      |    *      |integer|null: false|

- *: "ancestry" is refer to https://qiita.com/Rubyist_SOTA/items/49383aa7f60c42141871

### Association
- has_ancestry

## sizes_categories テーブル (sizes_categories テーブル)
|Column         |  description        |Type      |Options           |
|---------------|--------------------|----------|-------------------|
|category_id    |カテゴリーid |integer|null: false, foreign_key: true|
|size_id        |サイズid    |integer|null: false, foreign_key: true|

### Association
- belongs_to :category
- belongs_to :size

## sizes テーブル (sizes テーブル)
|Column         |  description        |Type      |Options           |
|---------------|--------------------|----------|-------------------|
|name           |名前    |string|null: false|

### Association
- has_many :categories, through: :size_categories


## brands テーブル (ブランドテーブル)
|Column         |  description        |Type      |Options           |
|---------------|---------------------|----------|-------------------|
| name   |ブランド名 |string|null: false|

### Association
- has_many :categories, through: :categories_brands

## products_statuses テーブル (商品出品 テーブル)
|Column         |  description        |Type      |Options           |
|---------------|--------------------|----------|-------------------|
|product_id    |商品id|integer|null: false, foreign_key: true|
|seller_id       |出品者id|integer|null: false, foreign_key: true|
|buyer_id       |購入者id|integer|foreign_key: true|
|category_parent_id       |親カテゴリid|integer|null: false|
|brand_id       |ブランドid|integer|null: false|
|selling_status  |出品状態|integer||
|dealing_status |取引状態|integer||

### Appendix
- selling_status  [selling:0 or soldout:1]
- dealing_status  [selling:0, dealing:1, canceling:2, shipping:3, completed:4]

### Association
- belongs_to :buyer, class_name: 'user', :foreign_key => 'buyer_id'
- belongs_to :seller, class_name: 'user', :foreign_key => 'seller_id'
- has_many   :canseling_products
- has_many   :todos
- has_many   :goods
- has_many   :users, through: :goods
-   
## comments テーブル (コメント テーブル)
|Column         |  description        |Type      |Options           |
|---------------|--------------------|----------|-------------------|
|product_status_id|商品状態id|integer|null: false|
|user_id        |ユーザーid|integer|null: false|
|comment        |コメント |integer|null: false|

## canseling_products テーブル (キャンセル申請 テーブル)
|Column         |  description        |Type      |Options           |
|---------------|--------------------|----------|-------------------|
|product_status_id|商品状態id|integer|null: false|
|status     |キャンセル状態|integer|null: false|

### Appendix
- status [0:申請中 1:承諾 2:却下]

## todos テーブル (todos テーブル)
|Column         |  description        |Type      |Options           |
|---------------|--------------------|----------|-------------------|
|product_status_id|商品状態id|integer|null: false|
|user_id        |ユーザーid|integer|null: false|
|text           |todo内容|integer|null: false|
|status         |状態|integer|null: false|

### Appendix
- status [0:未読, 1:既読, 2:完了]

## users テーブル (ユーザーテーブル) Installed devise
|Column           |  description（J)     |Type      |Options           |
|-----------------|---------------------|----------|-------------------|
|nickname         |ニックネーム|string|null: false|
|first_name       |苗字|string|null: false|
|last_name        |名前|string|null: false|
|first_kananame   |カナ苗字|string|null: false|
|last_kananame    |カナ名前|string|null: false|
|birthday_date    |生年月日-西暦|date|null: false|
|email            |email|string|null: false, unique true|
|password         |パスワード|password|null: false|
|profiletext      |プロフィール|text||
|address_first_name       |住所-苗字|string||
|address_last_name        |住所-名前|string||
|address_firt_kananame    |住所-カナ苗字|string||
|address_last_kananame    |住所-カナ名前|string||
|address_zipcode          |住所-郵便番号|integer||
|address_prefecture       |住所-県|string||
|address_city             |住所-市町村|string||
|address_block            |住所-ブロック|string||
|address_building         |住所-建物名-番地|string||
|address_phone_number     |電話番号|string||

### Association
- belongs_to :transfer_address
- has_one    :payment_method
- has_many   :buyed_items, class_name: 'ProductsStatus', foreign_key: 'buyer_id'
- has_many   :selling_items, class_name: 'ProductsStatus', foreign_key: 'seller_id'
- has_many   :sold_items, class_name: 'ProductsStatus', foreign_key: 'seller_id',
- has_many   :goods
- has_many   :products, through: :goods
- has_many   :sale_orders
- has_many   :transfer_orders
- hes_many   :buyer_evaluations
  
## sale_ordes テーブル (売り上げ申請 テーブル)
|Column         |  description        |Type      |Options           |
|---------------|--------------------|----------|-------------------|
|user_id     |ユーザーid|integer|null: false, foreign_key: true|
|sale        |売り上げ|integer|null: false, foreign_key: true|

## goods テーブル (いいね テーブル)
|Column         |  description        |Type      |Options           |
|---------------|--------------------|----------|-------------------|
|product_status_id |商品状態id|integer|null: false, foreign_key: true|
|user_id        |ユーザーid|integer|null: false, foreign_key: true|

### Association
- belongs_to :products_status
- belongs_to :user

## transfer_orders テーブル (振込申請 テーブル)
|Column         |  description        |Type      |Options           |
|---------------|--------------------|----------|-------------------|
|user_id     |ユーザーid|integer|null: false, foreign_key: true|
|sale        |振込申請額|integer|null: false|

## transfer_addresses テーブル (振込先 テーブル)
|Column         |  description        |Type      |Options           |
|---------------|--------------------|----------|-------------------|
|user_id        |ユーザーid|integer|null: false|
|bank_id        |振込申請額|integer|null: false, foreign_key: true|
|acctoun_type_id|講座種別|integer|null: false|
|branch_code    |支店コード|integer|null: false|
|account_number |口座番号|integer|null: false|
|account_fistname|講座名義(名字)|integer|null: false|
|acctoun_lastname|講座名義(名前)|integer|null: false|

### Association
- belongs_to :bank
- belongs_to :account_type

## banks テーブル (銀行 テーブル)
|Column         |  description        |Type      |Options           |
|---------------|--------------------|----------|-------------------|
|name     |名前|string|null: false


## buyer_evaluations テーブル (出品者評価 テーブル)
|Column         |  description        |Type      |Options           |
|---------------|--------------------|----------|-------------------|
|products_status_id     |名前|references |null: false|
|user_id                |出品者id|integer|null: false|
|evaluation_id          |評価id|integer|null: false, foreign_key: true|
|comment                |コメント|text|null: false|

### Association
- belongs_to :products_status
- belongs_to :user
- belongs_to :evaluation
  
## evaluations テーブル (評価 テーブル)
|Column         |  description        |Type      |Options           |
|---------------|--------------------|----------|-------------------|
|name           |名前|string|null: false|
|icon           |アイコン|string|null: false|

## payment_methods テーブル(支払い方法 テーブル)
|Column         |  description        |Type      |Options           |
|---------------|--------------------|----------|-------------------|
|user_id          |ユーザーid|references|null: false|
|card_number      |カードナンバー|string|null: false|
|expiration_year  |有効年|integer|null: false|
|expiration_month |有効期限|integer|null: false|
|secrity_code     |セキュリティーコード|integer|null: false|

## account_types テーブル(口座種別テーブル)
|Column         |  description        |Type      |Options           |
|---------------|--------------------|----------|-------------------|
|name           |種別|string||

### Appendix
- name [普通預金, 当座預金, 貯金預金]

## Designer
- Satoshi Shimizu
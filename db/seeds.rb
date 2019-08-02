# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


# Bank table (銀行 テーブル)
Bank.create(name: "三菱UFJ銀行")
Bank.create(name: "みずほ銀行")
Bank.create(name: "りそな銀行")
Bank.create(name: "埼玉りそな銀行")
Bank.create(name: "三井住友銀行")
Bank.create(name: "ジャパネット銀行")
Bank.create(name: "楽天銀行")
Bank.create(name: "ゆうちょ銀行")

# status table (商品状態 テーブル)
Status.create(name: "新品、未使用")
Status.create(name: "未使用に近い")
Status.create(name: "目立った傷や汚れなし")
Status.create(name: "やや傷や汚れあり")
Status.create(name: "傷や汚れあり")
Status.create(name: "全体的に状態が悪い")

# shipping charge table (配送料の負担 テーブル)
ShippingCharge.create(name: "送料込み(出品者負担)")
ShippingCharge.create(name: "着払い(購入者負担)")

# shipping time table  (発送までの日数 テーブル)
ShippingTime.create(name: "1~2で発送")
ShippingTime.create(name: "2~3で発送")
ShippingTime.create(name: "4~7で発送")

# size table (商品サイズ テーブル)
Size.create(name: "XXS以下")
Size.create(name: "XS(SS)")
Size.create(name: "S")
Size.create(name: "M")
Size.create(name: "L")
Size.create(name: "XL(LL)")
Size.create(name: "2XL(3L)")
Size.create(name: "3XL(4L)")
Size.create(name: "4XL(5L)以下")
Size.create(name: "FREE SIZE")


const products = [
  {
    name: "Apple iPhone 14 Pro",
    brand: "Apple",
    description:
      "6.1-inch Super Retina XDR OLED, A16 Bionic chip, Pro camera system.",
    price: 119999,
    quantity: 50,
    countInStock: 50,
    categoryName: "Smartphones",
    image:
      "https://m.media-amazon.com/images/I/31Em5uVIfKL._SX342_SY445_QL70_FMwebp_.jpg",
  },
  {
    name: "Samsung Galaxy S23 Ultra",
    brand: "Samsung",
    description:
      "6.8-inch Dynamic AMOLED 2X, Snapdragon 8 Gen 2, 200MP quad camera.",
    price: 104999,
    quantity: 35,
    countInStock: 35,
    categoryName: "Smartphones",
    image:
      "https://m.media-amazon.com/images/I/41x507Qk7oL._SY300_SX300_QL70_FMwebp_.jpg",
  },
  {
    name: "OnePlus 11 5G",
    brand: "OnePlus",
    description:
      "6.7-inch 120Hz AMOLED, Snapdragon 8 Gen 2, Hasselblad-tuned cameras.",
    price: 56999,
    quantity: 40,
    countInStock: 40,
    categoryName: "Smartphones",
    image:
      "https://m.media-amazon.com/images/I/414+xRBltFL._SY300_SX300_QL70_FMwebp_.jpg",
  },
  {
    name: "Xiaomi 13 Pro",
    brand: "Xiaomi",
    description: "Leica optics, Snapdragon 8 Gen 2, premium ceramic design.",
    price: 77999,
    quantity: 30,
    countInStock: 30,
    categoryName: "Smartphones",
    image:
      "https://m.media-amazon.com/images/I/7169hX0S18L._SX679_.jpg",
  },
  {
    name: "MacBook Air M2",
    brand: "Apple",
    description: "M2 chip, 13.6-inch Liquid Retina display, all-day battery.",
    price: 104900,
    quantity: 25,
    countInStock: 25,
    categoryName: "Laptops",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1653084303665",
  },
  {
    name: "Dell XPS 13",
    brand: "Dell",
    description: "13-inch InfinityEdge display, premium ultrabook design.",
    price: 99990,
    quantity: 18,
    countInStock: 18,
    categoryName: "Laptops",
    image:
      "https://m.media-amazon.com/images/I/41BG4Mqyn4L._SY300_SX300_QL70_FMwebp_.jpg",
  },
  {
    name: "HP Spectre x360",
    brand: "HP",
    description: "2-in-1 convertible, OLED display option, long battery life.",
    price: 119990,
    quantity: 15,
    countInStock: 15,
    categoryName: "Laptops",
    image:
      "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08140748.png",
  },
  {
    name: "Lenovo Legion 5",
    brand: "Lenovo",
    description: "Ryzen CPU, RTX graphics, high-refresh gaming laptop.",
    price: 89990,
    quantity: 20,
    countInStock: 20,
    categoryName: "Laptops",
    image:
      "https://p3-ofp.static.pub/ShareResource/na/subseries/hero/lenovo-legion-5-15-amd-hero.png",
  },
  {
    name: "Sony WH-1000XM5",
    brand: "Sony",
    description: "Industry-leading noise cancelling over-ear headphones.",
    price: 29990,
    quantity: 60,
    countInStock: 60,
    categoryName: "Audio",
    image:
      "https://www.sony.co.in/image/5d02da5df552836db894cead8a68f5f3?fmt=pjpg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF",
  },
  {
    name: "Apple AirPods Pro (2nd Gen)",
    brand: "Apple",
    description: "Active noise cancellation, transparency mode, MagSafe case.",
    price: 24990,
    quantity: 80,
    countInStock: 80,
    categoryName: "Audio",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1660803972361",
  },
  {
    name: "JBL Flip 6 Bluetooth Speaker",
    brand: "JBL",
    description: "Portable waterproof Bluetooth speaker with punchy bass.",
    price: 12999,
    quantity: 45,
    countInStock: 45,
    categoryName: "Audio",
    image:
      "https://in.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw4c9b4e5e/JBL_Flip6_Hero_Black_x1-1605x1605px.png",
  },
  {
    name: "Canon EOS R10",
    brand: "Canon",
    description: "APS-C mirrorless camera with fast autofocus and 4K video.",
    price: 79990,
    quantity: 12,
    countInStock: 12,
    categoryName: "Cameras",
    image:
      "https://i1.adis.ws/i/canon/eos-r10-rf-s-18-45mm-f-4-5-6-3-is-stm-kit-front-on-white_3c8a2ef6d8c74b93a2e4e3b8b8e8f8e8",
  },
  {
    name: "Nikon Z50",
    brand: "Nikon",
    description: "Compact mirrorless camera with excellent low-light performance.",
    price: 72990,
    quantity: 10,
    countInStock: 10,
    categoryName: "Cameras",
    image:
      "https://cdn.nikon.com/nikonimg/products/cameras/slr/mirrorless/z_50/img/sample/img_01.png",
  },
  {
    name: "GoPro HERO11 Black",
    brand: "GoPro",
    description: "Rugged action camera with HyperSmooth stabilization.",
    price: 48999,
    quantity: 25,
    countInStock: 25,
    categoryName: "Cameras",
    image:
      "https://gopro.com/content/dam/help/hero11-black/product-manuals/HERO11Black_UM_ENG_REVA_Web.pdf.thumb.1280.1280.png",
  },
  {
    name: "Samsung Galaxy Watch5",
    brand: "Samsung",
    description: "Advanced health tracking, AMOLED display, Wear OS.",
    price: 27999,
    quantity: 40,
    countInStock: 40,
    categoryName: "Wearables",
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/in/2208/gallery/in-galaxy-watch5-r900-sm-r900nzaainu-532659574",
  },
  {
    name: "Apple Watch Series 9",
    brand: "Apple",
    description: "Always-on Retina display, advanced fitness and health features.",
    price: 41900,
    quantity: 35,
    countInStock: 35,
    categoryName: "Wearables",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s9-45mm-pink-sport-band-pink-pdp-image-position-1__en-in?wid=570&hei=684&fmt=jpeg&qlt=95&.v=1692895795711",
  },
  {
    name: "Fitbit Charge 6",
    brand: "Fitbit",
    description: "Fitness tracker with heart rate, GPS, and sleep tracking.",
    price: 14999,
    quantity: 70,
    countInStock: 70,
    categoryName: "Wearables",
    image:
      "https://www.fitbit.com/global/content/dam/fitbit/global/pdp/devices/charge6/hero/charge6-device-black-3qtr.png",
  },
  {
    name: "Asus ROG Strix G15",
    brand: "ASUS",
    description: "Ryzen 7, RTX 3060, 144Hz display gaming laptop.",
    price: 114990,
    quantity: 14,
    countInStock: 14,
    categoryName: "Laptops",
    image:
      "https://dlcdnwebimgs.asus.com/gain/A8BB0B9A-F5C1-4A07-9F36-F2A8E7A1B5E5/w800/h600",
  },
  {
    name: "Boat Rockerz 450",
    brand: "boAt",
    description: "On-ear Bluetooth headphones with deep bass and 15H playback.",
    price: 1499,
    quantity: 120,
    countInStock: 120,
    categoryName: "Audio",
    image:
      "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/main2_529ecf13-c993-4fe7-a2d6-9357f1a47db4.png",
  },
  {
    name: "Realme Buds Air 3",
    brand: "Realme",
    description: "TWS earbuds with ANC and low-latency gaming mode.",
    price: 3999,
    quantity: 90,
    countInStock: 90,
    categoryName: "Audio",
    image:
      "https://image01.realme.net/general/20220308/1646729123322.png",
  },
  {
    name: "Sony Alpha a6400",
    brand: "Sony",
    description: "Mirrorless camera with real-time eye AF and 4K HDR.",
    price: 84990,
    quantity: 9,
    countInStock: 9,
    categoryName: "Cameras",
    image:
      "https://www.sony.co.in/image/d4f7c1e6c40b3dc8a2c6e8b8e8e8f8e8?fmt=pjpg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF",
  },
  {
    name: "Noise ColorFit Pro 4",
    brand: "Noise",
    description: "Smartwatch with 1.72-inch display and 100+ sports modes.",
    price: 3499,
    quantity: 85,
    countInStock: 85,
    categoryName: "Wearables",
    image:
      "https://cdn.shopify.com/s/files/1/0086/4865/4895/products/1_a4b8c1b1-1b1b-4b1b-8b1b-1b1b1b1b1b1b.png",
  },
  {
    name: "HP Pavilion 15",
    brand: "HP",
    description: "Everyday laptop with 12th Gen Intel and FHD display.",
    price: 62990,
    quantity: 22,
    countInStock: 22,
    categoryName: "Laptops",
    image:
      "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08091945.png",
  },
  {
    name: "Redmi Note 12 Pro",
    brand: "Redmi",
    description: "120Hz AMOLED display, 5G, 67W fast charging.",
    price: 24999,
    quantity: 55,
    countInStock: 55,
    categoryName: "Smartphones",
    image:
      "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1673001933.41732409.png",
  },
  {
    name: "Vivo V29",
    brand: "Vivo",
    description: "Slim design, great portrait camera, AMOLED display.",
    price: 32999,
    quantity: 45,
    countInStock: 45,
    categoryName: "Smartphones",
    image:
      "https://www.vivo.com/content/dam/vivo/support/product-parameter/v29/v29-noble-black-img.png",
  },
];

export default products;

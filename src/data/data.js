const data = [
  {
    images: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/9b/45/4a/le-meridien-thimphu.jpg?w=700&h=-1&s=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/52/c9/45/exterior.jpg?w=700&h=-1&s=1",
      "https://gos3.ibcdn.com/bddc81c49ef611e7ba32025f77df004f.jpg",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/468485351.jpg?k=711f658ed256c1785a6edc778b7f0910e049380f621b5fc93647f2395a2be5ee&o=&hp=1",
    ],
    name: "Le Méridien",
    location: "Thimphu, Bhutan",
    date: "Jan 8-12",
    price: "Nu.12,000",
    reviews: 4.95,
    type: "hotel",
  },
  {
    images: [
      "https://dhensa.com/wp-content/uploads/2021/07/slider.jpg",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/a3/e3/63/dhensa-punakha.jpg?w=700&h=-1&s=1",
      "https://dhensa.com/wp-content/uploads/2021/07/slide-3-1.jpg",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/64564555.jpg?k=7116e6f803207f69136626346abc1ad1786e16b4e3b2bc206f11abd7051e8f86&o=&hp=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/9f/3b/3d/dhensa-boutique-resort.jpg?w=700&h=-1&s=1",
    ],
    name: "Dhensa",
    location: "Punakha, Bhutan",
    date: "Feb 8-12",
    price: "Nu.25,000",
    reviews: 4.88,
    type: "hotel",
  },
  {
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/1/1e/Taj_Tashi_Hotel_Thimphu_Bhutan_2010-12-19.jpg",
      "https://www.andbeyond.com/wp-content/uploads/sites/5/Deluxe-Suite-Living-Room-At-Taj-Tashi.jpg",
      "https://cdn.bookmytour.bt/uploads/hotels/hotel_photos/575aa3dca56e0_850_400.jpg",
      "https://media.hrs.com/media/image/74/21/6a/Taj_Tashi_Bhutan-Thimphu-Aussenansicht-8-534156.jpg",
    ],
    name: "Pemako",
    location: "Thimphu, Bhutan",
    date: "Jan 12-16",
    price: "Nu.18,000",
    reviews: 4.92,
    type: "hotel",
  },
  {
    images: [
      "https://www.bhutanhomestay.com/wp-content/uploads/2016/06/damchoe_homestay-2.jpg",
      "https://www.bhutanhomestay.com/wp-content/uploads/2016/06/damchoe_homestay-1.jpg",
      "https://www.bhutanhomestay.com/wp-content/uploads/2016/06/damchoe_homestay-12.jpg",
      "https://www.bhutaninbound.com/images/hotelslider/damchoe-s-homestay-lobby.jpg",
    ],
    name: "Damchoe's Homestay",
    location: "Thimphu, Bhutan",
    date: "Jan 10-17",
    price: "Nu.8,000",
    reviews: 4.87,
    type: "homestay",
  },
  {
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/471882742.jpg?k=742d5f09895a18a44fbb5bb5e520168b89f443af5dc429c367170db5e0c403e2&o=&hp=1",
      "https://www.bhutaninbound.com/images/innersubstay/Hotel%20Dewachen%20Phobjikha%20-.jpg",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/49/3c/f9/photo4jpg.jpg?w=1200&h=-1&s=1",
      "https://www.firefoxtours.com/sites/default/files/styles/red_panda_watermark/public/media/hotels/1863.jpg",
    ],
    name: "Hotel Phobjikha",
    location: "Phobjikha, Bhutan",
    date: "September 20-24",
    price: "Nu.8,000",
    reviews: 4.28,
    type: "hotel",
  },
  {
    images: [
      "https://www.gobhutantours.com/wp-content/uploads/2018/12/Aum-Om-Homestay-bhutan.png",
      "https://www.bhutaninbound.com/images/hotelslider/property.jpg",
      "https://www.bhutaninbound.com/images/hotelslider/bedroom.jpg",
      "https://yeegetaway.com/wp-content/uploads/2023/03/homestayinPunakha-1024x655.jpg",
    ],
    name: "Aum Om Homestay",
    location: "Punakha, Bhutan",
    date: "Jan 18-22",
    price: "Nu.9,000",
    reviews: 4.99,
    type: "homestay",
  },
  {
    images: [
      "https://www.dusit.com/dusitd2-yarkay-thimphu/wp-content/uploads/sites/3/cache/2020/05/D2TB-exterior/3132533412.jpg",
      "https://www.dusit.com/dusitd2-yarkay-thimphu/wp-content/uploads/sites/3/2020/02/D2TB-DChorten-Suite-1300x610-2.jpg",
      "https://drukcdn.blob.core.windows.net/www/images/media/drukasia_022219_drukasia-hotel-d2-dining-hall.jpg",
      "https://www.heavenlybhutan.com/wp-content/uploads/2019/04/DusitD2-Yarkay-Thimphu-Dining-e1596451803443.jpg",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/6f/d2/6a/d-light-room.jpg?w=700&h=-1&s=1",
    ],
    name: "DusitD2 Yarkay",
    location: "Thimphu, Bhutan",
    date: "April 8-12",
    price: "Nu.24,000",
    reviews: 4.18,
    type: "hotel",
  },
  {
    images: [
      "https://haavalleyhomestay.files.wordpress.com/2014/05/three-brother-hill.jpg",
      "https://www.bhutanhomestay.com/wp-content/uploads/2016/11/nilufa-ugyen-homestay1.jpg",
      "https://www.bhutaninbound.com/blog/wp-content/uploads/2021/07/Ugyen-Homestay-960x540.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/13/96/20/ea/ugyen-homestay-room.jpg",
    ],
    name: "Haa Valley Homestay",
    location: "Haa, Bhutan",
    date: "Feb 2-7",
    price: "Nu.15,000",
    reviews: 4.85,
    type: "homestay",
  },
  {
    images: [
      "https://gos3.ibcdn.com/1309286488c611e8b7590283eb712168.jpg",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/242920299.jpg?k=1e9491c9e765b95d4608bbb96eff48d17fd93e853d01ccd7a8c51a9f20d12fb8&o=&hp=1",
      "https://gommts3.mmtcdn.com/htl-imgs/htl-imgs/201711151332353871-01193c3b_z.jpg",
      "https://nirvana.bt/wp-content/uploads/2020/04/playing-football-800x530-1.jpg",
      "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/flyfish/raw/NH7410941570808/QS1042/QS1042-Q1/IMG_20191201_165931.jpg",
    ],
    name: "Nirvana Homestay",
    location: "Paro, Bhutan",
    date: "Feb 6-8",
    price: "Nu.12,000",
    reviews: 4.86,
    type: "homestay",
  },
  {
    images: [
      "https://www.boomingstar.com/assets/media/homestay/18920790_1310751445670086_5890879734195065175_o_95IrA59.jpg",
      "https://gos3.ibcdn.com/2261e2ca47fb11e9836a0242ac110002.jpg",
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/137392867.jpg?k=08d637fe1dd346f0d257484a714a313b0847d341afcf104be2e3abc42b7c474b&o=",
      "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/399753830.jpg?k=de24da1fcea3e719080885cba69af3b456a090663d665dbfed56ca690a504d6d&o=",
      "https://www.boomingstar.com/assets/media/homestay/gallery/0927a90d-1fed-42de-81bd-48195d24de5c.jpg",
    ],
    name: "Namgay Homestay",
    location: "Paro, Bhutan",
    date: "March 2, 12",
    price: "Nu.12,005",
    reviews: 4.76,
    type: "homestay",
  },
  {
    images: [
      "https://www.aman.com/sites/default/files/styles/full_size_extra_large/public/2021-01/Paro%20Lodge%2C%20Amankora%2C%20Bhutan_6.jpg?itok=-PPzJ1l0",
      "https://www.aman.com/sites/default/files/styles/full_size_extra_large/public/2023-01/Amankora%2C%20Bhutan%20-%20Accommodation%2C%20Paro%20Lodge%2C%20Living%20Room%20lounge3.jpg?itok=Nq_Gog5N",
      "https://www.aman.com/sites/default/files/styles/full_size_extra_large/public/2023-03/Amankora%2C%20Bhutan%20-%20Paro%20Lodge%20Terrace%20.jpg?itok=Apmc2CH3",
      "https://www.aman.com/sites/default/files/styles/full_size_extra_large/public/2021-03/Amankora-Paro.jpg?itok=9hsd8B2-",
      "https://ik.imgkit.net/3vlqs5axxjf/external/http://images.ntmllc.com/v4/Hotel/T15/T15836/T15836_EXT_Z86F58.jpg?tr=w-1200%2Cfo-auto",
    ],
    name: "Amankora",
    location: "Paro, Bhutan",
    date: "May 23-29",
    price: "Nu.15,000",
    reviews: 4.89,
    type: "hotel",
  },
  {
    images: [
      "https://www.communitytourism.bt/wp-content/uploads/2019/01/20181218_110639-1.jpg",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/0e/4d/5c/caption.jpg?w=700&h=-1&s=1",
      "https://www.communitytourism.bt/wp-content/uploads/2019/01/20181218_123425.jpg",
      "https://q-xx.bstatic.com/xdata/images/hotel/max500/158599151.jpg?k=c0383f286538347665ef6ad430b6787a3a6518069998ca71c8bfb1d5768b6077&o=",
    ],
    name: "Sigyal Dorji Farmhouse",
    location: "Phobjikha, Bhutan",
    date: "Feb 2-7",
    price: "Nu.1200",
    reviews: 4.66,
    type: "homestay",
  },
  {
    images: [
      "https://timetomosey.com/wp-content/uploads/2019/nov-06-bhutan-17-day-country-tour/2019-11-nov-11-mon-punakha-gangtey/wangchuk-dem-village-homestay-gangtey/wangchuk-dem-village-homestay-gangtey-03.jpg",
      "https://timetomosey.com/wp-content/uploads/2019/nov-06-bhutan-17-day-country-tour/2019-11-nov-11-mon-punakha-gangtey/wangchuk-dem-village-homestay-gangtey/wangchuk-dem-village-homestay-gangtey-29.jpg",
      "https://timetomosey.com/wp-content/uploads/2019/nov-06-bhutan-17-day-country-tour/2019-11-nov-11-mon-punakha-gangtey/wangchuk-dem-village-homestay-gangtey/wangchuk-dem-village-homestay-gangtey-05.jpg",
      "https://www.communitytourism.bt/wp-content/uploads/2017/12/w1.jpg",
    ],
    name: "Wangchuk Dem Homestay",
    location: "Phobjikha, Bhutan",
    date: "May 21-24",
    price: "Nu.1000",
    reviews: 4.77,
    type: "homestay",
  },
  {
    images: [
      "http://www.yugharlingresort.com/wp-content/uploads/2016/12/yugharling_overview.jpg",
      "http://www.yugharlingresort.com/wp-content/uploads/2017/03/slider_roomview.jpg",
      "http://www.yugharlingresort.com/wp-content/uploads/2017/03/slider_outdoor.jpg",
      "http://www.yugharlingresort.com/wp-content/uploads/2017/03/slider_dining.jpg",
    ],
    name: "Yugharling",
    location: "Bumthang, Bhutan",
    date: "May 12-24",
    price: "Nu.25,000",
    reviews: 4.79,
    type: "hotel",
  },
  {
    images: [
      "https://www.bhutanhomestay.com/wp-content/uploads/2016/06/dorjibi_homestay_lodge_bumthang-6.jpg",
      "https://www.bhutanhomestay.com/wp-content/uploads/2016/06/dorjibi_homestay_lodge_bumthang-1.jpg",
      "https://www.bhutanhomestay.com/wp-content/uploads/2016/06/dorjibi_homestay_lodge_bumthang-8.jpg",
      "https://www.bhutanhomestay.com/wp-content/uploads/2016/06/dorjibi_bumthang-16.jpg",
    ],
    name: "Dorjibi Homestay",
    location: "Bumthang, Bhutan",
    date: "June 12-20",
    price: "Nu.2000",
    reviews: 4.89,
    type: "homestay",
  },
  {
    images: [
      "https://phobjikharesort.bt/images/mmexport1643179108813.jpg",
      "https://www.heavenlybhutan.com/wp-content/uploads/2019/07/Phobjikha-Resort.jpeg",
      "https://phobjikharesort.bt/images/stairs.jpg",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/db/a2/24/hotel-ugyen-ling.jpg?w=700&h=-1&s=1",
    ],
    name: "Phobjikha Resort",
    location: "Phobjikha, Bhutan",
    date: "August 12-24",
    price: "Nu.9500",
    reviews: 4.55,
    type: "hotel",
  },
  {
    images: [
      "https://de87ve0y4m3tc.cloudfront.net/comohotels.com-2459770069/cms/cache/v2/631ee343698d9.jpg/1200x630/fit/80/757ebe71bb0dfbc2aff385e8f06573b8.jpg",
      "https://de87ve0y4m3tc.cloudfront.net/comohotels.com-2459770069/cms/cache/v2/631ee39f50fea.jpg/1120x590/fit/80/6d779a2a5347a073e6b14532339b7934.jpg",
      "https://de87ve0y4m3tc.cloudfront.net/comohotels.com-2459770069/cms/cache/v2/631ee33fe500c.jpg/1120x590/fit/80/dbbf7ba49d8d6ac399458171d377d4fe.jpg",
      "https://foodstime.files.wordpress.com/2013/08/img_8400.jpg",
    ],
    name: "Bukhari",
    location: "Paro, Bhutan",
    date: "August 12-24",
    price: "Nu.4000",
    reviews: 4.55,
    type: "restaurant",
  },
  {
    images: [
      "https://r1imghtlak.mmtcdn.com/40c3b968902811e882a90a86f7a5a084.jpg",
      "https://image.arrivalguides.com/x/04/d1c344dca9ee1d6b7b420db827ff65a9.jpg",
      "https://r1imghtlak.mmtcdn.com/df91f42e3dab11eab8210242ac110006.jpg",
      "https://cdn.bookmytour.bt/uploads/hotels/main_photo/sonam-trophel-1-1466748773_850_400.jpg",
    ],
    name: "Sonam Trophel",
    location: "Paro, Bhutan",
    date: "September 10-20",
    price: "Nu.1800",
    reviews: 4.21,
    type: "restaurant",
  },
  {
    images: [
      "https://chunidingfood.com/wp-content/uploads/2017/05/4.jpg",
      "https://chunidingfood.com/wp-content/uploads/2017/05/2.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/04/17/f0/25/folk-heritage-museum.jpg",
      "https://www.triptobhutan.com/img-resta/folk-heritage-restaurant%20(4).jpg",
    ],
    name: "Folk Heritage Museum",
    location: "Thimphu, Bhutan",
    date: "August 12-24",
    price: "Nu.1500",
    reviews: 4.35,
    type: "restaurant",
  },
  {
    images: [
      "https://static.wixstatic.com/media/ae370b_c9a1a78e398c405582098ea753595a1d~mv2.jpg/v1/fill/w_1728,h_1152,al_c/ae370b_c9a1a78e398c405582098ea753595a1d~mv2.jpg",
      "https://www.visitbhutan.com/cms/images/8132sanmaru%20restaurant%203.png",
      "https://cdn.hamgardi.com/Images/Place/20171007141/800_600/Hamgardi_2549i812nC3.jpg",
      "https://www.heavenlybhutan.com/wp-content/uploads/2019/05/San-Maru-Restaurant-Thimphu.png",
    ],
    name: "San Maru",
    location: "Thimphu, Bhutan",
    date: "April 12-24",
    price: "Nu.1800",
    reviews: 4.89,
    type: "restaurant",
  },
  {
    images: [
      "https://upload.wikimedia.org/wikipedia/commons/4/46/Bhutan-Paro-136-Taktshang-Tigernest-gje.jpg",
      "https://www.bhutaninbound.com/images/placeslider/Jakar%20Dzong%202.jpg",
      "https://images.unsplash.com/photo-1580649851649-992b28f56e98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80",
      "https://www.breathebhutan.com/wp-content/uploads/2019/05/Tick-the-Tigers-Nest.jpg",
      "https://images.unsplash.com/photo-1608659377506-3b4fec4f7634?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1581588344552-b92555010a4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    name: "21 Day Barprapra",
    location: "Various Places, Bhutan",
    date: "April 1-21",
    price: "Nu.30,000",
    reviews: 4.97,
    type: "packages",
  },
  {
    images: [
      "https://livingnomads.com/wp-content/uploads/2018/11/16/Jhomolhari-Trek-2.jpg",
      "https://www.bletour.com/wp-content/uploads/2018/12/jomolharipic1.jpg",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/66/64/2b/jhomolhari.jpg?w=1200&h=-1&s=1",
      "https://authenticbhutantours.com/wp-content/uploads/2016/11/Jhomolhari-Trek.jpeg",
      "https://www.adventhimalayatreks.com/assets/images/bhutan/jomolhari-trek.jpg",
    ],
    name: "The Last Venture",
    location: "Paro, Bhutan",
    date: "June 6-16",
    price: "Nu.15,000",
    reviews: 4.95,
    type: "packages",
  },
  {
    images: [
      "https://img.atlasobscura.com/aoyOyiB37FfLt9P3uP5-UNrLkL1Sch4WDCSK4CtBEa8/rs:fill:780:520:1/g:ce/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy8yMzFk/N2YzZWM5ZDhlMTMy/OTlfRG9yZGVubWEu/anBn.jpg",
      "https://www.swantour.com/blogs/wp-content/uploads/2017/10/Shopping-in-Thimphu-Bhutan.jpg",
      "https://www.bhutaninbound.com/blog/wp-content/uploads/2020/10/Buddha-Point-614x768.jpg",
      "https://assets.traveltriangle.com/blog/wp-content/uploads/2017/08/32623e2b-9945-4c32-ad7c-3602b03f9072-originalkb6592.jpeg",
      "https://pickyourtrail.com/blog/wp-content/uploads/2020/05/6590269813_45d2bbea04_b-1.jpg",
    ],
    name: "8 Classic Days",
    location: "Thimphu, Bhutan",
    date: "August 2-10",
    price: "Nu.22,000",
    reviews: 4.88,
    type: "packages",
  },
  {
    images: [
      "https://images.unsplash.com/photo-1598868660314-f40770bfc932?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1884&q=80",
      "https://images.unsplash.com/photo-1566020586758-23d5e0ff7a64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1553027803-884b4628863f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1913&q=80",
      "https://images.unsplash.com/photo-1534004389909-e913db242ecb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    name: "4th Spiritual Healing",
    location: "Various Places, Bhutan",
    date: "November 6-10",
    price: "Nu.55,000",
    reviews: 4.99,
    type: "packages",
  },
];

export default data;

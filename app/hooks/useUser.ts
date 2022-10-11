import axios from 'axios';
import {useQuery} from 'react-query';

const getUserById = async (userId: string) => {
  const {data} = await axios.get(
    `https://api.navenu.com/index.php/Users/${userId}`,
  );
  return data;
};

export const useUser = (userId: string) => {
  return useQuery(['userInfo', userId], () => getUserById(userId));
};

/*
{
  "user": {
    "ID": "1241",
    "social_id": null,
    "authType": null,
    "user_login": "navenuteam",
    "user_pass": "$P$BhOk38LXhsNodJsKML0hWph/.Frhbu/",
    "user_nicename": "navenuteam",
    "user_email": "navenuteam@navenu.com",
    "user_url": "",
    "user_registered": "2021-02-03 17:24:11",
    "user_activation_key": "",
    "user_status": "0",
    "display_name": "Navenu Team",
    "last_login": "1656561139",
    "ip_address": "",
    "remember_selector": "b2084dad2e89362503bbb9401ea5d26e3d112fb6",
    "remember_code": null,
    "activation_selector": null,
    "activation_code": null,
    "forgotten_password_selector": null,
    "forgotten_password_code": null,
    "forgotten_password_time": null
  },
  "savedList": {
    "userlist": {
      "test": {
        "user_list_id": "74",
        "feed": [
          {
            "type": "location",
            "id": "3796",
            "lat": "51.51395500000000000000",
            "lng": "-0.13291300000000000000",
            "image": "media/venues/bccae577a5d9bc9ad59ac4b599ab9cfe.jpg",
            "phone": "020 3006 0076",
            "website": "https://www.sohohouse.com/houses/soho-house-76-dean-street?utm_source=google&utm_medium=organic&utm_campaign=googlemybusiness",
            "status": "0",
            "rating": null,
            "owner": "Soho Farmhouse / 76 Dean Street",
            "name": "Soho Farmhouse / 76 Dean Street",
            "price_level": "3",
            "operating_hours": null,
            "short_description": "TBD",
            "long_description": "TBD",
            "category": "Hotel",
            "distance": "",
            "tags": [
              "247",
              "248",
              "185",
              "186",
              "97",
              "156",
              "187"
            ],
            "nearby": 0,
            "user_list_id": "74"
          },
          {
            "type": "location",
            "id": "3782",
            "lat": "51.50906550000000000000",
            "lng": "-0.13179490000000000000",
            "image": "media/venues/ed9234836ebc419e006745c3294f453a.png",
            "phone": "020 7518 0680",
            "website": "http://london.doverstreetmarket.com/",
            "status": "0",
            "rating": null,
            "owner": "Dover Street Market",
            "name": "Dover Street Market",
            "price_level": "4",
            "operating_hours": "Monday: 12:00 – 7:00 PM,Tuesday: 12:00 – 7:00 PM,Wednesday: 12:00 – 7:00 PM,Thursday: 12:00 – 7:00 PM,Friday: 12:00 – 7:00 PM,Saturday: 12:00 – 7:00 PM,Sunday: 12:00 – 6:00 PM",
            "short_description": "A retailer that mainly sells high fashion products, but also features items from more urban, streetwear brands.",
            "long_description": "★ It was created by Rei Kawakubo (of Japanese fashion label Comme des Garçons) and her husband Adrian Joffe.★ It obviously sells all Comme des Garçons brands. But also Balenciaga, Céline, Gucci, Maison Margiela, Nike, Rick Owens, Stüssy, Supreme and way, way more.★ Psst. Over the years, it has collaborated with the Frieze Art Fair, the Michael Hoppen Gallery and the Institute of Contemporary Arts (ICA) to showcase work throughout the store.",
            "category": "Markets",
            "distance": "",
            "tags": [
              "181",
              "182",
              "183",
              "184"
            ],
            "nearby": 0,
            "user_list_id": "74"
          },
          {
            "type": "location",
            "id": "3762",
            "lat": "51.51300270000000000000",
            "lng": "-0.13722650000000000000",
            "image": "media/venues/e2ceec21a5da41e324a301f94cd5037e.jpg",
            "phone": "020 7287 3676",
            "website": "https://www.endclothing.com/",
            "status": "0",
            "rating": null,
            "owner": "END.",
            "name": "END.",
            "price_level": "3",
            "operating_hours": "Monday: 10:00 AM – 7:00 PM,Tuesday: 10:00 AM – 7:00 PM,Wednesday: 10:00 AM – 7:00 PM,Thursday: 10:00 AM – 7:00 PM,Friday: 10:00 AM – 7:00 PM,Saturday: 10:00 AM – 7:00 PM,Sunday: 10:00 AM – 6:00 PM",
            "short_description": "Conquer the 8,500-square-foot, still-newish London flagship of the British menswear retailer — a leader for style, sneakers, luxury and life.",
            "long_description": "★ It’s their third and largest space to date, housing a range of the most noteworthy names in contemporary menswear, alongside the titans of sneakers and sportswear.★ The concept mirrors their Glasgow and Newcastle flagships, using a premium palette of marble, stainless steel, mirror and maple to create large, monolithic landscapes.★ You shouldn’t miss — and, really, you can’t miss — the sneaker wall that wraps around the entire corner of a glazed façade.",
            "category": "Luxury",
            "distance": "",
            "tags": [
              "226",
              "182",
              "183",
              "224",
              "225"
            ],
            "nearby": 0,
            "user_list_id": "74"
          }
        ]
      }
    },
    "locations": [
      {
        "type": "location",
        "id": "3796",
        "lat": "51.51395500000000000000",
        "lng": "-0.13291300000000000000",
        "image": "media/venues/bccae577a5d9bc9ad59ac4b599ab9cfe.jpg",
        "phone": "020 3006 0076",
        "website": "https://www.sohohouse.com/houses/soho-house-76-dean-street?utm_source=google&utm_medium=organic&utm_campaign=googlemybusiness",
        "status": "0",
        "rating": null,
        "owner": "Soho Farmhouse / 76 Dean Street",
        "name": "Soho Farmhouse / 76 Dean Street",
        "price_level": "3",
        "operating_hours": null,
        "short_description": "TBD",
        "long_description": "TBD",
        "category": "Hotel",
        "distance": "",
        "tags": [
          "247",
          "248",
          "185",
          "186",
          "97",
          "156",
          "187"
        ],
        "nearby": 0,
        "user_list_id": "74"
      },
      {
        "type": "location",
        "id": "3782",
        "lat": "51.50906550000000000000",
        "lng": "-0.13179490000000000000",
        "image": "media/venues/ed9234836ebc419e006745c3294f453a.png",
        "phone": "020 7518 0680",
        "website": "http://london.doverstreetmarket.com/",
        "status": "0",
        "rating": null,
        "owner": "Dover Street Market",
        "name": "Dover Street Market",
        "price_level": "4",
        "operating_hours": "Monday: 12:00 – 7:00 PM,Tuesday: 12:00 – 7:00 PM,Wednesday: 12:00 – 7:00 PM,Thursday: 12:00 – 7:00 PM,Friday: 12:00 – 7:00 PM,Saturday: 12:00 – 7:00 PM,Sunday: 12:00 – 6:00 PM",
        "short_description": "A retailer that mainly sells high fashion products, but also features items from more urban, streetwear brands.",
        "long_description": "★ It was created by Rei Kawakubo (of Japanese fashion label Comme des Garçons) and her husband Adrian Joffe.★ It obviously sells all Comme des Garçons brands. But also Balenciaga, Céline, Gucci, Maison Margiela, Nike, Rick Owens, Stüssy, Supreme and way, way more.★ Psst. Over the years, it has collaborated with the Frieze Art Fair, the Michael Hoppen Gallery and the Institute of Contemporary Arts (ICA) to showcase work throughout the store.",
        "category": "Markets",
        "distance": "",
        "tags": [
          "181",
          "182",
          "183",
          "184"
        ],
        "nearby": 0,
        "user_list_id": "74"
      },
      {
        "type": "location",
        "id": "3762",
        "lat": "51.51300270000000000000",
        "lng": "-0.13722650000000000000",
        "image": "media/venues/e2ceec21a5da41e324a301f94cd5037e.jpg",
        "phone": "020 7287 3676",
        "website": "https://www.endclothing.com/",
        "status": "0",
        "rating": null,
        "owner": "END.",
        "name": "END.",
        "price_level": "3",
        "operating_hours": "Monday: 10:00 AM – 7:00 PM,Tuesday: 10:00 AM – 7:00 PM,Wednesday: 10:00 AM – 7:00 PM,Thursday: 10:00 AM – 7:00 PM,Friday: 10:00 AM – 7:00 PM,Saturday: 10:00 AM – 7:00 PM,Sunday: 10:00 AM – 6:00 PM",
        "short_description": "Conquer the 8,500-square-foot, still-newish London flagship of the British menswear retailer — a leader for style, sneakers, luxury and life.",
        "long_description": "★ It’s their third and largest space to date, housing a range of the most noteworthy names in contemporary menswear, alongside the titans of sneakers and sportswear.★ The concept mirrors their Glasgow and Newcastle flagships, using a premium palette of marble, stainless steel, mirror and maple to create large, monolithic landscapes.★ You shouldn’t miss — and, really, you can’t miss — the sneaker wall that wraps around the entire corner of a glazed façade.",
        "category": "Luxury",
        "distance": "",
        "tags": [
          "226",
          "182",
          "183",
          "224",
          "225"
        ],
        "nearby": 0,
        "user_list_id": "74"
      }
    ],
    "tags": [
      [
        "247",
        "248",
        "185",
        "186",
        "97",
        "156",
        "187"
      ],
      [
        "181",
        "182",
        "183",
        "184"
      ],
      [
        "226",
        "182",
        "183",
        "224",
        "225"
      ]
    ]
  },
  "savedDeals": [
    {
      "id": "38",
      "type": "drop",
      "venue_id": null,
      "lat": null,
      "lng": null,
      "expiration": "1970/01/01",
      "image": "https://media.navenu.com/",
      "name": null,
      "intro": null,
      "description": "",
      "operating_hours": null,
      "format": null,
      "venue_description": "",
      "address": "    ",
      "venue": null,
      "parent_category": null,
      "category": null,
      "distance": null,
      "phone": null,
      "website": null,
      "price_level": null,
      "tags": null,
      "claimcode": "Soho2"
    },
    {
      "id": "40",
      "type": "drop",
      "venue_id": null,
      "lat": null,
      "lng": null,
      "expiration": "1970/01/01",
      "image": "https://media.navenu.com/",
      "name": null,
      "intro": null,
      "description": "",
      "operating_hours": null,
      "format": null,
      "venue_description": "",
      "address": "    ",
      "venue": null,
      "parent_category": null,
      "category": null,
      "distance": null,
      "phone": null,
      "website": null,
      "price_level": null,
      "tags": null,
      "claimcode": "SmithandWollensky3"
    },
    {
      "id": "41",
      "type": "drop",
      "venue_id": null,
      "lat": null,
      "lng": null,
      "expiration": "1970/01/01",
      "image": "https://media.navenu.com/",
      "name": null,
      "intro": null,
      "description": "",
      "operating_hours": null,
      "format": null,
      "venue_description": "",
      "address": "    ",
      "venue": null,
      "parent_category": null,
      "category": null,
      "distance": null,
      "phone": null,
      "website": null,
      "price_level": null,
      "tags": null,
      "claimcode": "adasda"
    }
  ],
  "savedLocations": null,
  "userLists": null
}*/

export type Stone = {
  id: string;
  name: string;
  image: any;
};

export type Location = {
  id: string;
  name: string;
  coordinates: string;
  stones: Stone[];
  image: any;
  description: string;
};

export const locations: Location[] = [
  {
    id: '1',
    name: 'Brighton Beach',
    coordinates: '46.8450, -92.0050',
    image: require('../assets/images/BrightonBeach.png'),
    stones: [
      { id: 'agate', name: 'Agate', image: require('../assets/images/Agate.png') },
      { id: 'quartz', name: 'Quartz', image: require('../assets/images/Quartz.png') },
    ],
    description: `Brighton Beach is one of the most accessible locations along Lake Superior. The shoreline is covered with smooth pebbles shaped by constant wave activity. This makes it a great place for both beginners and experienced collectors. The variety of stones here changes with the seasons.\n\nAgates are commonly found after storms or strong waves. Water movement helps expose hidden stones and wash away sand. Quartz pieces are also easy to spot due to their lighter color. Wet stones often appear more vibrant and easier to identify.\n\nEarly morning is the best time to explore this area. The light makes it easier to see details and colors. The beach is usually calm and less crowded. It is a good place to start building a collection.`,
  },
  {
    id: '2',
    name: "Iona's Beach",
    coordinates: '47.1550, -91.4200',
    image: require('../assets/images/IonasBeach.png'),
    stones: [
      { id: 'rhyolite', name: 'Rhyolite', image: require('../assets/images/Rhyolite.png') },
      { id: 'jasper', name: 'Jasper', image: require('../assets/images/Jasper.png') },
    ],
    description: `Iona's Beach is known for its unique pink and red stones. The shoreline is covered with rhyolite, giving the beach a distinct color. This makes it one of the most visually recognizable locations. The sound of stones moving with waves adds to the experience.\n\nRhyolite is the most common stone here and comes in different shades of red and pink. Jasper can also be found among the pebbles. These stones often have smooth surfaces and subtle patterns. Their color makes them easy to identify.\n\nThis location is best visited during calm weather. The stones are more visible when the water is clear. Walking slowly along the shore increases your chances of finding interesting pieces. It is a great place for colorful finds.`,
  },
  {
    id: '3',
    name: 'Gooseberry Falls',
    coordinates: '47.1390, -91.4660',
    image: require('../assets/images/GooseberryFalls.png'),
    stones: [
      { id: 'basalt', name: 'Basalt', image: require('../assets/images/Basalt.png') },
      { id: 'quartz', name: 'Quartz', image: require('../assets/images/Quartz.png') },
    ],
    description: `Gooseberry Falls offers a mix of waterfalls and rocky terrain. The flowing water shapes stones over time. This creates a variety of textures and sizes. The area is ideal for exploring different types of rocks.\n\nBasalt is common here due to the volcanic history of the region. It appears dark and dense. Quartz can be found in lighter shades and often stands out. The contrast between these stones makes searching easier.\n\nLook near water edges and shallow streams. These areas tend to collect stones over time. The constant movement reveals new pieces. It is a good location for both learning and collecting.`,
  },
  {
    id: '4',
    name: 'Split Rock Lighthouse Beach',
    coordinates: '47.2000, -91.3670',
    image: require('../assets/images/SplitRockLighthouseBeach.png'),
    stones: [
      { id: 'agate', name: 'Agate', image: require('../assets/images/Agate.png') },
      { id: 'jasper', name: 'Jasper', image: require('../assets/images/Jasper.png') },
    ],
    description: `This location combines scenic views with great stone hunting opportunities. The rocky shoreline provides a variety of stones. Waves constantly reshape the area, exposing new finds. It is a popular but rewarding spot.\n\nAgates are often found among smaller pebbles. Jasper appears in red and earthy tones. Both are easier to see when wet. Careful observation is important in this area.\n\nThe best time to search is after changes in weather. New stones appear as layers shift. Exploring different sections of the beach increases variety. It is a great place for patient searching.`,
  },
  {
    id: '5',
    name: 'Black Beach (Silver Bay)',
    coordinates: '47.2940, -91.2700',
    image: require('../assets/images/BlackBeachSilverBay.png'),
    stones: [
      { id: 'basalt', name: 'Basalt', image: require('../assets/images/Basalt.png') },
      { id: 'granite', name: 'Granite', image: require('../assets/images/Granite.png') },
    ],
    description: `Black Beach is known for its dark sand and stones. The unique color comes from taconite residue. This creates a strong contrast with lighter stones. It makes searching visually easier.\n\nBasalt is commonly found due to its dark volcanic origin. Granite pieces are also present and show mixed textures. These stones often appear more clearly against the black background. This makes identification simpler.\n\nThe beach is relatively calm and easy to explore. Walking slowly helps notice small details. Different lighting conditions can change how stones appear. It is a visually striking location.`,
  },
  {
    id: '6',
    name: 'Little Marais',
    coordinates: '47.4500, -91.1200',
    image: require('../assets/images/LittleMarais.png'),
    stones: [
      { id: 'agate', name: 'Agate', image: require('../assets/images/Agate.png') },
      { id: 'quartz', name: 'Quartz', image: require('../assets/images/Quartz.png') },
    ],
    description: `Little Marais is a quieter location with fewer visitors. The shoreline offers a mix of small and medium stones. This makes it easier to spot unique shapes. It is ideal for relaxed searching.\n\nAgates are commonly found after wave activity. Quartz pieces appear in lighter tones and are easy to identify. These stones often stand out against darker backgrounds. Careful scanning helps find them.\n\nThe peaceful environment makes this location enjoyable. It is best explored slowly. Less foot traffic means more untouched areas. This increases your chances of finding something special.`,
  },
  {
    id: '7',
    name: 'Grand Marais Harbor',
    coordinates: '47.7500, -90.3400',
    image: require('../assets/images/GrandMaraisHarbor.png'),
    stones: [
      { id: 'jasper', name: 'Jasper', image: require('../assets/images/Jasper.png') },
      { id: 'quartz', name: 'Quartz', image: require('../assets/images/Quartz.png') },
    ],
    description: `Grand Marais Harbor is a well-known spot for stone collecting. The mix of natural shoreline and harbor structure creates variety. Stones accumulate in different areas depending on water movement. This makes searching interesting.\n\nJasper is commonly found in warm red tones. Quartz appears in lighter shades and contrasts well. These stones are often polished by water. This makes them visually appealing.\n\nExploring different sections of the harbor is recommended. Some areas have more variety than others. Observing water flow helps find better spots. It is a reliable location for collecting.`,
  },
  {
    id: '8',
    name: 'Whitefish Point',
    coordinates: '46.7700, -84.9600',
    image: require('../assets/images/WhitefishPoint.png'),
    stones: [
      { id: 'quartz', name: 'Quartz', image: require('../assets/images/Quartz.png') },
      { id: 'granite', name: 'Granite', image: require('../assets/images/Granite.png') },
    ],
    description: `Whitefish Point is known for its long shoreline and natural beauty. The area has a wide range of stones. Constant wave action shapes and moves them. This creates a dynamic environment.\n\nQuartz is easy to spot due to its light color. Granite appears with mixed mineral textures. Both are common and accessible. These stones are good for beginners.\n\nWalking along the shore reveals different patterns. Some areas have more concentrated stones. Changing conditions bring new finds. It is a great place for exploration.`,
  },
  {
    id: '9',
    name: 'Agate Beach (Two Harbors)',
    coordinates: '47.0200, -91.6700',
    image: require('../assets/images/AgateBeachTwoHarbors.png'),
    stones: [
      { id: 'agate', name: 'Agate', image: require('../assets/images/Agate.png') },
      { id: 'jasper', name: 'Jasper', image: require('../assets/images/Jasper.png') },
    ],
    description: `Agate Beach is one of the most popular locations for collectors. The name reflects the type of stones commonly found here. The shoreline is rich in small, colorful pebbles. This makes it ideal for searching.\n\nAgates are the main attraction. They often appear with bands or patterns. Jasper is also common and adds color variety. Both are easier to find after waves shift the stones.\n\nThis beach rewards patience and attention. Looking closely increases your chances of success. It is a great place to practice identification. Many collectors return here often.`,
  },
  {
    id: '10',
    name: 'Tettegouche State Park',
    coordinates: '47.3380, -91.2000',
    image: require('../assets/images/TettegoucheStatePark.png'),
    stones: [
      { id: 'basalt', name: 'Basalt', image: require('../assets/images/Basalt.png') },
      { id: 'jasper', name: 'Jasper', image: require('../assets/images/Jasper.png') },
    ],
    description: `Tettegouche State Park offers diverse landscapes. The rocky shoreline provides a variety of stone types. Waves and weather continuously reshape the area. This creates new opportunities for discovery.\n\nBasalt is common due to the volcanic history. Jasper appears in red and earthy tones. These stones are often found near water edges. Their contrast makes them easier to spot.\n\nExploring different parts of the park is recommended. Some areas are more productive than others. Taking time to observe increases success. It is a great place for both learning and collecting.`,
  },
];
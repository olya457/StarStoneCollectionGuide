export type QuizQuestion = {
  id: string;
  question: string;
  image?: any;
  options: string[];
  correctAnswer: string;
};

export type QuizLevel = {
  id: number;
  title: string;
  questions: QuizQuestion[];
};

const rockImage = require('../assets/images/onboard3.png');

export const quizLevelsData: QuizLevel[] = [
  {
    id: 1,
    title: 'How Stones Are Formed',
    questions: [
      {
        id: '1-1',
        question: 'What are the three main types of rocks?',
        image: rockImage,
        options: ['Igneous', 'Sedimentary', 'Metamorphic', 'Artificial'],
        correctAnswer: 'Metamorphic',
      },
      {
        id: '1-2',
        question: 'What forms igneous rocks?',
        image: rockImage,
        options: ['Water', 'Wind', 'Magma or lava', 'Sand'],
        correctAnswer: 'Magma or lava',
      },
      {
        id: '1-3',
        question: 'What creates sedimentary rocks?',
        image: rockImage,
        options: ['Heat', 'Pressure', 'Compacted particles', 'Ice'],
        correctAnswer: 'Compacted particles',
      },
      {
        id: '1-4',
        question: 'What changes rocks into metamorphic?',
        image: rockImage,
        options: ['Sunlight', 'Wind', 'Heat and pressure', 'Rain'],
        correctAnswer: 'Heat and pressure',
      },
      {
        id: '1-5',
        question: 'Which force most often transforms rock deep underground?',
        image: rockImage,
        options: ['Heat and pressure', 'Fog', 'Moonlight', 'Salt'],
        correctAnswer: 'Heat and pressure',
      },
    ],
  },
  {
    id: 2,
    title: 'Where to Find Stones',
    questions: [
      {
        id: '2-1',
        question: 'Where are stones easiest to find?',
        image: rockImage,
        options: ['Deserts', 'Cities', 'Shorelines', 'Roads'],
        correctAnswer: 'Shorelines',
      },
      {
        id: '2-2',
        question: 'What helps reveal stones near water?',
        image: rockImage,
        options: ['Wind', 'Fire', 'Moving water', 'Ice'],
        correctAnswer: 'Moving water',
      },
      {
        id: '2-3',
        question: 'When is the best time to search beaches?',
        image: rockImage,
        options: ['At night', 'After storms', 'Midday', 'Winter only'],
        correctAnswer: 'After storms',
      },
      {
        id: '2-4',
        question: 'Where are smooth stones commonly found?',
        image: rockImage,
        options: ['Mountains', 'Rivers', 'Forests', 'Fields'],
        correctAnswer: 'Rivers',
      },
      {
        id: '2-5',
        question: 'Which location often reveals fresh stones after water movement?',
        image: rockImage,
        options: ['Parking lots', 'Shorelines', 'Roofs', 'Grasslands'],
        correctAnswer: 'Shorelines',
      },
    ],
  },
  {
    id: 3,
    title: 'How to Identify an Interesting Stone',
    questions: [
      {
        id: '3-1',
        question: 'What is the first thing to notice in a stone?',
        image: rockImage,
        options: ['Smell', 'Color', 'Temperature', 'Size'],
        correctAnswer: 'Color',
      },
      {
        id: '3-2',
        question: 'What texture is common for water-shaped stones?',
        image: rockImage,
        options: ['Rough', 'Smooth', 'Sticky', 'Soft'],
        correctAnswer: 'Smooth',
      },
      {
        id: '3-3',
        question: 'What can patterns in stones indicate?',
        image: rockImage,
        options: ['Age', 'Price', 'Formation history', 'Weight'],
        correctAnswer: 'Formation history',
      },
      {
        id: '3-4',
        question: 'What shape is often considered attractive?',
        image: rockImage,
        options: ['Sharp', 'Broken', 'Rounded', 'Flat only'],
        correctAnswer: 'Rounded',
      },
      {
        id: '3-5',
        question: 'Which detail often makes a stone visually special?',
        image: rockImage,
        options: ['Pattern', 'Dust', 'Mud', 'Noise'],
        correctAnswer: 'Pattern',
      },
    ],
  },
  {
    id: 4,
    title: 'How to Find Rare Stones',
    questions: [
      {
        id: '4-1',
        question: 'What increases chances of finding rare stones?',
        image: rockImage,
        options: ['Speed', 'Luck', 'Time spent searching', 'Size of bag'],
        correctAnswer: 'Time spent searching',
      },
      {
        id: '4-2',
        question: 'When are rare stones easier to find?',
        image: rockImage,
        options: ['During dry days', 'After storms', 'At night', 'Indoors'],
        correctAnswer: 'After storms',
      },
      {
        id: '4-3',
        question: 'Why explore different locations?',
        image: rockImage,
        options: ['For fun', 'To see views', 'More variety', 'Less walking'],
        correctAnswer: 'More variety',
      },
      {
        id: '4-4',
        question: 'What helps identify rare stones?',
        image: rockImage,
        options: ['Ignoring details', 'Quick search', 'Careful observation', 'Random picking'],
        correctAnswer: 'Careful observation',
      },
      {
        id: '4-5',
        question: 'What improves your chance of spotting unusual stones?',
        image: rockImage,
        options: ['Patience', 'Noise', 'Running', 'Darkness'],
        correctAnswer: 'Patience',
      },
    ],
  },
  {
    id: 5,
    title: 'Why Stones Have Different Colors',
    questions: [
      {
        id: '5-1',
        question: 'What determines stone color?',
        image: rockImage,
        options: ['Water', 'Minerals', 'Air', 'Light'],
        correctAnswer: 'Minerals',
      },
      {
        id: '5-2',
        question: 'What color can iron create?',
        image: rockImage,
        options: ['Blue', 'Red', 'White', 'Purple'],
        correctAnswer: 'Red',
      },
      {
        id: '5-3',
        question: 'Why do some stones have multiple colors?',
        image: rockImage,
        options: ['Weather', 'Mixed minerals', 'Age', 'Shape'],
        correctAnswer: 'Mixed minerals',
      },
      {
        id: '5-4',
        question: 'Why do stones look brighter when wet?',
        image: rockImage,
        options: ['They grow', 'They heat up', 'Light reflection', 'They change color'],
        correctAnswer: 'Light reflection',
      },
      {
        id: '5-5',
        question: 'What usually causes visible color variation in a single stone?',
        image: rockImage,
        options: ['Mixed minerals', 'Shadow', 'Wind', 'Temperature'],
        correctAnswer: 'Mixed minerals',
      },
    ],
  },
  {
    id: 6,
    title: 'Common Types of Stones',
    questions: [
      {
        id: '6-1',
        question: 'Which is a common mineral?',
        image: rockImage,
        options: ['Plastic', 'Quartz', 'Glass', 'Sand'],
        correctAnswer: 'Quartz',
      },
      {
        id: '6-2',
        question: 'What does granite usually look like?',
        image: rockImage,
        options: ['Solid color', 'Speckled', 'Transparent', 'Soft'],
        correctAnswer: 'Speckled',
      },
      {
        id: '6-3',
        question: 'What color is basalt usually?',
        image: rockImage,
        options: ['White', 'Yellow', 'Dark', 'Green'],
        correctAnswer: 'Dark',
      },
      {
        id: '6-4',
        question: 'What texture does sandstone have?',
        image: rockImage,
        options: ['Smooth', 'Rough', 'Glossy', 'Soft'],
        correctAnswer: 'Rough',
      },
      {
        id: '6-5',
        question: 'Which stone type often appears dark and dense?',
        image: rockImage,
        options: ['Basalt', 'Chalk', 'Ice', 'Clay'],
        correctAnswer: 'Basalt',
      },
    ],
  },
  {
    id: 7,
    title: 'How Water Shapes Stones',
    questions: [
      {
        id: '7-1',
        question: 'What process shapes stones in water?',
        image: rockImage,
        options: ['Burning', 'Freezing', 'Erosion', 'Growth'],
        correctAnswer: 'Erosion',
      },
      {
        id: '7-2',
        question: 'What happens when stones collide in water?',
        image: rockImage,
        options: ['They grow', 'They break', 'They smooth out', 'They melt'],
        correctAnswer: 'They smooth out',
      },
      {
        id: '7-3',
        question: 'What kind of stones does water create?',
        image: rockImage,
        options: ['Sharp', 'Smooth', 'Flat only', 'Hollow'],
        correctAnswer: 'Smooth',
      },
      {
        id: '7-4',
        question: 'What does water movement do?',
        image: rockImage,
        options: ['Hides stones', 'Destroys stones', 'Reveals stones', 'Colors stones'],
        correctAnswer: 'Reveals stones',
      },
      {
        id: '7-5',
        question: 'What is a common result of long water exposure?',
        image: rockImage,
        options: ['Sharper edges', 'Smoother edges', 'Hotter stones', 'Bigger stones'],
        correctAnswer: 'Smoother edges',
      },
    ],
  },
  {
    id: 8,
    title: 'Best Time to Search for Stones',
    questions: [
      {
        id: '8-1',
        question: 'When is a good time to search?',
        image: rockImage,
        options: ['Late night', 'Early morning', 'Midnight', 'Noon only'],
        correctAnswer: 'Early morning',
      },
      {
        id: '8-2',
        question: 'Why search after storms?',
        image: rockImage,
        options: ['Less people', 'Cleaner beach', 'New stones revealed', 'Warmer weather'],
        correctAnswer: 'New stones revealed',
      },
      {
        id: '8-3',
        question: 'What helps stones stand out?',
        image: rockImage,
        options: ['Dry surface', 'Wet surface', 'Dust', 'Shade'],
        correctAnswer: 'Wet surface',
      },
      {
        id: '8-4',
        question: 'What affects stone visibility?',
        image: rockImage,
        options: ['Sound', 'Light', 'Temperature only', 'Wind only'],
        correctAnswer: 'Light',
      },
      {
        id: '8-5',
        question: 'Which condition often improves spotting details on stones?',
        image: rockImage,
        options: ['Good light', 'Loud wind', 'Heavy traffic', 'Dark clouds only'],
        correctAnswer: 'Good light',
      },
    ],
  },
  {
    id: 9,
    title: 'How to Build Your Stone Collection',
    questions: [
      {
        id: '9-1',
        question: 'How should you start collecting?',
        image: rockImage,
        options: ['Only rare stones', 'Any stones you like', 'Expensive stones', 'Big stones'],
        correctAnswer: 'Any stones you like',
      },
      {
        id: '9-2',
        question: 'How can you organize stones?',
        image: rockImage,
        options: ['Randomly', 'By color or type', 'By size only', 'By weight'],
        correctAnswer: 'By color or type',
      },
      {
        id: '9-3',
        question: 'Why take photos of stones?',
        image: rockImage,
        options: ['For fun', 'To sell', 'To document finds', 'To delete later'],
        correctAnswer: 'To document finds',
      },
      {
        id: '9-4',
        question: 'What helps improve a collection?',
        image: rockImage,
        options: ['Buying stones', 'Experience', 'Speed', 'Size'],
        correctAnswer: 'Experience',
      },
      {
        id: '9-5',
        question: 'What is useful when keeping a personal collection?',
        image: rockImage,
        options: ['Labels', 'Dust', 'Silence', 'Luck'],
        correctAnswer: 'Labels',
      },
    ],
  },
  {
    id: 10,
    title: 'Safety Tips While Searching for Stones',
    questions: [
      {
        id: '10-1',
        question: 'What should you watch when walking?',
        image: rockImage,
        options: ['Sky', 'Ground', 'Water only', 'Trees'],
        correctAnswer: 'Ground',
      },
      {
        id: '10-2',
        question: 'What surfaces can be dangerous?',
        image: rockImage,
        options: ['Dry sand', 'Wet rocks', 'Grass', 'Dirt'],
        correctAnswer: 'Wet rocks',
      },
      {
        id: '10-3',
        question: 'What footwear is recommended?',
        image: rockImage,
        options: ['Sandals', 'Shoes with grip', 'Barefoot', 'Slippers'],
        correctAnswer: 'Shoes with grip',
      },
      {
        id: '10-4',
        question: 'Why respect the environment?',
        image: rockImage,
        options: ['To avoid fines', 'To protect nature', 'To save time', 'To find more stones'],
        correctAnswer: 'To protect nature',
      },
      {
        id: '10-5',
        question: 'What is the safer way to move on slippery ground?',
        image: rockImage,
        options: ['Run fast', 'Walk carefully', 'Jump', 'Look away'],
        correctAnswer: 'Walk carefully',
      },
    ],
  },
];
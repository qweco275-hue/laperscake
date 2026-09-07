const classes = [
  {
    id: 1,
    name: 'Classic Cookies Masterclass',
    date: '2026-09-05',
    time: '10:00 - 12:00',
    mode: 'Online',
    category: 'Cookies',
    audience: 'All Ages',
    age: 'All',
    ageLabel: 'Semua usia',
    level: 'Beginner',
    price: 150000,
    quota: 12,
    remaining: 4,
    duration: '2 jam',
    rating: 4.9,
    reviews: 86,
    instructor: 'Chef Anasya',
    instructorRole: 'Pastry Chef',
    location: 'Online via Zoom',

    description:
      'Pelajari teknik dasar membuat cookies yang renyah di luar dan lembut di dalam bersama instructor profesional.',

    longDescription:
      'Kelas ini dirancang untuk siapa saja yang ingin memahami fundamental baking melalui cookies. Mulai dari mengenal bahan, teknik mixing, shaping, hingga baking dan dekorasi.',

    ingredients: [
      'Tepung terigu',
      'Butter',
      'Gula',
      'Telur',
      'Chocolate chips',
      'Vanilla extract',
    ],

    equipment: [
      'Oven',
      'Mixing bowl',
      'Whisk',
      'Spatula',
      'Baking tray',
      'Baking paper',
    ],

    curriculum: [
      'Mengenal bahan dan fungsi masing-masing',
      'Teknik mixing yang tepat',
      'Membentuk cookies',
      'Teknik baking',
      'Tips mendapatkan tekstur ideal',
      'Basic decoration',
    ],

    highlights: [
      'Recipe PDF',
      'Live Instructor',
      'Certificate',
      'Recording',
    ],
  },

  {
    id: 2,
    name: 'Cupcake Flower Decoration',
    date: '2026-09-06',
    time: '13:00 - 15:00',
    mode: 'Offline',
    category: 'Cake',
    audience: 'All Ages',
    age: 'All',
    ageLabel: 'Semua usia',
    level: 'Beginner',
    price: 200000,
    quota: 12,
    remaining: 7,
    duration: '2 jam',
    rating: 4.9,
    reviews: 102,
    instructor: 'Chef Rara',
    instructorRole: 'Cake Decorator',
    location: 'LaperCakes Studio, Yogyakarta',

    description:
      'Belajar membuat cupcake sekaligus menghiasnya menjadi beautiful flower cupcakes.',

    longDescription:
      'Pengalaman baking yang fun dan kreatif untuk mempelajari basic cupcake sekaligus teknik dekorasi menggunakan buttercream.',

    ingredients: [
      'Tepung terigu',
      'Butter',
      'Gula',
      'Telur',
      'Susu',
      'Buttercream',
    ],

    equipment: [
      'Oven',
      'Mixer',
      'Piping bag',
      'Piping nozzle',
      'Spatula',
      'Cupcake tray',
    ],

    curriculum: [
      'Basic cupcake',
      'Membuat buttercream',
      'Mengenal piping nozzle',
      'Teknik membuat bunga',
      'Color mixing',
      'Final decoration',
    ],

    highlights: [
      'Hands-on Class',
      'Ingredients Included',
      'Recipe PDF',
      'Certificate',
    ],
  },

  {
    id: 3,
    name: 'Sourdough Basic',
    date: '2026-09-12',
    time: '09:00 - 12:00',
    mode: 'Offline',
    category: 'Bread',
    audience: 'Adult',
    age: '18+',
    ageLabel: '18+ tahun',
    level: 'Intermediate',
    price: 250000,
    quota: 10,
    remaining: 3,
    duration: '3 jam',
    rating: 4.8,
    reviews: 74,
    instructor: 'Chef Bima',
    instructorRole: 'Artisan Baker',
    location: 'LaperCakes Studio, Yogyakarta',

    description:
      'Mulai perjalanan sourdough dari memahami starter hingga menghasilkan artisan bread.',

    longDescription:
      'Kelas intermediate untuk baker yang ingin memahami sourdough secara lebih serius. Peserta akan mempelajari starter, hydration, fermentation, shaping, hingga baking.',

    ingredients: [
      'Bread flour',
      'Whole wheat flour',
      'Sourdough starter',
      'Air',
      'Garam',
    ],

    equipment: [
      'Dutch oven',
      'Digital scale',
      'Mixing bowl',
      'Bench scraper',
      'Banneton',
      'Scoring blade',
    ],

    curriculum: [
      'Mengenal sourdough starter',
      'Hydration dan baker percentage',
      'Mixing & autolyse',
      'Bulk fermentation',
      'Shaping',
      'Scoring',
      'Final baking',
    ],

    highlights: [
      'Starter Included',
      'Hands-on Class',
      'Recipe Guide',
      'Certificate',
    ],
  },

  {
    id: 4,
    name: 'Pizza & Focaccia Workshop',
    date: '2026-09-13',
    time: '16:00 - 18:00',
    mode: 'Offline',
    category: 'Bread',
    audience: 'Family',
    age: 'All',
    ageLabel: 'Semua usia',
    level: 'Beginner',
    price: 225000,
    quota: 12,
    remaining: 5,
    duration: '2 jam',
    rating: 4.8,
    reviews: 65,
    instructor: 'Chef Dika',
    instructorRole: 'Bread Specialist',
    location: 'LaperCakes Studio, Yogyakarta',

    description:
      'Workshop santai membuat pizza dan focaccia dengan berbagai topping pilihan.',

    longDescription:
      'Workshop baking yang cocok untuk family, friends, maupun beginner yang ingin menikmati pengalaman membuat pizza dari nol.',

    ingredients: [
      'Tepung terigu',
      'Ragi',
      'Olive oil',
      'Tomato sauce',
      'Mozzarella',
      'Topping pilihan',
    ],

    equipment: [
      'Oven',
      'Mixing bowl',
      'Rolling pin',
      'Baking tray',
      'Kitchen scale',
    ],

    curriculum: [
      'Membuat pizza dough',
      'Teknik kneading',
      'Fermentation',
      'Membentuk pizza',
      'Membuat focaccia',
      'Baking & topping',
    ],

    highlights: [
      'Family Friendly',
      'Ingredients Included',
      'Hands-on Class',
      'Recipe PDF',
    ],
  },

  {
    id: 5,
    name: 'Macaron Masterclass',
    date: '2026-09-19',
    time: '10:00 - 14:00',
    mode: 'Online',
    category: 'Pastry',
    audience: 'Adult',
    age: '18+',
    ageLabel: '18+ tahun',
    level: 'Advanced',
    price: 350000,
    quota: 10,
    remaining: 2,
    duration: '4 jam',
    rating: 4.9,
    reviews: 128,
    instructor: 'Chef Anasya',
    instructorRole: 'Pastry Chef',
    location: 'Online via Zoom',

    description:
      'Masterclass macaron untuk memahami teknik yang lebih detail dan menghasilkan macaron dengan shell yang konsisten.',

    longDescription:
      'Kelas intensif untuk baker yang ingin meningkatkan kemampuan pastry. Fokus pada teknik macaronage, piping, baking, filling, dan troubleshooting.',

    ingredients: [
      'Almond flour',
      'Icing sugar',
      'Egg white',
      'Caster sugar',
      'Food coloring',
      'Chocolate ganache',
    ],

    equipment: [
      'Oven',
      'Stand mixer',
      'Digital scale',
      'Piping bag',
      'Silicone mat',
      'Kitchen thermometer',
    ],

    curriculum: [
      'Mengenal bahan macaron',
      'French meringue',
      'Macaronage technique',
      'Piping',
      'Baking temperature',
      'Shell troubleshooting',
      'Making filling',
      'Assembly',
    ],

    highlights: [
      'Live Masterclass',
      'Advanced Techniques',
      'Recipe Book',
      'Recording',
      'Certificate',
    ],
  },

  {
    id: 6,
    name: 'Cake Decoration Intensive',
    date: '2026-09-20',
    time: '13:00 - 17:00',
    mode: 'Offline',
    category: 'Cake',
    audience: 'Adult',
    age: '18+',
    ageLabel: '18+ tahun',
    level: 'Advanced',
    price: 400000,
    quota: 8,
    remaining: 2,
    duration: '4 jam',
    rating: 4.9,
    reviews: 91,
    instructor: 'Chef Rara',
    instructorRole: 'Cake Decorator',
    location: 'LaperCakes Studio, Yogyakarta',

    description:
      'Pelajari teknik dekorasi cake modern mulai dari basic finishing hingga detail profesional.',

    longDescription:
      'Kelas intensif untuk baker yang ingin meningkatkan kemampuan cake decoration dan membangun portfolio baking.',

    ingredients: [
      'Sponge cake',
      'Buttercream',
      'Whipping cream',
      'Fondant',
      'Chocolate',
      'Fresh fruit',
    ],

    equipment: [
      'Turntable',
      'Cake scraper',
      'Palette knife',
      'Piping bag',
      'Piping nozzle',
      'Cake board',
    ],

    curriculum: [
      'Cake leveling',
      'Crumb coating',
      'Smooth finishing',
      'Buttercream piping',
      'Modern decoration',
      'Color composition',
      'Final presentation',
    ],

    highlights: [
      'Hands-on Class',
      'Professional Tools',
      'Recipe Guide',
      'Certificate',
      'Portfolio Result',
    ],
  },
]

export default classes
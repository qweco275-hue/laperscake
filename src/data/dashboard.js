const defaultDashboard = {
  user: {
    name: 'Pandu',
    email: 'hello@example.com',
    membership: 'Baker Member',
    points: 1280,
  },

  bookings: [],

  completedClasses: [
    {
      id: 'completed-1',
      className: 'Basic Baking Fundamentals',
      date: '2026-08-16',
      instructor: 'Chef Anasya',
      certificate: true,
    },
  ],

  recipes: [
    {
      id: 1,
      title: 'Panduan Umum Baking untuk Pemula',
      type: 'Free Guide',
      emoji: '📖',
    },
  ],

  certificates: [
    {
      id: 'CERT-001',
      title: 'Basic Baking Fundamentals',
      instructor: 'Chef Anasya',
      date: '2026-08-16',
    },
  ],
}

export default defaultDashboard
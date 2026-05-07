import { sparkPhotos, promisePhotos, unionPhotos, celebrationPhotos, taylorPhotos, halliePhotos } from './galleryData'

// Card images: face-aware crop so heads are never cut off
const CDN = 'https://res.cloudinary.com/dikkdclum/image/upload/f_auto,q_auto,e_improve:50,e_vibrance:20,e_sharpen:50,c_fill,g_faces,z_0.8,w_800,h_600'
// Feature image: widescreen for full-bleed Maldives section
const CDN_WIDE = 'https://res.cloudinary.com/dikkdclum/image/upload/f_auto,q_auto,c_fill,g_auto,w_1920,h_1080'

export const milestones = [
  {
    id: 1,
    date: 'Oct 12 & 31, 2016',
    title: 'The Spark',
    subtitle: 'Our First Date & The Claddagh Ring',
    description:
      "A first date at Bien Trucha. Then on Halloween night at White Chocolate Grill, you were already wearing your claddagh ring — and I turned it around to show the world you were taken. The night our story officially started.",
    photos: [
      `${CDN}/20161229_140548_ijalup`,
      `${CDN}/20171029_182842_rkh4la`,
      `${CDN}/20180610_132316_yyyrxq`,
      `${CDN}/20170805_172342_rqr73j`,
      `${CDN}/20190526_173922_mfxhs5`,
      ...sparkPhotos,
    ],
    mediaUrl: null,
    mediaType: 'image',
    gradient: ['#FDE68A', '#FCA5A5', '#FEF3C7'],
    icon: '🎃',
    isFuture: false,
    isFeature: false,
  },
  {
    id: 2,
    date: 'Feb 15, 2020',
    title: 'The Promise',
    subtitle: 'Diamond Lake — Where I Asked',
    description:
      'Our first ski trip together at Diamond Lake. At the end of the night, at the top of the hill under a beautiful winter sky, I got down on one knee. The next night — a private wine cellar at Corndance Tavern, just the two of us, celebrating forever.',
    photos: promisePhotos,
    mediaUrl: null,
    mediaType: 'image',
    gradient: ['#BAE6FD', '#7DD3FC', '#EFF6FF'],
    icon: '💍',
    isFuture: false,
    isFeature: false,
  },
  {
    id: 3,
    date: 'Dec 12, 2020',
    title: 'The Union',
    subtitle: 'Our Intimate COVID Wedding',
    description:
      'Small, perfect, and entirely us — surrounded only by the people who mattered most, at The Harrington. Intimate, intentional, and exactly what it was always meant to be.',
    photos: [
      ...unionPhotos,
    ],
    mediaUrl: null,
    mediaType: 'image',
    gradient: ['#FCE7F3', '#FDF2F8', '#FFF5F7'],
    icon: '💒',
    isFuture: false,
    isFeature: false,
  },
  {
    id: 4,
    date: 'Jul 19, 2021',
    title: 'The Escape',
    subtitle: 'Hurawalhi Island, Maldives',
    description:
      'The Ocean Villa. Dinner in an underwater restaurant in the Indian Ocean. A dream we had barely dared say out loud — and then we were living it, completely worlds away together.',
    mediaUrl: `${CDN_WIDE}/IMG_0667_fo17j9`,
    mediaType: 'image',
    gradient: ['#67E8F9', '#22D3EE', '#06B6D4'],
    icon: '🏝️',
    isFuture: false,
    isFeature: true,
  },
  {
    id: 5,
    date: 'Dec 11, 2021',
    title: 'The Celebration',
    subtitle: 'Our 1-Year Wedding Renewal',
    description:
      'One year married — and we finally got to say "I do" with everyone we love surrounding us. Worth every bit of the wait.',
    photos: [
      ...celebrationPhotos,
    ],
    mediaUrl: null,
    mediaType: 'image',
    gradient: ['#DDD6FE', '#E9D5FF', '#F5F3FF'],
    icon: '💑',
    isFuture: false,
    isFeature: false,
  },
  {
    id: 6,
    date: 'Sept 12, 2022',
    title: 'The First Addition',
    subtitle: 'Taylor is Born',
    description:
      'Taylor arrived and rewrote our world. Watching you become a mom was the most quietly extraordinary transformation — gentle, fearless, and overflowing with love.',
    photos: [
      `${CDN}/IMG_2960_vrytzl`,
      ...taylorPhotos,
    ],
    mediaUrl: null,
    mediaType: 'image',
    gradient: ['#FECDD3', '#FDA4AF', '#FFF1F2'],
    icon: '👶',
    isFuture: false,
    isFeature: false,
  },
  {
    id: 7,
    date: 'Aug 1, 2024',
    title: 'The Duo',
    subtitle: 'Hallie is Born',
    description:
      "And then there were four. Hallie brought her own brand of light into our home. Seeing the girls together — intelligent, joyful, kind — that's all you.",
    photos: [
      `${CDN}/IMG_0488_nrrgci`,
      ...halliePhotos,
    ],
    mediaUrl: null,
    mediaType: 'image',
    gradient: ['#A7F3D0', '#6EE7B7', '#ECFDF5'],
    icon: '🌸',
    isFuture: false,
    isFeature: false,
  },
  {
    id: 8,
    date: 'Oct 16, 2026',
    title: 'The Grand Adventure',
    subtitle: 'Our Family of Five',
    description:
      "Our next chapter is almost here. We can't wait to see you be an amazing mom to three. The best is still being written.",
    mediaUrl: null,
    mediaType: 'image',
    gradient: ['#BAE6FD', '#93C5FD', '#EFF6FF'],
    icon: '⭐',
    isFuture: true,
    isFeature: false,
  },
]

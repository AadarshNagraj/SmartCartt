
export const featuredCategories = [
  {
    id: '1',
    title: 'Audio',
    image: '/images/hero_headphones_1782501737558.png', // Re-using for audio category
    link: '/categories/audio'
  },
  {
    id: '2',
    title: 'Wearables',
    image: '/images/prod_watch_1782501766597.png',
    link: '/categories/wearables'
  },
  {
    id: '3',
    title: 'Accessories',
    image: '/images/prod_earbuds_1782501752049.png',
    link: '/categories/accessories'
  },
  {
    id: '4',
    title: 'Workstation',
    image: '/images/prod_keyboard_1782501778735.png',
    link: '/categories/workstation'
  }
];



export const testimonials = [
  {
    id: 't1',
    name: 'Sarah J.',
    role: 'Verified Buyer',
    text: 'The quality of the audio gear is unmatched. Fast shipping and premium packaging made the whole experience fantastic.',
    rating: 5
  },
  {
    id: 't2',
    name: 'Michael T.',
    role: 'Verified Buyer',
    text: 'Absolutely in love with my new smartwatch. The minimal design is exactly what I was looking for, and it works flawlessly.',
    rating: 5
  },
  {
    id: 't3',
    name: 'Elena R.',
    role: 'Verified Buyer',
    text: 'Great customer service and premium products. The keyboard completely transformed my desk setup.',
    rating: 5
  }
];



export type FilterOption = {
  id: string;
  label: string;
  count?: number;
};

export type FilterGroup = {
  id: string;
  label: string;
  type: 'checkbox' | 'radio' | 'range' | 'color';
  options: FilterOption[];
};

export const collectionFilters: FilterGroup[] = [
  {
    id: 'category',
    label: 'Category',
    type: 'checkbox',
    options: [
      { id: 'audio', label: 'Audio', count: 12 },
      { id: 'wearables', label: 'Wearables', count: 8 },
      { id: 'accessories', label: 'Accessories', count: 4 },
    ]
  },
  {
    id: 'brand',
    label: 'Brand',
    type: 'checkbox',
    options: [
      { id: 'sony', label: 'Sony', count: 6 },
      { id: 'apple', label: 'Apple', count: 10 },
      { id: 'bose', label: 'Bose', count: 4 },
      { id: 'logitech', label: 'Logitech', count: 4 },
    ]
  },
  {
    id: 'price',
    label: 'Price',
    type: 'radio',
    options: [
      { id: 'under-50', label: 'Under $50' },
      { id: '50-100', label: '$50 - $100' },
      { id: '100-200', label: '$100 - $200' },
      { id: 'over-200', label: 'Over $200' },
    ]
  },
  {
    id: 'availability',
    label: 'Availability',
    type: 'checkbox',
    options: [
      { id: 'in-stock', label: 'In Stock', count: 20 },
      { id: 'out-of-stock', label: 'Out of Stock', count: 4 },
    ]
  }
];

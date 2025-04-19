export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FilterState {
  categories: string[];
  priceRange: {
    min: number;
    max: number | null;
  };
  rating: number | null;
  search: string;
}

export interface SortOption {
  id: string;
  name: string;
  direction: 'asc' | 'desc';
  field: keyof Product | null;
}

export type ViewMode = 'grid' | 'list';
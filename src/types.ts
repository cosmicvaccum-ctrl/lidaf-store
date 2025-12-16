export interface Product {
  id: string;
  name: string;
  category: 'maillot' | 'short' | 'tshirt';
  price: number;
  image: string;
  team?: string;
  sizes: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

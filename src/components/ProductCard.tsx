import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(product, selectedSize);
    setTimeout(() => setIsAdding(false), 600);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR') + ' FCFA';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {product.team && (
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
            {product.team}
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Taille:
          </label>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedSize === size
                    ? 'bg-gray-900 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
            isAdding
              ? 'bg-green-500 text-white scale-95'
              : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg'
          }`}
        >
          <ShoppingCart size={20} />
          <span>{isAdding ? 'Ajouté !' : 'Ajouter au panier'}</span>
        </button>
      </div>
    </div>
  );
}

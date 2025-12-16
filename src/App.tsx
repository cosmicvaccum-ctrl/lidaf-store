import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import { products } from './data/products';
import { CartItem, Product } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const savedCart = localStorage.getItem('lidafCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lidafCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: Product, size: string) => {
    const existingItemIndex = cartItems.findIndex(
      item => item.product.id === product.id && item.selectedSize === size
    );

    if (existingItemIndex >= 0) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { product, quantity: 1, selectedSize: size }]);
    }
  };

  const handleUpdateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId, size);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.product.id === productId && item.selectedSize === size
        ? { ...item, quantity }
        : item
    );
    setCartItems(updatedCart);
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCartItems(cartItems.filter(
      item => !(item.product.id === productId && item.selectedSize === size)
    ));
  };

  const handleCheckout = () => {
    let message = "🛍️ *Nouvelle commande Lidaf Store*\n\n";

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}\n`;
      message += `   - Taille: ${item.selectedSize}\n`;
      message += `   - Quantité: ${item.quantity}\n`;
      message += `   - Prix unitaire: ${item.product.price.toLocaleString('fr-FR')} FCFA\n`;
      message += `   - Sous-total: ${(item.product.price * item.quantity).toLocaleString('fr-FR')} FCFA\n\n`;
    });

    const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    message += `💰 *TOTAL: ${total.toLocaleString('fr-FR')} FCFA*\n\n`;
    message += "📋 *Instructions de paiement:*\n";
    message += "1️⃣ Effectuez le transfert du montant total\n";
    message += "2️⃣ Envoyez la capture d'écran du transfert\n";
    message += "3️⃣ Indiquez votre adresse de livraison complète\n\n";
    message += "✈️ Livraison disponible partout dans le monde\n";
    message += "📦 Votre commande sera traitée dès réception du paiement";

    const whatsappNumber = "22898347005";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.team?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemsCount={totalCartItems}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      <Hero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {selectedCategory === 'all' ? 'Nos Produits' :
             selectedCategory === 'maillot' ? 'Maillots' :
             selectedCategory === 'short' ? 'Shorts' : 'T-Shirts'}
          </h2>
          <p className="text-gray-600">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">Aucun produit trouvé</p>
            <p className="text-gray-400 mt-2">Essayez une autre recherche ou catégorie</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Lidaf Store</h3>
              <p className="text-gray-400">
                Votre boutique de référence pour les maillots de football authentiques et vêtements de sport
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Livraison</h4>
              <p className="text-gray-400">
                Nous livrons partout dans le monde avec un service rapide et sécurisé
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Paiement</h4>
              <p className="text-gray-400">
                Paiement sécurisé par transfert mobile. Commandez via WhatsApp pour un service personnalisé
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Lidaf Store. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

import { Globe, Truck } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Bienvenue chez <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">Lidaf Store</span>
        </h2>
        <p className="text-xl sm:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
          Votre destination premium pour les maillots de football authentiques et les vêtements de sport de qualité
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mt-12">
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-full">
            <Globe className="text-green-400" size={28} />
            <span className="text-lg font-semibold">Livraison Mondiale</span>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-full">
            <Truck className="text-blue-400" size={28} />
            <span className="text-lg font-semibold">Expédition Rapide</span>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold mb-2">100+</div>
            <div className="text-sm sm:text-base text-gray-400">Produits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold mb-2">50+</div>
            <div className="text-sm sm:text-base text-gray-400">Clubs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold mb-2">195</div>
            <div className="text-sm sm:text-base text-gray-400">Pays</div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import useProducts from '../hooks/useProducts';
import SearchBar from '../components/molecules/SearchBar';
import FilterGroup from '../components/molecules/FilterGroup';
import ProductGrid from '../components/organisms/ProductGrid';

/**
 * Page: Productos (Catálogo Principal)
 * Listado reactivo de productos con buscador en tiempo real,
 * filtrado dinámico por categoría, rango de precio y lista de favoritos.
 */
export const Productos = () => {
  const { products, categories, isWishlisted } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [showOnlyWishlist, setShowOnlyWishlist] = useState(false);

  // Calcular precio máximo del catálogo
  const maxProductPrice = useMemo(() => {
    if (products.length === 0) return 100000;
    return Math.max(...products.map((p) => Number(p.precio) || 0));
  }, [products]);

  const [currentMaxPrice, setCurrentMaxPrice] = useState(100000);

  // Filtrado reactivo combinado
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // 1. Filtro por texto en nombre o descripción
      const matchesSearch =
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descripcion.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Filtro por categoría
      const matchesCategory =
        selectedCategory === 'Todas' || item.categoria === selectedCategory;

      // 3. Filtro por precio máximo
      const matchesPrice = item.precio <= currentMaxPrice;

      // 4. Filtro por favoritos
      const matchesWishlist = !showOnlyWishlist || isWishlisted(item.id);

      return matchesSearch && matchesCategory && matchesPrice && matchesWishlist;
    });
  }, [products, searchTerm, selectedCategory, currentMaxPrice, showOnlyWishlist, isWishlisted]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Todas');
    setCurrentMaxPrice(maxProductPrice);
    setShowOnlyWishlist(false);
  };

  return (
    <div className="page-productos">
      <section className="seccion">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <h2>Nuestros Productos</h2>
            <p style={{ margin: 0, color: 'var(--texto-mutado)' }}>
              Explora nuestro catálogo de ferretería con la más alta calidad y disponibilidad inmediata.
            </p>
          </div>

          {/* Buscador reactivo */}
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar por nombre, herramienta o marca..."
          />
        </div>

        {/* Grupo de Filtros Dinámicos */}
        <FilterGroup
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          maxPrice={maxProductPrice}
          currentMaxPrice={currentMaxPrice}
          onMaxPriceChange={setCurrentMaxPrice}
          showOnlyWishlist={showOnlyWishlist}
          onToggleWishlistFilter={() => setShowOnlyWishlist((prev) => !prev)}
          onResetFilters={handleResetFilters}
        />

        {/* Resumen de Resultados */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', fontSize: '0.9rem', color: 'var(--texto-mutado)' }}>
          <span>
            Mostrando <strong>{filteredProducts.length}</strong> de <strong>{products.length}</strong> productos
          </span>
          {(searchTerm || selectedCategory !== 'Todas' || showOnlyWishlist) && (
            <span style={{ color: 'var(--naranja-rojo)', fontWeight: '500' }}>
              Filtro activo
            </span>
          )}
        </div>

        {/* Grilla de Productos */}
        <ProductGrid
          products={filteredProducts}
          emptyMessage="No hay productos que coincidan con los criterios de búsqueda o filtros seleccionados."
        />
      </section>
    </div>
  );
};

export default Productos;

import React, { useState, useMemo } from 'react';
import useProducts from '../hooks/useProducts';
import SearchBar from '../components/molecules/SearchBar';
import FilterGroup from '../components/molecules/FilterGroup';
import MaterialCalculator from '../components/molecules/MaterialCalculator';
import ProductGrid from '../components/organisms/ProductGrid';

/**
 * Page: Productos (Catálogo Principal)
 * Listado reactivo de productos con buscador en tiempo real,
 * calculadora de materiales de construcción (m²),
 * filtrado dinámico por categoría, marca, stock disponible, precio y favoritos.
 */
export const Productos = () => {
  const { products, categories, brands, isWishlisted } = useProducts();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedBrand, setSelectedBrand] = useState('Todas');
  const [onlyInStock, setOnlyInStock] = useState(false);
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

      // 3. Filtro por marca
      const matchesBrand =
        selectedBrand === 'Todas' || item.marca === selectedBrand;

      // 4. Filtro por disponibilidad en stock
      const matchesStock = !onlyInStock || Number(item.stock) > 0;

      // 5. Filtro por precio máximo
      const matchesPrice = item.precio <= currentMaxPrice;

      // 6. Filtro por favoritos
      const matchesWishlist = !showOnlyWishlist || isWishlisted(item.id);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesStock &&
        matchesPrice &&
        matchesWishlist
      );
    });
  }, [
    products,
    searchTerm,
    selectedCategory,
    selectedBrand,
    onlyInStock,
    currentMaxPrice,
    showOnlyWishlist,
    isWishlisted,
  ]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Todas');
    setSelectedBrand('Todas');
    setOnlyInStock(false);
    setCurrentMaxPrice(maxProductPrice);
    setShowOnlyWishlist(false);
  };

  const hasActiveFilters =
    searchTerm ||
    selectedCategory !== 'Todas' ||
    selectedBrand !== 'Todas' ||
    onlyInStock ||
    showOnlyWishlist;

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

        {/* Calculadora básica de materiales de construcción (m²) */}
        <MaterialCalculator />

        {/* Grupo de Filtros Dinámicos */}
        <FilterGroup
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          brands={brands}
          selectedBrand={selectedBrand}
          onSelectBrand={setSelectedBrand}
          onlyInStock={onlyInStock}
          onToggleOnlyInStock={() => setOnlyInStock((prev) => !prev)}
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
          {hasActiveFilters && (
            <span style={{ color: 'var(--naranja-rojo)', fontWeight: '600' }}>
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

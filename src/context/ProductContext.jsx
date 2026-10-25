import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext(null);

const STORAGE_KEY = 'ferreteria_products_catalog';
const WISHLIST_KEY = 'ferreteria_wishlist';
export const DEFAULT_PRODUCT_IMAGE = '/images/LOGO-removebg-preview.png';

const INITIAL_PRODUCTS = [
  {
    id: '1',
    nombre: 'Martillo Rojo',
    marca: 'Stanley',
    descripcion: 'Martillo de acero forjado con mango ergonómico. Ideal para trabajos de carpintería y construcción general.',
    categoria: 'Herramientas Manuales',
    precio: 5000,
    stock: 15,
    unidadMedida: 'Unidad',
    imagen: '/images/martillo.jpg',
    fichaTecnica: {
      peso: '500g',
      material: 'Acero forjado con mango engomado',
      origen: 'Chile',
      garantia: '12 meses',
    },
    destacado: true,
  },
  {
    id: '2',
    nombre: 'Taladro Percutor 500W',
    marca: 'Bosch',
    descripcion: 'Taladro percutor de velocidad variable y reversa. Mandril de 13mm para perforaciones en concreto, madera y metal.',
    categoria: 'Herramientas Eléctricas',
    precio: 35000,
    stock: 8,
    unidadMedida: 'Unidad',
    imagen: '/images/taladro.jpg',
    fichaTecnica: {
      potencia: '500W',
      velocidad: '0 - 3000 RPM',
      mandril: '13mm (1/2")',
      garantia: '24 meses',
    },
    destacado: true,
  },
  {
    id: '3',
    nombre: 'Serrucho Carpintero 20"',
    marca: 'Bahco',
    descripcion: 'Serrucho tradicional de 20 pulgadas con dientes templados por inducción para cortes rápidos y precisos.',
    categoria: 'Herramientas Manuales',
    precio: 8500,
    stock: 12,
    unidadMedida: 'Unidad',
    imagen: '/images/sierra.jpg',
    fichaTecnica: {
      largo: '20 pulgadas (500mm)',
      dientes: '7 Dientes por pulgada',
      material: 'Acero templado',
      garantia: '12 meses',
    },
    destacado: true,
  },
  {
    id: '4',
    nombre: 'Destornillador Phillips',
    marca: 'Truper',
    descripcion: 'Destornillador de punta en cruz magnética con mango bimaterial de alto torque y agarre cómodo.',
    categoria: 'Herramientas Manuales',
    precio: 3200,
    stock: 4, // Demuestra estado 'Últimas unidades' (< 5)
    unidadMedida: 'Unidad',
    imagen: '/images/destornillador.jpg',
    fichaTecnica: {
      medida: '#2 x 100mm',
      punta: 'Magnética imantada',
      mango: 'Ergonómico antideslizante',
      garantia: '6 meses',
    },
    destacado: false,
  },
  {
    id: '5',
    nombre: 'Tornillo Madera 1 1/2" (Caja x 100)',
    marca: 'Mamut',
    descripcion: 'Tornillos autorroscantes cincados para fijación en madera, aglomerados y tabiquería.',
    categoria: 'Fijaciones',
    precio: 4990,
    stock: 50,
    unidadMedida: 'Caja',
    imagen: '/images/tornillo.jpg',
    fichaTecnica: {
      medida: '6 x 1 1/2"',
      acabado: 'Cincado brillante',
      cantidad: '100 unidades por caja',
      garantia: '3 meses',
    },
    destacado: false,
  },
  {
    id: '6',
    nombre: 'Cemento Especial Alta Resistencia',
    marca: 'Polpaico',
    descripcion: 'Saco de cemento Portland para estructuras de hormigón armado, estucos y pegado de bloques.',
    categoria: 'Construcción',
    precio: 6800,
    stock: 30,
    unidadMedida: 'Kilo',
    imagen: '/images/LOGO.png',
    fichaTecnica: {
      peso: '25 Kg',
      tipo: 'Especial Grado Estructural',
      norma: 'NCh 148',
      garantia: '3 meses',
    },
    destacado: false,
  },
  {
    id: '7',
    nombre: 'Broca Concreto SDS Plus 8mm',
    marca: 'Bosch',
    descripcion: 'Broca de carburo de tungsteno para hormigón y mampostería pesada. Encaje SDS Plus.',
    categoria: 'Herramientas Eléctricas',
    precio: 4500,
    stock: 0, // Demuestra estado 'Agotado' con botón deshabilitado
    unidadMedida: 'Unidad',
    imagen: '/images/LOGO-removebg-preview.png',
    fichaTecnica: {
      medida: '8 x 160mm',
      punta: 'Carburo reforzado 4 filos',
      origen: 'Alemania',
      garantia: '6 meses',
    },
    destacado: false,
  },
];

export const ProductProvider = ({ children }) => {
  // Estado en memoria para catálogo de productos
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch (e) {
      console.error('Error al cargar productos:', e);
      return INITIAL_PRODUCTS;
    }
  });

  // Estado para Lista de Deseos (Wishlist)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error al cargar wishlist:', e);
      return [];
    }
  });

  // Persistir cambios en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Error al guardar productos:', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error al guardar wishlist:', e);
    }
  }, [wishlist]);

  /**
   * Crear nuevo producto en memoria.
   * Si no se carga imagen, asigna la imagen genérica por defecto de la ferretería.
   */
  const addProduct = (productData) => {
    const newProduct = {
      id: 'prod-' + Date.now(),
      nombre: productData.nombre.trim(),
      marca: productData.marca?.trim() || 'Los Maestros',
      descripcion: productData.descripcion?.trim() || 'Sin descripción adicional.',
      categoria: productData.categoria || 'Herramientas Manuales',
      precio: Math.max(0, Number(productData.precio) || 0),
      stock: Math.max(0, parseInt(productData.stock, 10) || 0),
      unidadMedida: productData.unidadMedida || 'Unidad',
      imagen: productData.imagen?.trim() ? productData.imagen.trim() : DEFAULT_PRODUCT_IMAGE,
      fichaTecnica: productData.fichaTecnica || {
        origen: 'Chile',
        garantia: '6 meses',
      },
      destacado: Boolean(productData.destacado),
    };

    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  /**
   * Eliminar producto del catálogo en memoria
   */
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  /**
   * Obtener producto por ID
   */
  const getProductById = (id) => {
    return products.find((p) => String(p.id) === String(id));
  };

  /**
   * Alternar ítem en la lista de deseos
   */
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  // Lista de categorías y marcas únicas disponibles
  const categories = Array.from(new Set(products.map((p) => p.categoria)));
  const brands = Array.from(new Set(products.map((p) => p.marca).filter(Boolean)));

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        getProductById,
        wishlist,
        toggleWishlist,
        isWishlisted,
        categories,
        brands,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

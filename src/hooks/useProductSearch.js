import { useState, useEffect } from 'react';

const useProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadFlag, setReloadFlag] = useState(0); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://api.daaif.net/products?delay=1000');
        if (!response.ok) throw new Error('Erreur réseau');
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [reloadFlag]); 

  const reload = () => setReloadFlag(f => f + 1); 
  return { 
    products, 
    loading, 
    error,
    reload, 
  };
};

export default useProductSearch;
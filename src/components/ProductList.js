import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../App';
import useProductSearch from '../hooks/useProductSearch';
import useDebounce from '../hooks/useDebounce';

const PRODUCTS_PER_PAGE = 6;

const ProductList = ({ searchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  
  const { 
    products, 
    loading, 
    error,
    reload // Fonction de rechargement
  } = useProductSearch();
  
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrage selon la recherche (insensible à la casse)
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIdx, startIdx + PRODUCTS_PER_PAGE);

  // Réinitialiser la page si la recherche change ou si la liste change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, products]);

  if (loading) return (
    <div className="text-center my-4">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Chargement...</span>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="alert alert-danger" role="alert">
      Erreur: {error}
    </div>
  );
  
  return (
    <div>
      <button
        onClick={() => {
          if (typeof reload === 'function') {
            reload();
            setCurrentPage(1);
          }
        }}
        className="btn btn-secondary my-3"
      >
        Recharger
      </button>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {paginatedProducts.map(product => (
          <div key={product.id} className="col">
            <div className={`card h-100 ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
              {product.thumbnail && (
                <img 
                  src={product.thumbnail} 
                  className="card-img-top" 
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>Prix: </strong>
                  {product.price}€
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pagination my-4">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="btn btn-primary"
        >
          Précédent
        </button>
        <span className="mx-2">
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="btn btn-primary"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default ProductList;
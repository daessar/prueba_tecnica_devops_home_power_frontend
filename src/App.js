import React, { useState, useEffect } from 'react';
import ClientTable from './components/ClientTable';
import { getClients } from './api';

const App = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const data = await getClients();
        setClients(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los clientes. Por favor, inténtelo de nuevo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="container">
      <header className="app-header text-center">
        <h1>Home Power - Listado de Clientes</h1>
        <p>Api Gateway + Lambda + Nest.js</p>
      </header>

      {error && (
        <div className="error text-center p-3">
          <p>{error}</p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </button>
        </div>
      )}

      {loading ? (
        <div className="loading">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <>
          {clients.length > 0 ? (
            <ClientTable clients={clients} />
          ) : (
            <div className="alert alert-info text-center">
              No se encontraron clientes.
            </div>
          )}
        </>
      )}

      <footer className="mt-4 text-center text-muted">
        <p>Prueba Técnica DevOps - Home Power {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default App;

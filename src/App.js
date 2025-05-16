import React, { useState, useEffect } from 'react';
import ClientTable from './components/ClientTable';
import { getClients } from './api';

const App = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiInfo, setApiInfo] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // Mostrar información de API_URL para depuración
        const apiUrl = process.env.API_URL;
        setApiInfo(`Conectando a API: ${apiUrl || 'API_URL no definida'}`);
        console.log('API URL:', apiUrl);

        setLoading(true);
        const data = await getClients();

        if (!data || !Array.isArray(data)) {
          console.error('La respuesta de la API no es un array:', data);
          setError('Error: La respuesta del servidor no tiene el formato esperado.');
          setClients([]);
          return;
        }

        setClients(data);
        setError(null);
      } catch (err) {
        setError(`Error al cargar los clientes: ${err.message || 'Error desconocido'}`);
        console.error('Detalles del error:', err);
        setClients([]);
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
        {apiInfo && <small className="text-muted">{apiInfo}</small>}
      </header>

      {error && (
        <div className="alert alert-danger text-center p-3">
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
        <div className="loading text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Conectando al servidor...</p>
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

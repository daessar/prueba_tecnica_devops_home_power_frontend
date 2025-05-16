import React from 'react';

const ClientTable = ({ clients }) => {
  // Verificar si clients es un array para evitar errores
  const clientsArray = Array.isArray(clients) ? clients : [];

  return (
    <div className="client-table p-4">
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {clientsArray.map(client => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;

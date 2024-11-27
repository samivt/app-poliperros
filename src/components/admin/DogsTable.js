import React from "react";

const DogTable = ({ dogs, onSelectDog }) => {
  return (
    <table className="dog-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {dogs.map((dog) => (
          <tr key={dog.id}>
            <td>{dog.name}</td>
            <td>
              <button onClick={() => onSelectDog(dog)}>Seleccionar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DogTable;

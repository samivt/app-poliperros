import React from "react";
import Navbar from "../../components/main/Navbar";
import Footer from "../../components/main/Footer";
import { Table } from "react-bootstrap";
import "../../assets/styles/main/Inscription.css";

const Inscription = () => {
  return (
    <div>
      <Navbar />
      <section className="inscription-section">
        <h2 className="title">Curso de Adiestramiento Canino</h2>
        <p className="description">
          El curso de “Adiestramiento Básico y Educación Canina” es una
          oportunidad para que los dueños de perros adquieran los conocimientos
          y habilidades necesarias para criar y educar a sus mascotas de manera
          responsable. El objetivo principal de este curso es formar perros
          seguros, equilibrados y obedientes, al tiempo que fortalece el vínculo
          entre el dueño y el perro.
        </p>
        <button className="inscription-button">Inscribirse</button>
        <h3 className="cost-title">Costo: $96</h3>
        <p className="date">Fecha de inicio: 9 noviembre, 2024</p>
        <p className="date">Fecha de finalización: 14 diciembre, 2024</p>

        <h2 className="title">Horarios</h2>
        <div className="table-responsive">
          <Table striped bordered hover className="schedule-table">
            <thead>
              <tr>
                <th>Día</th>
                <th>Horario</th>
                <th>Tipo de raza</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sábado</td>
                <td>8:30 - 10:30</td>
                <td>Razas pequeñas</td>
              </tr>
              <tr>
                <td>Sábado</td>
                <td>11:00 - 13:00</td>
                <td>Razas grandes</td>
              </tr>
              <tr>
                <td>Domingo</td>
                <td>8:30 - 10:30</td>
                <td>Razas pequeñas</td>
              </tr>
              <tr>
                <td>Domingo</td>
                <td>11:00 - 13:00</td>
                <td>Razas grandes</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Inscription;

import React from "react";
import Navbar from "../../components/main/Navbar";
import Footer from "../../components/main/Footer";
import { Container, Row, Col } from "react-bootstrap";
import InfoCard from "../../components/main/InfoCard";

import "../../assets/styles/main/QuienesSomos.css";

const QuienesSomos = () => {
  return (
    <div>
      <Navbar />
      <Container className="my-5">
        <h2 className="text-center text-info-qs">Quienes Somos</h2>
        <br></br>
        <p className="text-center">
          Somos el Club de Bienestar Animal Poli Perros de la Escuela
          Politécnica Nacional, un grupo de estudiantes comprometidos con la
          protección y bienestar de los animales. Nos dedicamos a mejorar las
          condiciones de vida de los perros en situación de calle o
          vulnerabilidad dentro y fuera del campus. A través de proyectos de
          adopción, voluntariado, y educación, trabajamos para generar una
          comunidad más empática y responsable con nuestros amigos de cuatro
          patas.
        </p>
        <br></br>
        <h2 className="text-center text-info-qs">Nuestra Cultura</h2>

        <Row className="justify-content-center">
          <Col md={5} className="mb-4 ms-3">
            <InfoCard
              title="Misión"
              description="Promover el bienestar animal en la Escuela Politécnica Nacional y la comunidad aledaña mediante la adopción 
            responsable, la protección de los perros en situación de vulnerabilidad, y la sensibilización sobre el respeto y el cuidado
             animal. Nos enfocamos en generar un impacto positivo a través de acciones que fomenten la empatía y la responsabilidad 
             hacia los animales."
              icon="mision"
            />
          </Col>
          <Col md={5} className="mb-4 m3-3">
            <InfoCard
              title="Visión"
              description="Ser reconocidos como un referente en bienestar animal a nivel universitario, creando un entorno 
            donde los derechos de los animales sean respetados y donde cada perro vulnerable encuentre un hogar seguro y amoroso. 
            Aspiramos a construir una cultura universitaria de respeto, responsabilidad y cuidado hacia los animales, promoviendo 
            la adopción y la tenencia responsable."
              icon="vision"
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
export default QuienesSomos;

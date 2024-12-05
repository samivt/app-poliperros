import React from "react";

const Welcome = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center",
      backgroundColor: "#f9f9f9",
      padding: "20px",
    },
    heading: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#f38b32",
      marginBottom: "10px",
    },
    paragraph: {
      fontSize: "1.2rem",
      color: "#555",
      marginBottom: "20px",
    },
    image: {
      maxWidth: "300px",
      marginBottom: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <img
        src={require("../../assets/images/logo_poliperros.png")}
        alt="PoliPerros Logo"
      />
      <h1 style={styles.heading}>¡Bienvenido!</h1>
      <p style={styles.paragraph}>
        Selecciona una opción del menú para comenzar.
      </p>
    </div>
  );
};

export default Welcome;

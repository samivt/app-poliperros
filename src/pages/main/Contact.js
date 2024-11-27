import React, { useEffect } from "react";
import Navbar from "../../components/main/Navbar";
import Footer from "../../components/main/Footer";
import "../../assets/styles/main/Contact.css"; // CSS adicional si tienes

const Contact = () => {
  useEffect(() => {
    // Cargar el script de TikTok para activar el video embebido
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <Navbar />
      <section className="contact-section">
        <h2>Contáctanos</h2>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;

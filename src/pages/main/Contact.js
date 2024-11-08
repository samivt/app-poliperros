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
        <p>Siguenos</p>

        <div className="tiktok-video">
          <blockquote
            className="tiktok-embed"
            cite="https://www.tiktok.com/@poliperros/video/7430845399893544198"
            data-video-id="7430845399893544198"
            style={{ maxWidth: "605px", minWidth: "325px" }}
          >
            <section>
              <a
                target="_blank"
                title="@poliperros"
                href="https://www.tiktok.com/@poliperros?refer=embed"
                rel="noreferrer"
              >
                @poliperros
              </a>
              <p>📢 ¡Bienvenidos a Poliperros News! 📰...</p>
              <a
                target="_blank"
                title="♬ Breaking News, TV Shows, Report, Broadcast, Live, Serious, Business, World - SAKUMAMATATA"
                href="https://www.tiktok.com/music/Breaking-News-TV-Shows-Report-Broadcast-Live-Serious-Business-World-1323125-7156999467639277569?refer=embed"
                rel="noreferrer"
              >
                ♬ Breaking News - SAKUMAMATATA
              </a>
            </section>
          </blockquote>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;

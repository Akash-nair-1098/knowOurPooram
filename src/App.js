import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Heart, MessageCircle, X } from "lucide-react";
import { Container, Modal, Button } from "react-bootstrap";
import Home from "./HomeScreen/Home";
import Details from "./detailsScreen/Details";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [showWA, setShowWA] = useState(false);

  const handleWhatsAppJoin = () => {
    const phoneNumber = "919526226603";
    const message = encodeURIComponent("Join Peruvallur Times");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <Router>
      <div className="app-container d-flex flex-column min-vh-100">
        <header className="main-header">
          <Container>
            <div className="header-flex">
              <div className="title-section">
                <h1 className="main-title">
                  Know our <span>Pooram</span>
                </h1>
              </div>

              <div className="wa-trigger" onClick={() => setShowWA(true)}>
                <span className="powered-text">Powered by</span>
                <div className="wa-badge">
                  പെരുവല്ലൂർ <span className="time-text">Times</span>
                </div>
              </div>
            </div>
          </Container>
        </header>

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </main>

        <footer className="footer-dark text-center">
          <p className="mb-0">
           This website is Developed{" "}
            {/* with <Heart size={12} fill="#e63946" color="#e63946" />  */}
            by <br />
            <strong>Winkrafter India- Thamburan Agency Peruvallur</strong>
            <br />
            <strong>9526226603</strong>
          </p>
        </footer>

        {/* WhatsApp Join Modal */}
        <Modal
          show={showWA}
          onHide={() => setShowWA(false)}
          centered
          className="wa-modal"
        >
          <Modal.Body className="text-center p-4">
            <div className="wa-icon-circle mb-3">
              <MessageCircle size={40} color="#25D366" />
            </div>
            <h5 className="fw-bold">Join പെരുവല്ലൂർ Times</h5>
            <p className="text-muted small">
              Click on the below button to join{" "}
              <strong>Peruvallur Times whatsapp community</strong>.
            </p>
            <div className="alert alert-warning py-2 small border-0">
              Only Peruvallur residents will be approved.
            </div>
            <Button
              onClick={handleWhatsAppJoin}
              className="wa-join-btn w-100 py-2"
            >
              Message on WhatsApp
            </Button>
            <button
              className="btn btn-link text-muted mt-2 btn-sm text-decoration-none"
              onClick={() => setShowWA(false)}
            >
              Close
            </button>
          </Modal.Body>
        </Modal>
      </div>
    </Router>
  );
}

export default App;

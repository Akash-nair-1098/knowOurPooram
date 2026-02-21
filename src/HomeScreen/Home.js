import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { committees } from "../data";
import "./Home.css";
import all from '../Assets/allelephantsImage.png'
import { Modal } from "react-bootstrap";
import { X } from "lucide-react";

const Home = () => {

  const [showFull, setShowFull] = useState(false);

  const ElephantHero = () => {
    return (
      <>
        <div
          className="mobile-fit-hero"
          onClick={() => setShowFull(true)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={all}
            alt="All Participating Elephants"
            className="hero-img-full-view"
          />
          <div className="hero-text-overlay">
            <h2 className="m-0">ഗജവീരന്മാർ 2026</h2>
            <small style={{ fontSize: "0.7rem", opacity: 0.8 }}>
              Tap to expand
            </small>
          </div>
        </div>

        {/* Full Screen Modal */}
        <Modal
          show={showFull}
          onHide={() => setShowFull(false)}
          centered
          size="lg"
          className="gallery-modal"
        >
          <Modal.Body className="p-0 position-relative bg-black text-center">
            <button
              className="close-modal-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowFull(false);
              }}
            >
              <X size={28} />
            </button>
            <img
              src={all}
              alt="Full view"
              className="full-screen-img"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "90vh",
                objectFit: "contain",
              }}
            />
          </Modal.Body>
        </Modal>
      </>
    );
  };

  return (
    <div className="home-wrapper">
      <Container className="py-4">
        <div className="highlight-marquee-container">
          <div className="marquee-content">
            വർണ്ണപ്പൊലിമയുടെ തനിമയ്ക്ക് അംഗീകാരം!{" "}
            <span style={{ color: "#ffd700" }}>
              പെരുവല്ലൂർ ശ്രീ കോട്ടുകുറുമ്പ ഭഗവതി ക്ഷേത്രം{" "}
            </span>
            കുംഭഭരണി മഹോത്സവത്തോടനുബന്ധിച്ച്{" "}
            <span className="club-name">
              സെഞ്ച്വറി അഡ്വഞ്ചേഴ്സ് ആർട്സ് & സ്പോർട്സ് ക്ലബ്ബ്{" "}
            </span>
            നൽകുന്ന{" "}
            <span className="award-name">'ചമയശ്രേഷ്ഠ പുരസ്കാരം 2026'</span>-
            ദൈവങ്ങളുടെ നാട്ടിൽ നമ്മുടെ പൂരത്തിന് മാത്രം സ്വന്തം!
          </div>
        </div>
        <ElephantHero />
        {/* Section Title */}
        <div className="section-intro mb-4">
          <h4 className="fw-bold mb-1">Participating Committees</h4>
          <div className="title-underline"></div>
        </div>

        <Row className="g-4">
          {committees.map((item, index) => (
            <Col xs={12} sm={6} md={4} key={item.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to={`/details/${item.id}`}
                  className="text-decoration-none"
                >
                  <Card className="modern-poo-card border-0 shadow-sm">
                    {/* Top Thumbnail Section - Maximized for Logo */}
                    <div className="card-img-frame">
                      <div className="premium-badge">
                        <Star size={10} fill="currentColor" className="me-1" />
                        {item.type ?? "Committee"}
                      </div>
                      <Card.Img
                        src={item.logo}
                        alt={item.name}
                        className="card-logo-img"
                      />
                    </div>

                    {/* Content Section */}
                    <Card.Body className="p-3 text-center">
                      <div className="badge-pill mb-2">Pooram 2026</div>
                      <h5 className="committee-name mb-1 text-truncate">
                        {item.name}
                      </h5>
                      <p className="committee-sub text-muted mb-3">
                        {item.subtitle}
                      </p>

                      <div className="view-action-link">
                        <span>Know Their Programs</span>
                        <ArrowRight size={16} className="ms-1" />
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;

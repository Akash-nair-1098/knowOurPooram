import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Button, Card, Modal, Row, Col } from "react-bootstrap";
import {
  Phone,
  MapPin,
  ChevronLeft,
  Calendar,
  Clock,
  Download,
  Star,
  Instagram,
  X,
  Info,
  Trophy,
} from "lucide-react";
import "./Details.css";
import { committees } from "../data";

const Details = () => {
  const { id } = useParams();
  const item = committees.find((c) => c.id === parseInt(id));

  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");

  const handleImgClick = (imgSrc) => {
    setSelectedImg(imgSrc);
    setShowModal(true);
  };

  if (!item)
    return (
      <div className="text-center mt-5">
        <h3>Not Found</h3>
        <Link to="/">Home</Link>
      </div>
    );

  // Helper to handle both old single elephant and new multiple elephants array
  const elephantList = item.elephants || (item.elephant ? [item.elephant] : []);

  return (
    <div className="details-page-wrapper">
      <div className="cover-image-container">
        <img src={item.coverPhoto} alt="cover" className="cover-photo" />
        <Link to="/" className="back-btn-overlay">
          <ChevronLeft size={24} />
        </Link>
      </div>

      <Container className="py-4 animate-fade-in pb-5 content-shift-up">
        <div className="text-center mb-5 hero-section">
          <div className="logo-overlap shadow-lg">
            <img src={item.logo} alt="logo" className="logo-mini" />
          </div>
          <h2 className="committee-title mb-1">{item.name}</h2>
          <p className="subtitle-text text-uppercase">{item.subtitle}</p>

          {item.instagram && (
            <Button
              variant="none"
              href={item.instagram}
              target="_blank"
              className="insta-btn mt-2"
            >
              <Instagram size={18} className="me-2" /> Follow on Instagram
            </Button>
          )}
        </div>

        {/* Multiple Elephants Section */}
        {elephantList.length > 0 && (
          <section className="mb-5">
            <h5 className="section-heading">
              <Trophy size={20} className="me-2 text-warning" />
              {elephantList.length > 1
                ? "Featured Elephants"
                : "Featured Elephant"}
            </h5>
            <Row className="g-4">
              {elephantList.map((el, idx) => (
                <Col xs={12} md={elephantList.length > 1 ? 6 : 12} key={idx}>
                  <Card className="elephant-card shadow-lg overflow-hidden h-100">
                    <div
                      className="img-frame bg-black"
                      onClick={() => handleImgClick(el.image)}
                    >
                      <Card.Img
                        src={el.image}
                        alt={el.name}
                        className="contain-img"
                      />
                      <div className="elephant-label">
                        <Star fill="#ffcc00" color="#ffcc00" size={18} />
                        <div className="ms-2 text-start">
                          <div className="fw-bold">{el.name}</div>
                          {el.title && (
                            <small
                              className="d-block text-danger fw-bold"
                              style={{ fontSize: "0.65rem" }}
                            >
                              {el.title}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                    <Card.Body className="bg-white">
                      <p className="elephant-desc mb-0 small text-muted">
                        {el.description}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
        )}

        {/* Program Schedule */}
        <section className="mb-5">
          <h5 className="section-heading">
            <Calendar size={20} className="me-2 text-danger" />
            Program Schedule
          </h5>
          <div className="timeline-container shadow-sm">
            {item.programs?.map((prog, idx) => (
              <div
                key={idx}
                className="timeline-item d-flex justify-content-between align-items-center"
              >
                <div className="event-details">
                  <div className="event-name">{prog.event}</div>
                  <div className="event-date">{prog.date}</div>
                </div>
                <div className="time-badge-standard">
                  <Clock size={14} className="me-1" /> {prog.time}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Heritage Section */}
        <section className="mb-5">
          <h5 className="section-heading">
            <Info size={20} className="me-2 text-primary" />
            Our Heritage
          </h5>
          <div className="history-glass-card">
            <p className="mb-0">{item.history}</p>
          </div>
        </section>

        {/* Gallery */}
        {item.posters?.length > 0 && (
          <section className="mb-5">
            <h5 className="section-heading">Event Gallery</h5>
            <div className="horizontal-scroll-gallery no-scrollbar">
              {item.posters.map((p, i) => (
                <div
                  key={i}
                  className="gallery-item-box bg-black"
                  onClick={() => handleImgClick(p)}
                >
                  <img src={p} alt="poster" className="contain-img" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Sticky Actions */}
        <div className="floating-actions gap-2">
          <Button
            variant="primary"
            href={`tel:${item.phone}`}
            className="action-btn call-btn"
          >
            <Phone size={20} /> <span>Call</span>
          </Button>
          <Button
            variant="success"
            href={item.location}
            target="_blank"
            className="action-btn maps-btn"
          >
            <MapPin size={20} /> <span>Directions</span>
          </Button>
          {item.brochure && (
            <Button
              variant="danger"
              href={item.brochure}
              download
              className="action-btn download-btn"
            >
              <Download size={20} />
            </Button>
          )}
        </div>

        {/* Modal */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          size="lg"
          className="gallery-modal"
        >
          <Modal.Body className="p-0 position-relative bg-black text-center">
            <button
              className="close-modal-btn"
              onClick={() => setShowModal(false)}
            >
              <X size={28} />
            </button>
            <img
              src={selectedImg}
              alt="Full view"
              className="full-screen-img"
            />
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default Details;

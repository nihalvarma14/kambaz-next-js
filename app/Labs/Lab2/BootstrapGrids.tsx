import { Row, Col } from "react-bootstrap";

export default function BootstrapGrids() {
  return (
    <div id="wd-bs-grid-system">
      <h2>Bootstrap</h2>
      <h3>Grid system</h3>
      
      <h4>Basic Grid</h4>
      <Row>
        <Col xs={4} className="bg-danger text-white">
          <h3>Left half</h3>
        </Col>
        <Col xs={8} className="bg-primary text-white">
          <h3>Right half</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={4} className="bg-warning">
          <h3>One thirds</h3>
        </Col>
        <Col xs={8} className="bg-success text-white">
          <h3>Two thirds</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={2} className="bg-black text-white">
          <h3>Sidebar</h3>
        </Col>
        <Col xs={8} className="bg-success text-white">
          <h3>Main content</h3>
        </Col>
        <Col xs={2} className="bg-info">
          <h3>Sidebar</h3>
        </Col>
      </Row>

      <h4>Responsive grid</h4>
      <Row>
        <Col xs={12} md={6} lg={3} className="bg-warning">
          <h5>Column A</h5>
        </Col>
        <Col xs={12} md={6} lg={3} className="bg-primary text-white">
          <h5>Column B</h5>
        </Col>
        <Col xs={12} md={6} lg={3} className="bg-danger text-white">
          <h5>Column C</h5>
        </Col>
        <Col xs={12} md={6} lg={3} className="bg-success text-white">
          <h5>Column D</h5>
        </Col>
      </Row>

      <h4>Dramatic responsive grid</h4>
      <Row>
        <Col xs={12} sm={6} md={4} lg={3} xl={2} className="bg-warning">
          <h5>1</h5>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} xl={2} className="bg-primary text-white">
          <h5>2</h5>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} xl={2} className="bg-danger text-white">
          <h5>3</h5>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} xl={2} className="bg-success text-white">
          <h5>4</h5>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} xl={2} className="bg-info">
          <h5>5</h5>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} xl={2} className="bg-warning">
          <h5>6</h5>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} xl={2} className="bg-primary text-white">
          <h5>7</h5>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} xl={2} className="bg-danger text-white">
          <h5>8</h5>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} xl={2} className="bg-success text-white">
          <h5>9</h5>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} xl={2} className="bg-info">
          <h5>10</h5>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} xl={2} className="bg-warning">
          <h5>11</h5>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} xl={2} className="bg-primary text-white">
          <h5>12</h5>
        </Col>
      </Row>
    </div>
  );
}
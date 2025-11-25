import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  return (
    <Container fluid className={styles.main}>
      <Row>
        <Col className="col-auto d-flex align-items-center">
          <div ><div className={styles.name}>Nicholas Zaneti Aulivier</div></div>
        </Col>
        <Col className="d-flex align-items-center">
          <div ><div className={styles.nim}>535240054</div></div>
        </Col>
      </Row>
      <Row>
        <Button href="/dict" className="btn-primary m-auto">Word list</Button>
      </Row>
    </Container>
  );
}

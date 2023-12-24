import { Card, Col, Container, Row } from "react-bootstrap";
import { AdviseList } from "src/components/AdviseList";
import { StockVisualizer } from "src/components/StockVisualizer";
import { PriceRepository } from "src/model/PriceRepository";
import { StockAnalyst } from "src/model/StockAnalyst";
import { Page } from "./Page";

export const Index = () => {
    const priceRepo = new PriceRepository();
    const analyst = new StockAnalyst();

    const advises = analyst.advise(priceRepo);

    return (
        <Page>
            <Container>
                <Row>
                    <Col>
                        <Card style={{ width: "730px" }} className="mb-3">
                            <Card.Header>Advise</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Recommended stocks for purchase and sale based on the implemented trading strategy.
                                </Card.Text>
                                <AdviseList advises={advises} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: "730px" }}>
                            <Card.Header>Visualization</Card.Header>
                            <Card.Body>
                                <Card.Text>Visualize stock prices, trends and indicators.</Card.Text>
                                <StockVisualizer priceRepository={priceRepo} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Page>
    );
};

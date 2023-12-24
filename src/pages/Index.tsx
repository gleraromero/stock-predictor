import { Card, Col, Container, Row } from "react-bootstrap";
import { AdviseVisualizer } from "src/components/AdviseVisualizer";
import { MultiWindowTabGroup } from "src/components/MultiWindowTabGroup";
import { StockVisualizer } from "src/components/StockVisualizer";
import { PriceRepository } from "src/model/PriceRepository";
import { StockAnalyst } from "src/model/StockAnalyst";
import { Page } from "./Page";

export const Index = () => {
    const priceRepo = new PriceRepository();
    const analyst = new StockAnalyst();

    return (
        <Page>
            <Container>
                <MultiWindowTabGroup>
                    {(interval, resolution) => (
                        <Row>
                            <Col>
                                <Card style={{ width: "730px" }} className="mb-3">
                                    <Card.Header>Advise</Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            Recommended stocks for purchase and sale based on the implemented trading
                                            strategy.
                                        </Card.Text>
                                        <AdviseVisualizer
                                            repository={priceRepo}
                                            analyst={analyst}
                                            interval={interval}
                                            resolution={resolution}
                                        />
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card style={{ width: "730px" }}>
                                    <Card.Header>Visualization</Card.Header>
                                    <Card.Body>
                                        <Card.Text>Visualize stock prices, trends and indicators.</Card.Text>
                                        <StockVisualizer
                                            priceRepository={priceRepo}
                                            interval={interval}
                                            resolution={resolution}
                                        />
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </MultiWindowTabGroup>
            </Container>
        </Page>
    );
};

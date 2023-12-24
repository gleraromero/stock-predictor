import { Card, Col, Container, Row } from "react-bootstrap";
import { MultiWindowTrendChart } from "src/components/MultiWindowTrendChart";
import { PricePoint, PriceTrend } from "src/model/PriceTrend";
import { Timestamp } from "src/model/Timestamp";
import { Page } from "./Page";

export const Index = () => {
    const trend = new PriceTrend([
        new PricePoint(Timestamp.fromString("2023-01-01"), 3582),
        new PricePoint(Timestamp.fromString("2023-02-01"), 3550),
        new PricePoint(Timestamp.fromString("2023-03-01"), 3565),
        new PricePoint(Timestamp.fromString("2023-05-01"), 3595),
        new PricePoint(Timestamp.fromString("2023-06-01"), 3620),
        new PricePoint(Timestamp.fromString("2023-07-01"), 3610),
        new PricePoint(Timestamp.fromString("2023-08-01"), 3605),
        new PricePoint(Timestamp.fromString("2023-09-01"), 3598),
        new PricePoint(Timestamp.fromString("2023-10-01"), 3625),
        new PricePoint(Timestamp.fromString("2023-11-01"), 3675),
        new PricePoint(Timestamp.fromString("2023-12-01"), 3680),
    ]);

    return (
        <Page>
            <Container>
                <Row>
                    <Col>
                        <Card style={{ width: "730px" }}>
                            <Card.Header>Summary</Card.Header>
                            <Card.Body>
                                <Card.Text>Visualize stock prices, trends and indicators.</Card.Text>
                                <MultiWindowTrendChart trend={trend} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Page>
    );
};

import { useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { MultiWindowTrendChart } from "src/components/MultiWindowTrendChart";
import { PriceRepository } from "src/model/PriceRepository";
import { Page } from "./Page";

export const Index = () => {
    const [selectedAction, setAction] = useState("GSPC");

    const priceRepository = new PriceRepository();
    console.log(selectedAction);
    const trend = priceRepository.trendFor(selectedAction);
    console.log(trend.points()[0].price());

    const onActionChange = (event: any) => {
        console.log(event);
        setAction(event.target.value);
    };

    return (
        <Page>
            <Container>
                <Row>
                    <Col>
                        <Card style={{ width: "730px" }}>
                            <Card.Header>Summary</Card.Header>
                            <Card.Body>
                                <Card.Text>Visualize stock prices, trends and indicators.</Card.Text>
                                <Form.Select className="mb-3" onChange={onActionChange}>
                                    {priceRepository.actions().map(action => (
                                        <option key={action.ticker()} value={action.ticker()}>
                                            {action.name()}
                                        </option>
                                    ))}
                                </Form.Select>
                                <MultiWindowTrendChart trend={trend} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Page>
    );
};

import { useState } from "react";
import { Alert, Badge, Card, Col, Container, Row, Stack } from "react-bootstrap";
import { StockSelect } from "src/components/StockSelect";
import { TrendChart } from "src/components/TrendChart";
import { PriceRepository } from "src/model/PriceRepository";
import { Strategy } from "src/model/Strategy";
import { TimeResolution } from "src/model/TimeResolution";
import { Operation } from "src/model/Trade";
import { Page } from "./Page";

export const Strategies = () => {
    const [selectedStock, setStock] = useState("GSPC");

    const priceRepo = new PriceRepository();
    const strategy = new Strategy();
    const trend = priceRepo.trendFor(selectedStock);
    const result = strategy.run(trend);

    return (
        <Page>
            <Container>
                <Row>
                    <Col>
                        <Card style={{ width: "730px" }}>
                            <Card.Header>Validation</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Validate investment strategies with historical data to benchmark their performance.
                                </Card.Text>
                                <StockSelect onStockSelected={setStock} stocks={priceRepo.actions()} />
                                <Card.Text>
                                    <b>Gains:</b> ${result.gains().toFixed(2)}{" "}
                                    <Badge bg={result.isPositive() ? "success" : "danger"}>
                                        %{result.gainPercentage().toFixed(2)}
                                    </Badge>
                                </Card.Text>
                                <Card.Title>Chart</Card.Title>
                                <TrendChart
                                    trend={trend.forResolution(TimeResolution.monthly())}
                                    trades={result.trades()}
                                />
                                <Card.Title>Trades</Card.Title>
                                <Stack>
                                    {result.trades().map((trade, _) => (
                                        <Alert
                                            variant={trade.operation() == Operation.BUY ? "success" : "danger"}
                                            className="p-2 m-1 small"
                                        >
                                            <b>{trade.timestamp().toDateString()}</b> {trade.operation().valueOf()}:{" "}
                                            {trade.units().toFixed(2)} units @ ${trade.pricePerUnit().toFixed(2)}{" "}
                                            (total: ${trade.totalPrice().toFixed(2)})
                                        </Alert>
                                    ))}
                                </Stack>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Page>
    );
};

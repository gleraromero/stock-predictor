import { useMemo, useState } from "react";
import { Alert, Badge, Card, Col, Container, Row, Stack, Table } from "react-bootstrap";
import { MultiWindowTabGroup } from "src/components/MultiWindowTabGroup";
import { StockSelect } from "src/components/StockSelect";
import { TrendChart } from "src/components/TrendChart";
import { PriceRepository } from "src/model/PriceRepository";
import { Strategy } from "src/model/Strategy";
import { StrategyEvaluator } from "src/model/StrategyEvaluator";
import { TimeInterval } from "src/model/TimeInterval";
import { Timestamp } from "src/model/Timestamp";
import { Operation } from "src/model/Trade";
import { Page } from "./Page";

export const Index = () => {
    const [selectedStock, setStock] = useState("GSPC");

    const evaluationInterval = new TimeInterval(Timestamp.fromString("2022-01-01"), Timestamp.fromString("2023-12-30"));
    const priceRepo = PriceRepository.fromFile();
    const strategy = new Strategy();
    const trend = priceRepo.trendFor(selectedStock).forInterval(evaluationInterval);
    const evaluator = new StrategyEvaluator(priceRepo);

    const budget = 10000;
    const evaluation = useMemo(() => evaluator.evaluate(strategy, evaluationInterval, budget), []);
    const result = useMemo(() => evaluation.resultFor(selectedStock), [selectedStock]);

    return (
        <Page>
            <Container style={{ width: "730px" }}>
                <Row>
                    <Col className="mb-2">
                        <Card style={{ width: "730px" }}>
                            <Card.Header>Evaluate</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    See the performance of the strategies evaluated over the whole data set.
                                </Card.Text>
                                <Card.Text>
                                    <b>Median gains:</b> ${evaluation.medianGains().toFixed(2)}{" "}
                                    <Badge bg={evaluation.medianGains() > 0 ? "success" : "danger"}>
                                        %{evaluation.medianGainsPercentage().toFixed(2)}
                                    </Badge>
                                </Card.Text>
                                <div style={{ overflowY: "scroll", maxHeight: 300 }}>
                                    <Table hover={true}>
                                        <thead>
                                            <tr>
                                                <th>Symbol</th>
                                                <th>Gains ($)</th>
                                                <th>Gains (%)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {priceRepo.actions().map(stock => {
                                                const ticker = stock.ticker();
                                                const tickerResult = evaluation.resultFor(ticker);
                                                return (
                                                    <tr
                                                        key={ticker}
                                                        onClick={() => setStock(ticker)}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        <td>{ticker}</td>
                                                        <td>{tickerResult.gains().toFixed(2)}</td>
                                                        <td>
                                                            <Badge bg={tickerResult.gains() > 0 ? "success" : "danger"}>
                                                                {tickerResult.gainPercentage().toFixed(2)}%
                                                            </Badge>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: "730px" }}>
                            <Card.Header>Analyze</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Understand investment strategies with historical data to identify improvement
                                    opportunities
                                </Card.Text>
                                <StockSelect
                                    onStockSelected={setStock}
                                    stocks={priceRepo.actions()}
                                    selectedStock={selectedStock}
                                />
                                <Card.Text>
                                    <b>Gains:</b> ${result.gains().toFixed(2)}{" "}
                                    <Badge bg={result.isPositive() ? "success" : "danger"}>
                                        %{result.gainPercentage().toFixed(2)}
                                    </Badge>
                                </Card.Text>
                                <Card.Title>Chart</Card.Title>
                                <MultiWindowTabGroup>
                                    {(_, resolution) => (
                                        <TrendChart
                                            trend={trend.forInterval(evaluationInterval).forResolution(resolution)}
                                            trades={result.trades()}
                                        />
                                    )}
                                </MultiWindowTabGroup>
                                <Card.Title>Trades</Card.Title>
                                <Stack>
                                    {result.trades().map((trade, index) => (
                                        <Alert
                                            key={index}
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

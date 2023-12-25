import { useEffect, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { PriceRepository } from "src/model/PriceRepository";
import { Strategy } from "src/model/Strategy";
import { StrategyEvaluator } from "src/model/StrategyEvaluator";
import { TimeInterval } from "src/model/TimeInterval";
import { Timestamp } from "src/model/Timestamp";
import { Page } from "./Page";

export const Optimization = () => {
    const [bestOption, setBestOption] = useState({ gains: -Infinity, gainsPercentage: -Infinity, weights: {} });

    const priceRepo = PriceRepository.fromFile();
    const strategy = new Strategy();
    const interval = new TimeInterval(Timestamp.fromString("2021-01-01"), Timestamp.fromString("2022-12-31"));
    const weights: any[] = [];
    for (const macdNormStrength of [1.8, 2, 2.2]) {
        for (const sr of [4.5, 5, 5.5]) {
            for (const scoreBuyThreshold of [0.2, 0.3, 0.4]) {
                for (const scoreSellThreshold of [-1.8, -1.5, -1.3]) {
                    weights.push({ macdNormStrength, sr, scoreBuyThreshold, scoreSellThreshold });
                }
            }
        }
    }

    useEffect(() => {
        const evaluator = new StrategyEvaluator(priceRepo);

        let bestGains = -Infinity;
        let bestGainsPercentage = -Infinity;
        let bestWeights = {};

        for (const weight of weights) {
            const result = evaluator.evaluate(strategy, interval, 10000, weight);
            if (result.medianGains() > bestGains) {
                bestGains = result.medianGains();
                bestGainsPercentage = result.medianGainsPercentage();
                bestWeights = { ...weight };
                setBestOption({ gains: bestGains, gainsPercentage: bestGainsPercentage, weights: bestWeights });
            }
        }
    }, []);

    return (
        <Page>
            <Container style={{ width: "730px" }}>
                <Row>
                    <Col className="mb-2">
                        {Number.isFinite(bestOption.gains) ? (
                            <div>
                                Best gains: ${bestOption.gains.toFixed(2)}
                                <br />
                                Best gains percentage: {bestOption.gainsPercentage.toFixed(2)}
                                <br />
                                Best weights: {JSON.stringify(bestOption.weights)}
                            </div>
                        ) : (
                            <Alert>Optimizing parameters, please wait.</Alert>
                        )}
                    </Col>
                </Row>
            </Container>
        </Page>
    );
};

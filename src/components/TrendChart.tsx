import { Alert, Badge, Stack } from "react-bootstrap";
import Plot from "react-plotly.js";
import { PriceTrend } from "src/model/PriceTrend";
import { Operation, Trade } from "src/model/Trade";
import { COLORS } from "src/style/Theme";

type TrendChartProps = { trend: PriceTrend; trades?: Trade[] };

export const TrendChart = ({ trend, trades }: TrendChartProps) => {
    if (trend.isEmpty()) {
        return (
            <Alert key={"info"} variant={"info"}>
                There are no price points.
            </Alert>
        );
    }

    const x = trend.points().map(point => point.timestamp().toString());
    const y = trend.points().map(point => point.close());
    const yRange = [Math.min(...y) - 0.3 * trend.height(), Math.max(...y) + 0.3 * trend.height()];
    const buyTrades = (trades ?? []).filter(trade => trade.operation() == Operation.BUY);
    const sellTrades = (trades ?? []).filter(trade => trade.operation() == Operation.SELL);
    return (
        <div>
            <Plot
                data={[
                    {
                        name: "",
                        x,
                        y,
                        type: "scatter",
                        mode: "lines+markers",
                        marker: { color: COLORS.chartLine, size: 4 },
                        hovertemplate: "%{x}<br>$%{y}",
                    },
                    {
                        name: "",
                        x: [trend.firstPoint().timestamp().toString(), trend.lastPoint().timestamp().toString()],
                        y: [trend.support(), trend.support()],
                        type: "scatter",
                        mode: "lines",
                        hoverinfo: "none",
                        line: { dash: "dash", color: COLORS.support },
                    },
                    {
                        name: "",
                        x: [trend.firstPoint().timestamp().toString(), trend.lastPoint().timestamp().toString()],
                        y: [trend.resistance(), trend.resistance()],
                        type: "scatter",
                        mode: "lines",
                        hoverinfo: "none",
                        line: { dash: "dash", color: COLORS.resistance },
                    },
                    // Trades
                    {
                        name: "",
                        x: buyTrades.map(trade => trade.timestamp().toString()),
                        y: buyTrades.map(trade => trade.pricePerUnit()),
                        type: "scatter",
                        mode: "markers",
                        marker: { color: COLORS.buyTrade, size: 10, symbol: "square" },
                        hovertext: buyTrades.map(trade => trade.toString()),
                    },
                    {
                        name: "",
                        x: sellTrades.map(trade => trade.timestamp().toString()),
                        y: sellTrades.map(trade => trade.pricePerUnit()),
                        type: "scatter",
                        mode: "markers",
                        marker: { color: COLORS.sellTrade, size: 10, symbol: "cross" },
                        hovertext: sellTrades.map(trade => trade.toString()),
                    },
                ]}
                layout={{
                    autosize: true,
                    margin: { b: 20, t: 0, l: 0, r: 40 },
                    xaxis: { type: "date", tickformat: "%b %d, %y", fixedrange: true },
                    yaxis: { range: yRange, side: "right", fixedrange: true },
                    showlegend: false,
                }}
                config={{
                    displayModeBar: false,
                    responsive: true,
                }}
                style={{ width: "100%", height: "200px" }}
            />
            <Stack direction="horizontal" gap={1}>
                <Badge>Resistance: ${trend.resistance().toFixed(2)}</Badge>&nbsp;
                <Badge>Support: ${trend.support().toFixed(2)}</Badge>
            </Stack>
        </div>
    );
};

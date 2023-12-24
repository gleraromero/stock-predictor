import { Alert, Badge, Stack } from "react-bootstrap";
import Plot from "react-plotly.js";
import { PriceTrend } from "src/model/PriceTrend";
import { StockAnalyst } from "src/model/StockAnalyst";
import { COLORS } from "src/style/Theme";

type TrendChartProps = { trend: PriceTrend };

export const TrendChart = ({ trend }: TrendChartProps) => {
    if (trend.isEmpty()) {
        return (
            <Alert key={"info"} variant={"info"}>
                There are no price points.
            </Alert>
        );
    }

    const stockAnalyst = new StockAnalyst();
    const x = trend.points().map(point => point.timestamp().toString());
    const y = trend.points().map(point => point.close());
    const yRange = [Math.min(...y) - 0.3 * trend.height(), Math.max(...y) + 0.3 * trend.height()];
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
                        y: [stockAnalyst.support(trend), stockAnalyst.support(trend)],
                        type: "scatter",
                        mode: "lines",
                        hoverinfo: "none",
                        line: { dash: "dash", color: COLORS.support },
                    },
                    {
                        name: "",
                        x: [trend.firstPoint().timestamp().toString(), trend.lastPoint().timestamp().toString()],
                        y: [stockAnalyst.resistance(trend), stockAnalyst.resistance(trend)],
                        type: "scatter",
                        mode: "lines",
                        hoverinfo: "none",
                        line: { dash: "dash", color: COLORS.resistance },
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
                <Badge>Resistance: ${stockAnalyst.resistance(trend).toFixed(2)}</Badge>&nbsp;
                <Badge>Support: ${stockAnalyst.support(trend).toFixed(2)}</Badge>
            </Stack>
        </div>
    );
};

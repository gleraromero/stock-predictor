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
    return (
        <div>
            <Plot
                data={[
                    {
                        name: "",
                        x: trend.points().map(point => point.timestamp().toString()),
                        y: trend.points().map(point => point.price()),
                        type: "scatter",
                        mode: "lines+markers",
                        marker: { color: COLORS.chartLine, size: 4 },
                        hovertemplate: "%{x}<br>$%{y}",
                    },
                ]}
                layout={{
                    autosize: true,
                    margin: { b: 20, t: 0, l: 0, r: 40 },
                    xaxis: {
                        type: "date",
                        tickformat: "%b %d, %y",
                    },
                    yaxis: { range: [trend.minPrice() * 0.8, trend.maxPrice() * 1.2], side: "right" },
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

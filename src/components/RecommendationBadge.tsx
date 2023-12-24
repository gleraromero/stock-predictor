import { Badge } from "react-bootstrap";
import { Recommendation } from "src/model/InvestmentAdvise";

type RecommendationBadgeProps = {
    recommendation: Recommendation;
};
export const RecommendationBadge = ({ recommendation }: RecommendationBadgeProps) => {
    const colors = {
        [Recommendation.STRONG_BUY]: "success",
        [Recommendation.BUY]: "primary",
        [Recommendation.HOLD]: "secondary",
        [Recommendation.UNDERPERFORM]: "warning",
        [Recommendation.SELL]: "danger",
    };
    const color = colors[recommendation] ?? "light";
    return <Badge bg={color}>{recommendation.valueOf()}</Badge>;
};

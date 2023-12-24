import { InvestmentAdvise } from "src/model/InvestmentAdvise";
import { RecommendationBadge } from "./RecommendationBadge";

type AdviseListProps = {
    advises: InvestmentAdvise[];
};

export const AdviseList = ({ advises }: AdviseListProps) => {
    return (
        <ul>
            {advises.map((advise: InvestmentAdvise, index: number) => (
                <li key={index}>
                    <RecommendationBadge recommendation={advise.recommendation()} />{" "}
                    <b>
                        {advise.stock().name()} ({advise.stock().ticker()})
                    </b>
                    <ul>
                        {advise.reasons().map((reason: string, index: number) => (
                            <li key={index}>{reason}</li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
};

import { InvestmentAdvise } from "src/model/InvestmentAdvise";
import { RecommendationBadge } from "./RecommendationBadge";

type AdviseListProps = {
    advises: InvestmentAdvise[];
};

export const AdviseList = ({ advises }: AdviseListProps) => {
    return (
        <ul>
            {advises.map(advise => (
                <li>
                    <RecommendationBadge recommendation={advise.recommendation()} />{" "}
                    <b>
                        {advise.stock().name()} ({advise.stock().ticker()})
                    </b>
                    <ul>
                        {advise.reasons().map((reason: string) => (
                            <li>{reason}</li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
};

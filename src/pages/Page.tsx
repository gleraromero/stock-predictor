import { ReactChild } from "react";
import { NavHeader } from "src/components/NavHeader";

type PageProps = { children: ReactChild };

export const Page = ({ children }: PageProps) => {
    return (
        <div>
            <NavHeader />
            {children}
        </div>
    );
};

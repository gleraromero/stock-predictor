import { ReactNode } from "react";
import { NavHeader } from "src/components/NavHeader";

type PageProps = { children: ReactNode };

export const Page = ({ children }: PageProps) => {
    return (
        <div>
            <NavHeader />
            {children}
        </div>
    );
};

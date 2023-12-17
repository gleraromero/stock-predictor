import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Index } from "./pages/Index";
import { Page2 } from "./pages/Page2";

export const App = () => {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route path={"/"} element={<Index />} />
                <Route path={"/page2"} element={<Page2 />} />
            </Routes>
        </BrowserRouter>
    );
};

import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Index } from "./pages/Index";
import { Strategies } from "./pages/Strategies";

export const App = () => {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route path={"/"} element={<Index />} />
                <Route path={"/strategies"} element={<Strategies />} />
            </Routes>
        </BrowserRouter>
    );
};

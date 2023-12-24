import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Index } from "./pages/Index";

export const App = () => {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route path={"/"} element={<Index />} />
            </Routes>
        </BrowserRouter>
    );
};

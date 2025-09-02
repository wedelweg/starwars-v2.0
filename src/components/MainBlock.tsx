import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import AboutMe from "./AboutMe";
import StarWars from "./StarWars";
import Contact from "./Contact";
import { navItems } from "../utils/constants";
import { useHeroContext } from "../utils/useContext";

const RedirectHome = () => {
    const { hero } = useHeroContext();
    const key = (hero || "luke").toLowerCase();
    return <Navigate to={`/${navItems[0].route}/${key}`} replace />;
};

const RedirectStarWars = () => {
    const { hero } = useHeroContext();
    const key = (hero || "luke").toLowerCase();
    return <Navigate to={`/${navItems[2].route}/${key}`} replace />;
};

const RedirectContact = () => {
    const { hero } = useHeroContext();
    const key = (hero || "luke").toLowerCase();
    return <Navigate to={`/${navItems[3].route}/${key}`} replace />;
};

const MainBlock = () => {
    return (
        <Routes>
            <Route path="/" element={<RedirectHome />} />

            <Route path={`${navItems[0].route}`} element={<RedirectHome />} />
            <Route path={`${navItems[0].route}/:heroId`} element={<Home />} />

            <Route path={`${navItems[1].route}/:heroId`} element={<AboutMe />} />

            <Route path={`${navItems[2].route}`} element={<RedirectStarWars />} />
            <Route path={`${navItems[2].route}/:heroId`} element={<StarWars />} />

            <Route path={`${navItems[3].route}`} element={<RedirectContact />} />
            <Route path={`${navItems[3].route}/:heroId`} element={<Contact />} />

            <Route path="*" element={<RedirectHome />} />
        </Routes>
    );
};

export default MainBlock;

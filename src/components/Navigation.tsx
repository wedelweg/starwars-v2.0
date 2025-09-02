import { NavLink, useParams } from "react-router-dom";
import { useHeroContext } from "../utils/useContext";

const Navigation = ({ className = "" }: { className?: string }) => {
    const { hero } = useHeroContext();
    const { heroId: heroFromUrl } = useParams();
    const heroKey = (heroFromUrl || hero || "luke").toLowerCase();

    const withHero = (base: string) => `${base}/${heroKey}`;

    const nav = [
        { title: "Home",     to: withHero("/home") },
        { title: "About Me", to: withHero("/aboutMe") },
        { title: "Star Wars",to: withHero("/starWars") },
        { title: "Contact",  to: withHero("/contact") },
    ];

    return (
        <nav className={["flex items-center gap-1", className].join(" ")}>
            {nav.map((item) => (
                <NavLink
                    key={item.title}
                    to={item.to}
                    className={({ isActive }) =>
                        [
                            "px-3 py-2 rounded-xl text-sm font-semibold transition",
                            "text-gray-200 hover:text-white hover:bg-white/10",
                            isActive ? "text-yellow-300 bg-white/10 ring-1 ring-white/10" : "",
                        ].join(" ")
                    }
                >
                    {item.title}
                </NavLink>
            ))}
        </nav>
    );
};

export default Navigation;

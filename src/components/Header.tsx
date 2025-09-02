import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useHeroContext } from "../utils/useContext";
import { characters } from "../utils/characters";

const Header = () => {
    const { hero } = useHeroContext();
    const { heroId: heroFromUrl } = useParams();
    const heroKey = (heroFromUrl || hero || "luke").toLowerCase();

    const [open, setOpen] = useState(false);

    const withHero = (base: string) => `${base}/${heroKey}`;

    const nav = [
        { title: "Home",     to: withHero("/home") },
        { title: "About Me", to: withHero("/aboutMe") },
        { title: "Star Wars",to: "/starWars" },
        { title: "Contact",  to: withHero("/contact") },
    ];

    return (
        <header className="sticky top-0 z-50">

            <div className="backdrop-blur supports-[backdrop-filter]:bg-gray-900/70 bg-gray-900/90 border-b border-white/10 shadow-lg">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="h-14 sm:h-16 flex items-center justify-between gap-6">
                        {/* Бренд */}
                        <NavLink to={withHero("/home")} className="select-none">
              <span className="text-yellow-400 font-black tracking-widest text-sm sm:text-base">
                STAR • WARS
              </span>
                        </NavLink>

                        <nav className="hidden md:flex items-center gap-1">
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

                        <button
                            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg text-gray-200 hover:bg-white/10 transition"
                            aria-label="Toggle menu"
                            onClick={() => setOpen((s) => !s)}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" className="stroke-current" fill="none">
                                <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>

                    {open && (
                        <div className="md:hidden pb-3">
                            <nav className="flex flex-col gap-1">
                                {nav.map((item) => (
                                    <NavLink
                                        key={item.title}
                                        to={item.to}
                                        onClick={() => setOpen(false)}
                                        className={({ isActive }) =>
                                            [
                                                "px-3 py-2 rounded-lg text-sm font-semibold transition",
                                                "text-gray-200 hover:text-white hover:bg-white/10",
                                                isActive ? "text-yellow-300 bg-white/10 ring-1 ring-white/10" : "",
                                            ].join(" ")
                                        }
                                    >
                                        {item.title}
                                    </NavLink>
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-transparent">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h1 className="py-4 text-center text-3xl sm:text-4xl font-extrabold tracking-wide text-yellow-400 drop-shadow">
                        {characters[heroKey]?.name ?? "Star • Wars"}
                    </h1>
                </div>
            </div>
        </header>
    );
};

export default Header;

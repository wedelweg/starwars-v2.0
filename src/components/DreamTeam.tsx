import { useContext } from "react";
import { useNavigate } from "react-router";
import { HeroContext } from "../utils/useContext";
import { characters } from "../utils/characters";
import { navItems } from "../utils/constants";

const DreamTeam = () => {
    const navigate = useNavigate();
    const { hero } = useContext(HeroContext)!;

    const team = Object.keys(characters).filter((k) => k !== hero);

    return (
        <section className="rounded-2xl bg-black/40 backdrop-blur ring-1 ring-white/10 shadow-2xl p-5 sm:p-6">
            <h3 className="text-center text-xl font-extrabold tracking-wide text-yellow-300">
                Dream Team
            </h3>

            <div className="mt-4 grid grid-cols-3 gap-3">
                {team.map((key) => {
                    const c = characters[key];
                    return (
                        <button
                            key={key}
                            onClick={() => navigate(`/${navItems[0].route}/${key}`)}
                            className="group overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10 hover:ring-yellow-300/40 hover:bg-white/10 transition transform hover:-translate-y-0.5 hover:shadow-lg"
                        >
                            <div className="relative">
                                <img
                                    src={c.img}
                                    alt={c.name}
                                    className="h-24 w-full object-cover"
                                />
                                <div className="pointer-events-none absolute inset-0 ring-0 ring-yellow-300/0 group-hover:ring-2 group-hover:ring-yellow-300/40 transition" />
                            </div>
                            <p className="px-2 py-1 text-center text-[11px] leading-tight text-gray-200 group-hover:text-yellow-300 transition">
                                {c.name}
                            </p>
                        </button>
                    );
                })}
            </div>
        </section>
    );
};

export default DreamTeam;

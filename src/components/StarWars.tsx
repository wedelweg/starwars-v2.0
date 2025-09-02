import { useParams } from "react-router-dom";
import { useHeroContext } from "../utils/useContext";
import { characters } from "../utils/characters";
import FarGalaxy from "./FarGalaxy";
import ErrorPage from "./ErrorPage";

const StarWars = () => {
    const { heroId } = useParams();
    const { hero } = useHeroContext();
    const heroKey = (heroId || hero || "luke").toLowerCase();
    const current = characters[heroKey];

    // 👉 если heroId есть в URL и его нет в characters → показываем ErrorPage
    if (heroId && !current) {
        return <ErrorPage />;
    }

    return (
        <main className="pb-10">
            <div className="border-b border-white/10 bg-gray-900/70">
                <div className="mx-auto flex w-full max-w-6xl items-center gap-2 px-4 py-3 text-sm">
                    <span className="font-semibold text-yellow-400">STAR • WARS</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-200">{current?.name ?? "Unknown hero"}</span>
                </div>
            </div>

            <section className="mx-auto mt-6 w-full max-w-6xl px-4">
                <div className="rounded-2xl border border-white/10 bg-gray-900/70 p-6 shadow-2xl ring-1 ring-white/10 md:p-8">
                    <FarGalaxy />
                </div>
            </section>
        </main>
    );
};

export default StarWars;

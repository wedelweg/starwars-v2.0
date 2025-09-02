import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Hero from "./Hero";
import DreamTeam from "./DreamTeam";
import FarGalaxy from "./FarGalaxy";
import { characters } from "../utils/characters";
import { defaultHero, navItems } from "../utils/constants";
import { HeroContext } from "../utils/useContext";

const Home = () => {
    const { heroId } = useParams();
    const { setHero } = useContext(HeroContext)!;
    const navigate = useNavigate();

    useEffect(() => {
        if (heroId && Object.keys(characters).includes(heroId)) {
            setHero(heroId);
        } else {
            navigate(`/${navItems[0].route}/${defaultHero}`, { replace: true });
        }
    }, [heroId]);

    return (
        <main className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 py-8 space-y-10">

            <section className="grid grid-cols-12 gap-6 items-start">
                <div className="col-span-12 lg:col-span-7">
                    <Hero />
                </div>
                <aside className="col-span-12 lg:col-span-5 lg:sticky lg:top-24">
                    <DreamTeam />
                </aside>
            </section>

            <section className="rounded-2xl bg-white/5 backdrop-blur ring-1 ring-white/10 shadow-2xl">
                <div className="px-5 sm:px-8 py-6 sm:py-8">
                    <FarGalaxy />
                </div>
            </section>
        </main>
    );
};

export default Home;

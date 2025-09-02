import { useContext } from "react";
import { characters } from "../utils/characters";
import { HeroContext } from "../utils/useContext";

const Hero = () => {
    const { hero: heroId } = useContext(HeroContext)!;
    const current = characters[heroId];

    return (
        <article className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 bg-black/40 backdrop-blur shadow-2xl">

            <div className="relative">
                <img
                    src={current.img}
                    alt={current.name}
                    className="w-full aspect-[16/10] object-cover"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            <div className="p-6 sm:p-8">

            </div>
        </article>
    );
};

export default Hero;

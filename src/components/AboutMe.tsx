import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHeroContext } from "../utils/useContext";
import { characters } from "../utils/characters";

type CharacterApi = {
    name: string;
    height: string;
    birth_year: string;
    gender: string;
    mass: string;
    skin_color: string;
    eye_color: string;
};

const AboutMe = () => {
    const { heroId } = useParams();
    const { hero, setHero } = useHeroContext();

    const heroKey = (heroId || hero || "luke").toLowerCase();
    const current = characters[heroKey];

    const [data, setData] = useState<CharacterApi | null>(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    // Обновляем контекст текущего героя (для меню/хедера)
    useEffect(() => {
        if (characters[heroKey]) setHero(heroKey);
    }, [heroKey, setHero]);

    // Тянем данные героя из API с безопасным fallback
    useEffect(() => {
        if (!current?.url) {
            setData(null);
            return;
        }

        const ctrl = new AbortController();

        (async () => {
            try {
                setLoading(true);
                setErr(null);

                const r = await fetch(current.url, { signal: ctrl.signal });
                if (!r.ok) throw new Error("Failed to fetch character data");

                const api = (await r.json()) as CharacterApi;
                // Мерджим локальные + API (картинка — из локальной базы)
                setData({ ...api });
            } catch (e) {
                if (e instanceof Error && e.name !== "AbortError") {
                    setErr(e.message || "Failed to load");
                }
                // показываем хотя бы локальные данные (если что-то знаем)
                setData(null);
            } finally {
                setLoading(false);
            }
        })();

        return () => ctrl.abort();
    }, [current?.url]);

    if (!current) {
        return (
            <main className="container mx-auto px-4 py-10">
                <div className="rounded-xl border border-white/10 bg-gray-900/70 p-6 text-white">
                    <h2 className="text-xl font-bold text-yellow-400">Hero not found</h2>
                </div>
            </main>
        );
    }

    // Вычисляем значения с учётом fallback: api → локальное из characters → прочерк
    const value = (k: keyof CharacterApi, fallback?: string) =>
        (data && (data[k] as string)) || fallback || "—";

    const rows: { label: string; key: keyof CharacterApi; fallback?: string }[] = [
        { label: "Name", key: "name", fallback: current.name },
        { label: "Height", key: "height" },
        { label: "Birth Year", key: "birth_year" },
        { label: "Gender", key: "gender" },
        { label: "Mass", key: "mass" },
        { label: "Skin color", key: "skin_color" },
        { label: "Eye color", key: "eye_color" },
    ];

    return (
        <main className="pb-10">
            {/* Хлебные крошки */}
            <div className="border-b border-white/10 bg-gray-900/70">
                <div className="mx-auto flex w-full max-w-6xl items-center gap-2 px-4 py-3 text-sm">
                    <span className="font-semibold text-yellow-400">STAR • WARS</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-200">About Me</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-200">{current.name}</span>
                </div>
            </div>

            {/* Карточка с данными */}
            <section className="mx-auto mt-6 w-full max-w-6xl px-4">
                <div className="rounded-2xl border border-white/10 bg-gray-900/70 p-8 shadow-2xl ring-1 ring-white/10">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-[400px,1fr] items-center">
                        {/* Фото героя */}
                        <div className="flex justify-center">
                            <img
                                src={current.img}
                                alt={current.name}
                                className="w-[350px] md:w-[400px] h-auto rounded-2xl border border-white/10 shadow-lg ring-1 ring-white/10"
                            />
                        </div>

                        {/* Характеристики */}
                        <div>
                            <h2 className="mb-4 text-2xl font-extrabold tracking-wide text-yellow-400">
                                Profile
                            </h2>

                            <div className="overflow-hidden rounded-xl border border-white/10">
                                <dl className="divide-y divide-white/10">
                                    {rows.map((r, idx) => (
                                        <div
                                            key={r.label}
                                            className={`grid grid-cols-2 gap-2 px-4 py-3 ${
                                                idx % 2 === 0 ? "bg-black/20" : "bg-black/10"
                                            }`}
                                        >
                                            <dt className="text-xs font-semibold uppercase text-gray-400 tracking-wide">
                                                {r.label}
                                            </dt>
                                            <dd className="text-sm font-semibold text-gray-100">
                                                {value(r.key, r.fallback)}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutMe;

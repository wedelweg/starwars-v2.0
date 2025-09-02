import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { characters } from "../utils/characters";
import { useHeroContext } from "../utils/useContext";
import ErrorPage from "./ErrorPage";

type ApiCharacter = {
    name?: string;
    height?: string;
    birth_year?: string;
    gender?: string;
    mass?: string;
    skin_color?: string;
    eye_color?: string;
};

const AboutMe = () => {
    const { heroId } = useParams();
    const { hero, setHero } = useHeroContext();

    // используем heroId из URL, иначе контекст, иначе дефолт "luke"
    const key = heroId ? heroId.toLowerCase() : (hero ?? "luke").toLowerCase();
    const current = characters[key];

    const [data, setData] = useState<ApiCharacter | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (current) {
            setHero(key);
        }
    }, [key, current, setHero]);

    useEffect(() => {
        if (!current?.url) {
            setData(null);
            return;
        }

        const ctrl = new AbortController();

        (async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(current.url, { signal: ctrl.signal });

                if (!res.ok) {
                    setError("Failed to load character from API");
                    setData(null);
                    return;
                }

                const json: ApiCharacter = await res.json();
                setData(json);
            } catch (e) {
                if ((e as any)?.name !== "AbortError") {
                    setError("Network error. Showing local data.");
                }
            } finally {
                setLoading(false);
            }
        })();

        return () => ctrl.abort();
    }, [current?.url]);

    const rows = useMemo(
        () => [
            { label: "Name", value: data?.name ?? current?.name },
            { label: "Height", value: data?.height },
            { label: "Birth Year", value: data?.birth_year },
            { label: "Gender", value: data?.gender },
            { label: "Mass", value: data?.mass },
            { label: "Skin color", value: data?.skin_color },
            { label: "Eye color", value: data?.eye_color },
        ],
        [data, current?.name]
    );

    // 👉 Показываем ErrorPage, если heroId есть в URL, но такого персонажа нет
    if (heroId && !current) {
        return <ErrorPage />;
    }

    return (
        <main className="max-w-6xl mx-auto px-4 py-10 text-white">
            <nav className="text-sm text-white/70 mb-6">
                <Link to={`/home/${key}`} className="hover:text-white">
                    Home
                </Link>
                <span className="mx-2">•</span>
                <span>About Me</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-8">
                {current.name}
            </h1>

            <section className="rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur-sm p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1 flex justify-center">
                        <img
                            src={current.img}
                            alt={current.name}
                            className="w-full max-w-xs rounded-2xl shadow-2xl ring-1 ring-white/10 object-cover"
                        />
                    </div>

                    <div className="md:col-span-2">
                        {loading && (
                            <div className="mb-4 text-white/80">Loading character…</div>
                        )}
                        {error && (
                            <div className="mb-4 rounded-lg bg-red-500/15 text-red-200 px-4 py-2">
                                {error}
                            </div>
                        )}

                        <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
                            <table className="w-full text-left">
                                <tbody className="divide-y divide-white/10">
                                {rows.map((row) => (
                                    <tr key={row.label} className="bg-white/5">
                                        <th className="w-40 md:w-56 px-4 py-3 text-yellow-300 font-semibold">
                                            {row.label}
                                        </th>
                                        <td className="px-4 py-3 text-white">
                                            {row.value ?? <span className="text-white/50">—</span>}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {error && (
                            <p className="mt-3 text-sm text-white/60">
                                Using local fallback data.
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutMe;

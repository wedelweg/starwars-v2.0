import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { base_url, period_days_24 } from "../utils/constants";
import ModalWindow from "./ModalWindow";
import ErrorPage from "./ErrorPage";
import { characters } from "../utils/characters";

type Form = {
    firstname: string;
    lastname: string;
    planet: string;
    subject: string;
};

const Contact = () => {
    const { heroId } = useParams();
    const [planets, setPlanets] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<Form>({
        firstname: "",
        lastname: "",
        planet: "",
        subject: "",
    });

    // 👉 проверяем heroId
    if (heroId && !(heroId.toLowerCase() in characters)) {
        return <ErrorPage />;
    }

    const fillPlanets = async (url: string) => {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data: any = await res.json();
            if (!Array.isArray(data) || !data.every((d) => d && d.name)) {
                throw new Error("Unexpected API format");
            }
            const list = data.map((d) => d.name);
            setPlanets(list);
            setFormData((f) => ({ ...f, planet: f.planet || list[0] || "" }));
            localStorage.setItem("planets", JSON.stringify({ payload: list, time: Date.now() }));
            setError(null);
        } catch (e: any) {
            console.error("Ошибка загрузки планет:", e);
            setError("Ошибка загрузки планет. Показан запасной список.");
            setPlanets(["Endor", "Tatooine", "Naboo"]);
            setFormData((f) => ({ ...f, planet: "Endor" }));
        }
    };

    useEffect(() => {
        const raw = localStorage.getItem("planets");
        if (raw) {
            try {
                const cached = JSON.parse(raw) as { payload: string[]; time: number };
                if (cached && Date.now() - cached.time < period_days_24) {
                    setPlanets(cached.payload);
                    setFormData((f) => ({ ...f, planet: cached.payload[0] || f.planet }));
                    return;
                }
            } catch (e) {
                console.warn("Ошибка чтения кеша:", e);
            }
        }
        fillPlanets(`${base_url}/v1/planets`);
    }, []);

    const onChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsOpen(true);
    };

    if (!planets.length) {
        return <ErrorPage />;
    }

    return (
        <>
            <div className="flex justify-center px-4 py-10">
                <form
                    onSubmit={onSubmit}
                    className="w-full max-w-3xl rounded-2xl border border-white/10 bg-gray-900/70 p-8 shadow-2xl ring-1 ring-white/10"
                >
                    <h2 className="text-2xl font-extrabold text-yellow-400">
                        Contact Form
                    </h2>
                    <p className="mb-6 text-sm text-gray-300">
                        Fill out the form below to send us a holomail.
                    </p>

                    {error && (
                        <div className="mb-4 rounded-lg bg-red-500/15 text-red-200 px-4 py-2">
                            {error}
                        </div>
                    )}

                    <div className="grid gap-5 md:grid-cols-2">
                        <label className="block">
              <span className="mb-1 block text-sm font-semibold text-gray-200">
                First Name
              </span>
                            <input
                                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white outline-none ring-yellow-400/60 placeholder:text-gray-400 focus:ring-2"
                                name="firstname"
                                value={formData.firstname}
                                onChange={onChange}
                                placeholder="Your first name…"
                            />
                        </label>

                        <label className="block">
              <span className="mb-1 block text-sm font-semibold text-gray-200">
                Last Name
              </span>
                            <input
                                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white outline-none ring-yellow-400/60 placeholder:text-gray-400 focus:ring-2"
                                name="lastname"
                                value={formData.lastname}
                                onChange={onChange}
                                placeholder="Your last name…"
                            />
                        </label>
                    </div>

                    <div className="mt-5">
                        <label className="block">
              <span className="mb-1 block text-sm font-semibold text-gray-200">
                Planet
              </span>
                            <select
                                name="planet"
                                value={formData.planet}
                                onChange={onChange}
                                className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white outline-none ring-yellow-400/60 focus:ring-2"
                            >
                                {planets.map((p) => (
                                    <option key={p} value={p}>
                                        {p}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className="mt-5">
                        <label className="block">
              <span className="mb-1 block text-sm font-semibold text-gray-200">
                Subject
              </span>
                            <textarea
                                className="h-36 w-full resize-none rounded-lg border border-gray-700 bg-gray-800 p-3 text-white outline-none ring-yellow-400/60 placeholder:text-gray-400 focus:ring-2"
                                name="subject"
                                value={formData.subject}
                                onChange={onChange}
                                placeholder="Write something…"
                            />
                        </label>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-500 md:w-auto"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            <ModalWindow isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <h3 className="mb-3 text-xl font-bold text-yellow-400">Your holomail</h3>
                <div className="space-y-1 text-gray-100">
                    <p>
                        <span className="font-semibold text-gray-300">First Name:</span>{" "}
                        {formData.firstname || "—"}
                    </p>
                    <p>
                        <span className="font-semibold text-gray-300">Last Name:</span>{" "}
                        {formData.lastname || "—"}
                    </p>
                    <p>
                        <span className="font-semibold text-gray-300">Planet:</span>{" "}
                        {formData.planet || "—"}
                    </p>
                    <p>
                        <span className="font-semibold text-gray-300">Subject:</span>{" "}
                        {formData.subject || "—"}
                    </p>
                </div>
            </ModalWindow>
        </>
    );
};

export default Contact;

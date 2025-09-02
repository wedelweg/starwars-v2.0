// src/components/Home.tsx
import Hero from "./Hero";
import DreamTeam from "./DreamTeam";
import FarGalaxy from "./FarGalaxy";
import { useErrorPage } from "../hooks/useErrorPage";
import ErrorPage from "./ErrorPage";

const Home = () => {
    const { isErrorPage } = useErrorPage();

    if (isErrorPage) {
        return <ErrorPage />;
    }

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

import { useState } from "react";
import ModalWindow from "./ModalWindow";

const Footer = () => {
    const [open, setOpen] = useState(false);
    const year = new Date().getFullYear();

    return (
        <footer className="mt-14 border-t border-white/10 bg-gray-900/70 text-gray-300">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between">
                {/* Brand & Copyright */}
                <div className="text-sm">
                    <span className="font-semibold text-yellow-400">STAR • WARS</span>{" "}
                    fan page — © {year}
                </div>

                {/* Links */}
                <nav className="flex flex-wrap items-center gap-4 text-sm">
                    <a
                        href="#"
                        className="hover:text-yellow-300"
                        onClick={(e) => e.preventDefault()}
                    >
                        Privacy
                    </a>
                    <a
                        href="#"
                        className="hover:text-yellow-300"
                        onClick={(e) => e.preventDefault()}
                    >
                        Terms
                    </a>
                    <a
                        href="#"
                        className="hover:text-yellow-300"
                        onClick={(e) => e.preventDefault()}
                    >
                        Credits
                    </a>
                    <a
                        href="https://github.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-yellow-300"
                    >
                        GitHub
                    </a>
                </nav>

                {/* Email button */}
                <div>
                    <button
                        onClick={() => setOpen(true)}
                        className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-500"
                    >
                        Email me
                    </button>
                </div>
            </div>

            <ModalWindow isOpen={open} onClose={() => setOpen(false)}>
                <h3 className="mb-2 text-xl font-bold text-yellow-400">Send me an Email</h3>
                <p className="text-gray-100">
                    You can email me at{" "}
                    <a
                        href="mailto:andrey@trofimenko.org"
                        className="text-yellow-300 underline hover:text-yellow-200"
                    >
                        andrey@trofimenko.org
                    </a>
                </p>
            </ModalWindow>
        </footer>
    );
};

export default Footer;

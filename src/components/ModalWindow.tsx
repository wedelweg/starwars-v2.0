import React from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
};

const ModalWindow: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            aria-modal="true"
            role="dialog"
        >
            {/* backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* card */}
            <div className="relative z-10 w-[min(92vw,560px)] rounded-2xl border border-yellow-400 bg-gray-900/95 p-6 shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 rounded-full bg-gray-800 px-2 py-1 text-sm text-gray-300 hover:bg-gray-700"
                    aria-label="Close"
                >
                    ✕
                </button>

                {children ?? (
                    <>
                        <h3 className="mb-2 text-xl font-bold text-yellow-400">Send me an Email</h3>
                        <p className="text-gray-200">
                            You can email me at{" "}
                            <a
                                href="mailto:luke@starwars.com"
                                className="text-yellow-300 underline hover:text-yellow-200"
                            >
                                luke@starwars.com
                            </a>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default ModalWindow;

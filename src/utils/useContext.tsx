import React, { createContext, useContext, useState } from "react";

export interface HeroContextType {
    hero: string;
    setHero: React.Dispatch<React.SetStateAction<string>>;
}

export const HeroContext = createContext<HeroContextType | null>(null);

export const HeroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [hero, setHero] = useState<string>("luke");
    return (
        <HeroContext.Provider value={{ hero, setHero }}>
            {children}
        </HeroContext.Provider>
    );
};

export const useHeroContext = () => {
    const ctx = useContext(HeroContext);
    if (!ctx) throw new Error("useHeroContext must be used inside <HeroProvider>");
    return ctx;
};

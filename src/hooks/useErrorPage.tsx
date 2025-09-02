// src/hooks/useErrorPage.tsx
import { useParams } from "react-router";
import { defaultHero } from "../utils/constants";
import { useContext, useEffect, useState } from "react";
import { HeroContext } from "../utils/useContext";
import { characters } from "../utils/characters";

export const useErrorPage = () => {
    const { heroId } = useParams<{ heroId?: string }>();
    const { setHero } = useContext(HeroContext)!;
    const [isErrorPage, setIsErrorPage] = useState(false);

    useEffect(() => {
        const currentHero = heroId ?? defaultHero;

        if (currentHero in characters) {
            setHero(currentHero);
            setIsErrorPage(false);
        } else {
            setIsErrorPage(true);
        }
    }, [heroId, setHero]);

    return { isErrorPage };
};

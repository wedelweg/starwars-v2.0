import {useEffect, useState} from 'react';
import {base_url, period} from "../utils/constants.ts";

const FarGalaxy = () => {
    const [text, setText] = useState("Loading...");

    useEffect(() => {
        const episode = Math.floor(Math.random() * 6 + 1)+"";
        const storageEp = JSON.parse(localStorage.getItem(episode)!);
        if (storageEp && (Date.now() - storageEp.time) < period) {
            setText(storageEp.payload);
        } else {
            fetch(`${base_url}/v1/films/${episode}`)
                .then(response => response.json())
                .then(data => {
                    setText(data.opening_crawl)
                    const info = {
                        payload: data.opening_crawl,
                        time: Date.now()
                    };
                    localStorage.setItem(episode, JSON.stringify(info));
                })
        }
        return () => {
            console.log("Unmounted");
        }
    }, []);

    return (
        <p className="farGalaxy">
            {text}
        </p>
    );
};

export default FarGalaxy;
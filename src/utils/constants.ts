import friend1 from '../images/friend1.jpg';
import friend2 from '../images/friend2.jpg';
import friend3 from '../images/friend3.jpg';
import friend4 from '../images/friend4.jpg';
import friend5 from '../images/friend5.jpg';
import friend6 from '../images/friend6.jpg';
import friend7 from '../images/friend7.jpg';
import friend8 from '../images/friend8.jpg';
import friend9 from '../images/friend9.jpg';
import {characters} from "./characters.ts";

export const friends = [friend1, friend2, friend3, friend4,
    friend5, friend6, friend7, friend8, friend9];

export const base_url = "https://sw-info-api.herokuapp.com";

export const period = 1000 * 60 * 60 * 24;
export const period_days_24 = 1000 * 60 * 60 * 24 * 24;

export interface INavItem {
    title:string,
    route:string
}

export const navItems:INavItem[] = [
    {
        title: "Home",
        route: "home"
    },
    {
        title: "About Me",
        route: "aboutMe"
    },
    {
        title: "Star Wars",
        route: "starWars"
    },
    {
        title: "Contact",
        route: "contact"
    }
];

export const defaultHero = Object.keys(characters)[0];
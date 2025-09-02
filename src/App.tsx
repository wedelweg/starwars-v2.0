import "./App.css";
import Header from "./components/Header";
import MainBlock from "./components/MainBlock";
import Footer from "./components/Footer";
import { HeroProvider } from "./utils/useContext";

function App() {
    return (
        <HeroProvider>
            <Header />
            <MainBlock />
            <Footer />
        </HeroProvider>
    );
}

export default App;

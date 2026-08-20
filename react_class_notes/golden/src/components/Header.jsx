import { Link } from 'react-router-dom';
import ThemeToggleButton from '../components/ThemeToggleButton'

export default function Header() {
    return (
        <>
            <header>
                <h1 style={{ color: "#5924ce", fontSize: "4rem" }}>Odun Eniola</h1>

                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/contact">Contact</Link>
                </nav>
            <br />
                    <ThemeToggleButton />
            </header>
            <br />
            <br />
        </>
    );
}

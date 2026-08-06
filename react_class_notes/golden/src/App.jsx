import Header from "./components/Header";
import Bio from "./components/Bio";
import ProjectCard from "./components/ProjectCard";
import projects from "./data/projects";

function App() {
    return (
        <>
            <Header />
            <main>
                <Bio />
                {projects.map(project => (
                    <ProjectCard key={project.id} {...project} />
                ))}
            </main>
        </>
    )
}

export default App;

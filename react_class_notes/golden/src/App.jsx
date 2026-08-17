import { useState, useEffect } from 'react';
import ProjectCard from './components/ProjectCard.jsx';
import ContactForm from './components/ContactForm.jsx';

const staticProjects = [
    { id: 1, title: "Weather App", description: "A React Native app that fetches live weather data.", tags: ["React Native", "Expo"], featured: false },
    { id: 2, title: "Task Tracker", description: "A Python CLI tool for tracking daily tasks.", tags: ["Python"], featured: false },
    { id: 3, title: "This Portfolio", description: "The very site you're looking at right now.", tags: ["React", "JavaScript"], featured: true }
];

function App() {
    const [githubRepos, setGithubRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch('https://api.github.com/users/ajibolagenius/repos?sort=updated');

                if (!response.ok) {
                    throw new Error('Could not fetch GitHub repos');
                }

                const data = await response.json();

                const mapped = data.slice(0, 3).map(repo => ({
                    id: `gh-${repo.id}`,
                    title: repo.name,
                    description: repo.description ?? "No description yet.",
                    tags: [repo.language ?? "Code"],
                    featured: false
                }));

                setGithubRepos(mapped);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, []); // Run once on mount

    const allProjects = [...staticProjects, ...githubRepos];

    if (loading) return <p>Loading GitHub projects...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <>
            <div className="work-grid">
                {allProjects.map(project => (
                    <ProjectCard key={project.id} {...project} />
                ))}
            </div>
            <hr />
            <ContactForm />
        </>
    );
}

export default App;

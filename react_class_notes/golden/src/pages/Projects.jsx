import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard.jsx';
import staticProjects from '../data/projects.js';

export default function Projects() {
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
    
    return (<>
        <div className="work-grid">
            {allProjects.map(project => (
                <Link key={project.id} to={`/projects/${project.id}`} state={{ project }}>
                    <ProjectCard {...project} />
                </Link>
            ))}
        </div>

    </>)
}
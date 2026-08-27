import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch.js'
import ProjectCard from '../components/ProjectCard.jsx';
import staticProjects from '../data/projects.js';

export default function Projects() {
    const { data: repo, loading, error } = useFetch(`https://api.github.com/users/${import.meta.env.VITE_GITHUB_USERNAME}/repos?sort=updated`);

    if (loading) return <p>Loading GitHub projects...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    const githubProjects = repo.map(repo => ({
        id: `gh-${repo.id}`,
        title: repo.name,
        description: repo.description ?? "No description yet.",
        tags: [repo.language ?? "Code"],
        featured: false
    }));

    const allProjects = [...staticProjects, ...githubProjects];

    return (<>
        <div className="work-grid">
            {allProjects.map(project => <ProjectCard key={project.id} {...project} />)}
        </div>
    </>)
}
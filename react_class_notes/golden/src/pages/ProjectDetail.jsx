import { useLocation, useParams } from 'react-router-dom';
import projects from '../data/projects.js';

export default function ProjectDetail() {
    const { id } = useParams();
  const { state } = useLocation();

  const project = state?.project ?? projects.find((item) => String(item.id) === id);

    if (!project) return <p>Project not found.</p>

    return (
    <article>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <ul>{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
    </article>
  );
}
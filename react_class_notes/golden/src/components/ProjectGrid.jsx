function ProjectGrid({ projects }) {
    if (projects.lenght === 0) {
        return <p>No projects match this tag yet.</p>
    }

    return (
        <>
            <div className="work-grid">
                {
                    projects.map(project => <ProjectCard key={project.id} {...project} />)
                }
            </div>
        </>
    )
}

<ul>
    <li key="0"></li>
    <li key="1"></li>
    <li key=""></li>
</ul>

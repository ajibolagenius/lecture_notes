import Badge from "./Badge";
import styles from './ProjectCard.module.css';

export default function ProjectCard({ title, description, tags, featured, imageSrc }) {
    return (
        <article className={`${styles.card} ${featured ? styles.featured : ''}`}>
            <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f4bb/512.gif" alt="💻" width="24" height="24" />
            <h3>
                {title}
                {/* {<Badge>Featured</Badge>} */}
            </h3>
            <p>{description}</p>
            <ul>
                {tags.map((tag, index) => (
                    <li key={index} style={{ padding: "0.25rem", margin: "0.25rem", borderRadius: "0.25rem", listStyle: "none", display: "inline-block", border: "1px solid #ccc" }}>
                        {tag}
                    </li>
                ))}
            </ul>
        </article>
    );
}

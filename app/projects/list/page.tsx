import Link from "next/link";

const projects = [
  { name: "weather-app", title: "Weather App" },
  { name: "todo-app", title: "Todo App" },
  { name: "chat-app", title: "Chat App" },
];

export default function ProjectsList() {
  return (
    <main>
      <h1>Projects</h1>

      <ul>
        {projects.map((project) => (
          <li key={project.name}>
            <Link href={`/projects/${project.name}`}>{project.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

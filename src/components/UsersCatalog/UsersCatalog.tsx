import { useState, useEffect } from "react";
import { fetchData } from "../../api/fetchData";
import { transformData } from "../../utils/transformData";
import type { Result } from "../../types";
import "./UsersCatalog.css";

function UsersCatalog() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { users, projects, tasks } = await fetchData();
        const usersCatalog = transformData(users, projects, tasks);
        setResults(usersCatalog);
      } catch (err) {
        setError("Не удалось загрузить данные");
        console.error("Ошибка при загрузке данных:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="catalog">
      {results.map((user) => (
        <article key={user.name} className="catalog__user">
          <h2 className="catalog__user-title">
            {user.name} — Total: {user.total_estimate}h
          </h2>
            <ul>
              {user.projects_estimates.map((project) => (
                <li key={project.name} className="catalog__project">
                  <h3 className="catalog__project-title">
                    <strong>{project.name}</strong>
                    {project.total_estimate}h
                  </h3>
                  <ul className="catalog__tasks">
                    {project.tasks.map((task) => (
                      <li key={task.id} className="catalog__task">
                        <p>{task.name}</p>
                        <p>{task.estimate}h</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
        </article>
      ))}
    </div>
  );
}

export default UsersCatalog;

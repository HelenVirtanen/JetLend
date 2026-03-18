import { useState, useEffect } from "react";
import { fetchData } from "../../api/fetchData";
import { transformData } from "../../utils/transformData";
import type { Result } from "../../types";
import "./UsersCatalog.css";

function UsersCatalog() {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { users, projects, tasks } = await fetchData();
        const usersCatalog = transformData(users, projects, tasks);
        console.log("projects", projects);
        console.log("tasks", tasks);
        setResults(usersCatalog);
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
      }
    };

    loadData();
  }, []);
  return (
    <div className="catalog">
      {results.map((user) => (
        <article key={user.name} className="catalog__user">
          <h2 className="catalog__user-title">
            {user.name} — Total: {user.total_estimate}h
          </h2>
          {user.projects_estimates.length === 1 ? (
            <div className="catalog__project">
              <h3 className="catalog__project-title"><strong>{user.projects_estimates[0].name}</strong>
              {user.projects_estimates[0].total_estimate}h</h3>
              <ul className="catalog__tasks">
                {user.projects_estimates[0].tasks.map((task) => (
                      <li key={task.id} className="catalog__task">
                        <p>{task.name}</p>
                        <p>{task.estimate}h</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <ul>
                  {user.projects_estimates.map((project) => (
                    <li key={project.name} className="catalog__project">
                      <h3 className="catalog__project-title"><strong>{project.name}</strong>{project.total_estimate}h</h3>
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
              )}
        </article>
      ))}
    </div>
  )
}

export default UsersCatalog;

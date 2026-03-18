import type { User, Project, Task } from "../types";
import { USERS_URL, PROJECTS_URL, TASKS_URL } from "../constants/apiPaths";
import { getJson } from "./fetchHelper";

export const fetchData = async (): Promise<{
  users: User[];
  projects: Project[];
  tasks: Task[];
}> => {
  const [users, projects, tasks] = await Promise.all([
    getJson<User[]>(USERS_URL),
    getJson<Project[]>(PROJECTS_URL),
    getJson<Task[]>(TASKS_URL),
  ]);

  return {
    users,
    projects,
    tasks,
  };
};

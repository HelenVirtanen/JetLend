import type { User, Project, Task, Result, ProjectEstimate } from "../types";

const getProjectEstimate = (
  projectId: number,
  projectName: string,
  userTasks: Task[],
): ProjectEstimate | null => {
  const projectTasks = userTasks.filter(
    (task) => task.project_id === projectId,
  );
  if (projectTasks.length === 0) return null;

  const totalProjectTasks = projectTasks.reduce(
    (sum, task) => sum + task.estimate,
    0,
  );
  return { name: projectName, total_estimate: totalProjectTasks, tasks: projectTasks };
};

const getUserResult = (
  user: User,
  projects: Project[],
  tasks: Task[],
): Result => {
  const userTasks = tasks.filter((task) => task.responsible_id === user.id);

  const projects_estimates = projects
    .map((project) => getProjectEstimate(project.id, project.name, userTasks))
    .filter((p): p is ProjectEstimate => p !== null);

  const totalUserTasks = projects_estimates.reduce(
    (sum, p) => sum + p.total_estimate,
    0,
  );

  return { name: user.name, total_estimate: totalUserTasks, projects_estimates };
};

export const transformData = (
  users: User[],
  projects: Project[],
  tasks: Task[],
): Result[] => {
  return users.map((user) => getUserResult(user, projects, tasks));
};

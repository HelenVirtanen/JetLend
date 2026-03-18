import type { User, Project, Task, Result, ProjectEstimate } from "../types";

export const transformData = (
  users: User[],
  projects: Project[],
  tasks: Task[],
): Result[] => {
  return users.map((user) => {
    const userTasks = tasks.filter((task) => task.responsible_id === user.id);

    const projects_estimates: ProjectEstimate[] = projects
      .map((project) => {
        const projectTasks = userTasks.filter(
          (task) => task.project_id === project.id,
        );
        if (projectTasks.length === 0) return null;
        const total_estimate = projectTasks.reduce(
          (sum, task) => sum + task.estimate,
          0,
        );
        return {
          name: project.name,
          total_estimate,
          tasks: projectTasks,
        };
      })
      .filter((p): p is ProjectEstimate => p !== null);

    const total_estimate = projects_estimates.reduce(
      (sum, p) => sum + p.total_estimate,
      0,
    );

    return {
      name: user.name,
      total_estimate,
      projects_estimates,
    };
  });
};

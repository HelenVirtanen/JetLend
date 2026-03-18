import { describe, it, expect } from "vitest";
import { transformData } from "./transformData";
import type { User, Project, Task } from "../types";

describe("transformData", () => {
  it("собирает пользователей с проектами и задачами", () => {
    const users: User[] = [
      { id: 1, name: "Alice" },
    ];

    const projects: Project[] = [
      { id: 10, name: "Project A", code: "ALP" },
    ];

    const tasks: Task[] = [
      {
        id: 100,
        name: "Task 1",
        estimate: 5,
        project_id: 10,
        responsible_id: 1,
      },
      {
        id: 101,
        name: "Task 2",
        estimate: 3,
        project_id: 10,
        responsible_id: 1,
      },
    ];

    const result = transformData(users, projects, tasks);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Alice");
    expect(result[0].total_estimate).toBe(8);

    expect(result[0].projects_estimates).toHaveLength(1);
    expect(result[0].projects_estimates[0].name).toBe("Project A");
    expect(result[0].projects_estimates[0].total_estimate).toBe(8);

    expect(result[0].projects_estimates[0].tasks).toHaveLength(2);
  });

  it("не добавляет проекты без задач", () => {
    const users: User[] = [{ id: 1, name: "Alice" }];

    const projects: Project[] = [
      { id: 10, name: "Project A", code: "ALP" },
      { id: 20, name: "Project B", code: "ALP" },
    ];

    const tasks: Task[] = [
      {
        id: 1,
        name: "Task",
        estimate: 5,
        project_id: 10,
        responsible_id: 1,
      },
    ];

    const result = transformData(users, projects, tasks);

    expect(result[0].projects_estimates).toHaveLength(1);
    expect(result[0].projects_estimates[0].name).toBe("Project A");
  });

  it("возвращает 0 если у пользователя нет задач", () => {
    const users: User[] = [{ id: 1, name: "Alice" }];
    const projects: Project[] = [{ id: 10, name: "Project A", code: "ALP" }];
    const tasks: Task[] = [];

    const result = transformData(users, projects, tasks);

    expect(result[0].total_estimate).toBe(0);
    expect(result[0].projects_estimates).toHaveLength(0);
  });
});
import { describe, it, expect, vi } from "vitest";
import { fetchData } from "./fetchData";
import * as api from "./fetchHelper";

describe("fetchData", () => {
  it("загружает users, projects и tasks", async () => {
    vi.spyOn(api, "getJson")
      .mockResolvedValueOnce([{ id: 1, name: "User" }]) // users
      .mockResolvedValueOnce([{ id: 10, name: "Project" }]) // projects
      .mockResolvedValueOnce([{ id: 100, name: "Task" }]); // tasks

    const result = await fetchData();

    expect(result.users).toHaveLength(1);
    expect(result.projects).toHaveLength(1);
    expect(result.tasks).toHaveLength(1);
  });
});

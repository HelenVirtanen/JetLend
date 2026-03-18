import { describe, it, expect, vi, beforeEach } from "vitest";
import { getJson } from "./fetchHelper";

describe("getJson", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("возвращает data при статусе OK", async () => {
    const mockResponse = {
      json: async () => ({ status: "OK", data: [1, 2, 3] }),
    } as Response;

    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse) as unknown as typeof fetch;

    const result = await getJson<number[]>("test-url");

    expect(result).toEqual([1, 2, 3]);
  });

  it("кидает ошибку при статусе не OK", async () => {
    const mockResponse = {
      json: async () => ({ status: "ERROR", data: null }),
    } as Response;

    globalThis.fetch = vi.fn().mockResolvedValue(mockResponse) as unknown as typeof fetch;

    await expect(getJson("test-url")).rejects.toThrow("Ошибка загрузки данных");
  });
});

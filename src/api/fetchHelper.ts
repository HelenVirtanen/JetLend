import type { ApiResponse } from "../types";

export async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  const { status, data }: ApiResponse<T> = await res.json();

  if (status !== "OK") {
    throw new Error(`Ошибка загрузки данных: ${status}`);
  }

  return data;
}

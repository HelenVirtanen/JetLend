export type ApiResponse<T> = {
  status: string;
  data: T;
};

export type User = {
  id: number;
  name: string;
};

export type Project = {
  id: number;
  name: string;
  code: string;
};

export type Task = {
  id: number;
  name: string;
  project_id: number;
  estimate: number;
  responsible_id: number | null;
};

export type ProjectEstimate = {
  name: string;
  total_estimate: number;
  tasks: Task[];
};

export type Result = {
  name: string;
  total_estimate: number;
  projects_estimates: ProjectEstimate[];
};

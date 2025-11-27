export interface Company {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
  created_at: string;
}

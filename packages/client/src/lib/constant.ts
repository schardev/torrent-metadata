export const API_URL = import.meta.env.PROD
  ? (import.meta.env.VITE_API_URL! as string)
  : "http://localhost:3001";

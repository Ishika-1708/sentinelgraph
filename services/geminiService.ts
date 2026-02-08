
const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8000";

export const analyzeArchitecture = async (repoUrl: string, intent: string) => {
  const res = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ repoUrl, intent }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Analyze failed: ${res.status} ${text}`);
  }

  return res.json();
};

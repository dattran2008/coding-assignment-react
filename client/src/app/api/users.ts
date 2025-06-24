export const fetchUserById = async (id: number | null) => {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  return res.json();
};

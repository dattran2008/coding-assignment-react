export const fetchUserById = async (id: number | null) => {
  try {
    const res = await fetch(`/api/users/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

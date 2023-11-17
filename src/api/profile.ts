const API_URL = process.env.NEXT_PUBLIC_URL;
export async function getProfile(name: string) {
  try {
    const data = await fetch(`${API_URL}/users/${name}`);
    if (!data.ok) {
      throw new Error('Error loading profile');
    }
    return data.json();
  } catch (error) {
    console.log("🚀 ~ file: profile.ts:5 ~ getProfile ~ error:", error);
  }
};

export async function getRepos(name: string) {
  try {
    const data = await fetch(`${API_URL}/users/${name}/repos`);
    if (!data.ok) {
      throw new Error('Error loading profile');
    }
    return data.json();
  } catch (error) {
    console.log("🚀 ~ file: profile.ts:5 ~ getProfile ~ error:", error);
  }
};
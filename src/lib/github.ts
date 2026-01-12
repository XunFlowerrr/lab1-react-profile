export interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string | null;
}

export interface GithubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  location: string | null;
  email: string | null;
  twitter_username: string | null;
  html_url: string;
}

const getUsername = () => {
  const envUsername =
    import.meta.env.VITE_GITHUB_USERNAME || "https://github.com/XunFlowerrr";
  let username = envUsername;

  // Extract username if it's a full URL
  if (envUsername.includes("github.com/")) {
    username =
      envUsername.split("github.com/").pop()?.split("/")[0] || envUsername;
  }
  return username;
};

export const fetchGithubUser = async (): Promise<GithubUser> => {
  const username = getUsername();
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user profiles");
  }

  return response.json();
};

export const fetchGithubRepos = async (): Promise<Project[]> => {
  const username = getUsername();

  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repositories");
  }

  const data = await response.json();

  return data.map((repo: any) => ({
    title: repo.name,
    description: repo.description || "No description provided.",
    tags: repo.topics || [],
    github: repo.html_url,
    demo: repo.homepage || null,
  }));
};

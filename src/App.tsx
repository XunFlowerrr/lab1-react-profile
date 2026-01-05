import { useState } from "react";
import { Profile } from "@/components/Profile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Loader2 } from "lucide-react";
import githubProfile from "@/assets/github_profile.jpg";
import type { ProfileCardProps } from "@/components/ProfileCard";

function App() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState<ProfileCardProps[]>([
    {
      name: "Tanit Yodsirawong",
      role: "Full Stack Developer",
      bio: "Passionate about building beautiful and functional web applications using React, TypeScript, and Tailwind CSS.",
      imageUrl: githubProfile,
    },
  ]);

  const fetchGitHubUser = async () => {
    if (!username.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error("User not found");
      const data = await response.json();

      const newProfile: ProfileCardProps = {
        name: data.name || data.login,
        role: "GitHub User",
        bio: data.bio || "No bio available",
        imageUrl: data.avatar_url,
      };

      setProfiles((prev) => [...prev, newProfile]);
      setUsername("");
    } catch (error) {
      console.error(error);
      alert("User not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-center p-8 gap-12 bg-slate-50 dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <h1 className="text-3xl font-bold tracking-tight">Profile Explorer</h1>
        <div className="flex w-full gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search GitHub username..."
              className="pl-9"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchGitHubUser()}
            />
          </div>
          <Button onClick={fetchGitHubUser} disabled={loading}>
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Plus className="size-4 mr-2" />
            )}
            Add
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-12 w-full max-w-7xl">
        {profiles.map((profile, index) => (
          <Profile key={`${profile.name}-${index}`} {...profile} />
        ))}
      </div>
    </div>
  );
}

export default App;

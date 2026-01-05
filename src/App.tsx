import { Profile } from "@/components/Profile";
import githubProfile from "@/assets/github_profile.jpg";

function App() {
  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-center p-4">
      <Profile
        name="Tanit Yodsirawong"
        role="Full Stack Developer"
        bio="Passionate about building beautiful and functional web applications using React, TypeScript, and Tailwind CSS."
        imageUrl={githubProfile}
      />
    </div>
  );
}

export default App;

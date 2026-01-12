import { useState, useEffect, useRef } from "react";
import { Profile } from "@/components/Profile";
import { ProfileSkeleton } from "@/components/ProfileSkeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import {
  Search,
  Plus,
  Github,
  Moon,
  Sun,
  AlertCircle,
  Trash2,
  UserPlus,
  Command as CommandIcon,
} from "lucide-react";
import githubProfile from "@/assets/github_profile.jpg";
import type { ProfileCardProps } from "@/components/ProfileCard";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

function App() {
  const [username, setUsername] = useState("");
  const [commandSearch, setCommandSearch] = useState("");
  const [mode, setMode] = useState<"root" | "github">("root");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light"
  );
  const mainSearchRef = useRef<HTMLInputElement>(null);

  // Reset command palette state when closed
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setMode("root");
        setCommandSearch("");
      }, 300); // Wait for animation to finish
    }
  }, [open]);

  const [profiles, setProfiles] = useState<ProfileCardProps[]>([
    {
      name: "Tanit Yodsirawong",
      role: "Full Stack Developer",
      bio: "Passionate about building beautiful and functional web applications using React, TypeScript, and Tailwind CSS.",
      imageUrl: githubProfile,
      followers: 42,
      following: 24,
      publicRepos: 12,
    },
  ]);

  // Persistent Dark Mode
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Command Palette Shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const clearProfiles = () => {
    setProfiles([]);
    toast.info("All profiles cleared");
  };

  const addSampleProfile = () => {
    const sample: ProfileCardProps = {
      name: "GitHub Copilot",
      role: "AI Assistant",
      bio: "I'm your AI pair programmer. I can help you write code, fix bugs, and learn new technologies.",
      imageUrl: "https://github.com/github.png",
      followers: 1000000,
      following: 0,
      publicRepos: 999,
    };
    setProfiles((prev) => [...prev, sample]);
    toast.success("Added sample profile");
  };

  const fetchGitHubUser = async (targetUsername?: string) => {
    const searchName = targetUsername || username;
    if (!searchName.trim()) {
      toast.error("Please enter a username");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.github.com/users/${searchName}`
      );
      if (!response.ok) {
        if (response.status === 404) throw new Error("❌ User not found");
        throw new Error("An error occurred");
      }
      const data = await response.json();

      const newProfile: ProfileCardProps = {
        name: data.name || data.login,
        role: "GitHub User",
        bio: data.bio || "No bio available",
        imageUrl: data.avatar_url,
        followers: data.followers,
        following: data.following,
        publicRepos: data.public_repos,
      };

      setProfiles((prev) => [...prev, newProfile]);
      if (!targetUsername) setUsername("");
      toast.success(`Added ${newProfile.name}'s profile!`);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen items-center p-8 pt-24 pb-24 gap-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      <Toaster position="top-center" richColors />

      {/* Command Palette Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder={
            mode === "root" ? "Type a command..." : "Search GitHub username..."
          }
          value={commandSearch}
          onValueChange={setCommandSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {mode === "root" && (
            <>
              <CommandGroup heading="Commands">
                <CommandItem
                  onSelect={() => {
                    setMode("github");
                    setCommandSearch("");
                  }}
                >
                  <Github className="mr-2 h-4 w-4" />
                  <span>Search GitHub</span>
                  <CommandShortcut>↵</CommandShortcut>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    toggleTheme();
                    setOpen(false);
                  }}
                >
                  {theme === "light" ? (
                    <Moon className="mr-2 h-4 w-4" />
                  ) : (
                    <Sun className="mr-2 h-4 w-4" />
                  )}
                  <span>
                    Toggle {theme === "light" ? "Dark" : "Light"} Mode
                  </span>
                  <CommandShortcut>⌘T</CommandShortcut>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    addSampleProfile();
                    setOpen(false);
                  }}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Add Sample Profile</span>
                </CommandItem>
                <CommandItem
                  onSelect={() => {
                    clearProfiles();
                    setOpen(false);
                  }}
                  className="text-destructive data-[selected=true]:bg-destructive/10 data-[selected=true]:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Clear All Profiles</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Navigation">
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                    setTimeout(() => mainSearchRef.current?.focus(), 100);
                  }}
                >
                  <Search className="mr-2 h-4 w-4" />
                  <span>Focus Main Search</span>
                  <CommandShortcut>⌘F</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </>
          )}

          {mode === "github" && (
            <CommandGroup heading="GitHub Search">
              <CommandItem
                onSelect={() => {
                  if (commandSearch.trim()) {
                    fetchGitHubUser(commandSearch);
                    setOpen(false);
                  }
                }}
              >
                <Github className="mr-2 h-4 w-4" />
                <span>
                  {commandSearch
                    ? `Search for "${commandSearch}"`
                    : "Type a username..."}
                </span>
                <CommandShortcut>↵</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setMode("root")}>
                <Search className="mr-2 h-4 w-4" />
                <span>Back to Commands</span>
                <CommandShortcut>Esc</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>

      {/* Theme Toggle & Command Hint */}
      <div className="fixed top-8 right-8 flex items-center gap-4">
        <p className="hidden md:flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
          <CommandIcon className="size-3" />
          <span>Press</span>
          <kbd className="font-sans font-semibold">⌘J</kbd>
          <span>for commands</span>
        </p>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full shadow-md bg-white dark:bg-slate-900"
        >
          {theme === "light" ? (
            <Moon className="size-5" />
          ) : (
            <Sun className="size-5" />
          )}
        </Button>
      </div>

      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary rounded-2xl shadow-lg shadow-primary/20">
            <Github className="size-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Profile Explorer
          </h1>
        </div>

        <div className="flex flex-col w-full gap-4">
          <div className="flex w-full gap-2 p-1 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                ref={mainSearchRef}
                placeholder="Search GitHub username..."
                className="pl-9 border-none shadow-none focus-visible:ring-0 h-11"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchGitHubUser()}
              />
            </div>
            <Button
              onClick={fetchGitHubUser}
              disabled={loading}
              className="h-11 px-6 rounded-lg font-semibold transition-all active:scale-95"
            >
              {loading ? (
                <Spinner className="size-4" />
              ) : (
                <>
                  <Plus className="size-4 mr-2" />
                  Add
                </>
              )}
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-lg animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="size-4" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-12 w-full max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700">
        {profiles.map((profile, index) => (
          <Profile key={`${profile.name}-${index}`} {...profile} />
        ))}

        {loading && <ProfileSkeleton />}
      </div>
    </div>
  );
}

export default App;

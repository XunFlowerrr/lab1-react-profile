import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Users,
  BookOpen,
  UserPlus,
  Code2,
  Plus,
  X,
  Search,
} from "lucide-react";
import { useState, useMemo } from "react";
import Iridescence from "./Iridescence";
import PrismaticBurst from "./PrismaticBurst";

export interface ProfileCardProps {
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
  followers?: number;
  following?: number;
  publicRepos?: number;
  initialSkills?: string[];
}

export function ProfileCard({
  name,
  role,
  bio,
  imageUrl,
  followers = 0,
  following = 0,
  publicRepos = 0,
  initialSkills = ["React", "TypeScript", "Tailwind"],
}: ProfileCardProps) {
  const [likesCount, setLikesCount] = useState(0);
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [newSkill, setNewSkill] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const randomColor = useMemo(() => {
    return [
      0.5 + Math.random() * 0.5,
      0.5 + Math.random() * 0.5,
      0.5 + Math.random() * 0.5,
    ] as [number, number, number];
  }, []);

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills((prev) => [...prev, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const deleteSkill = (skillToDelete: string) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillToDelete));
  };

  const filteredSkills = skills.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-[400px] shadow-2xl border-muted-foreground/20 overflow-hidden bg-card p-0 gap-0">
      <div className="relative overflow-hidden p-6">
        <div className="absolute inset-0 z-0">
          <Iridescence colors={randomColor} speed={0.3} />
        </div>
        <CardHeader className="relative flex flex-row items-center gap-4 text-white z-10 p-0">
          <Avatar className="size-16 border-2 border-white/30 shadow-sm">
            <AvatarImage src={imageUrl} alt={name} />
            <AvatarFallback className="bg-white/20 text-white backdrop-blur-sm">
              {name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <CardTitle className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
              {name}
            </CardTitle>
            <Badge
              variant="secondary"
              className="w-fit font-semibold bg-white/20 text-white border-none hover:bg-white/30 backdrop-blur-sm"
            >
              {role}
            </Badge>
          </div>
        </CardHeader>
      </div>
      <Separator />
      <CardContent className="p-6">
        <Tabs defaultValue="bio" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="bio">About</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          <TabsContent
            value="bio"
            className="min-h-[140px] max-h-[200px] overflow-y-auto pr-2"
          >
            <CardDescription className="text-base text-foreground leading-relaxed">
              {bio}
            </CardDescription>
          </TabsContent>

          <TabsContent value="stats" className="min-h-[140px]">
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="flex flex-col items-center gap-1">
                <Users className="size-4 text-muted-foreground" />
                <span className="text-lg font-bold">{followers}</span>
                <span className="text-[10px] uppercase text-muted-foreground font-medium">
                  Followers
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <UserPlus className="size-4 text-muted-foreground" />
                <span className="text-lg font-bold">{following}</span>
                <span className="text-[10px] uppercase text-muted-foreground font-medium">
                  Following
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <BookOpen className="size-4 text-muted-foreground" />
                <span className="text-lg font-bold">{publicRepos}</span>
                <span className="text-[10px] uppercase text-muted-foreground font-medium">
                  Repos
                </span>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="skills"
            className="min-h-[140px] max-h-[200px] flex flex-col gap-3"
          >
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
              <Input
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-7 pl-7 text-xs bg-muted/50 border-none focus-visible:ring-1"
              />
            </div>

            <div className="flex flex-wrap gap-2 overflow-y-auto pr-2 py-1">
              {filteredSkills.map((skill, index) => {
                const isReact = skill.toLowerCase().includes("react");
                return (
                  <Badge
                    key={`${skill}-${index}`}
                    variant={isReact ? "default" : "outline"}
                    className={`group relative px-3 py-1 transition-all duration-300 overflow-hidden ${
                      isReact
                        ? "font-bold border-none text-white shadow-lg scale-105"
                        : "bg-primary/5 border-primary/20 text-primary hover:bg-primary/10"
                    }`}
                  >
                    {isReact && (
                      <div className="absolute inset-0 -z-10">
                        <PrismaticBurst
                          animationType="rotate3d"
                          intensity={2}
                          speed={0.5}
                          distort={1.0}
                          rayCount={12}
                          colors={["#61dafb", "#00d8ff", "#ffffff"]}
                        />
                      </div>
                    )}
                    <div className="relative z-10 flex items-center">
                      <Code2
                        className={`size-3 mr-1 ${
                          isReact ? "animate-pulse" : ""
                        }`}
                      />
                      {skill}
                      <button
                        onClick={() => deleteSkill(skill)}
                        className={`ml-1.5 rounded-full p-0.5 transition-colors ${
                          isReact
                            ? "hover:bg-white/20 text-white/80 hover:text-white"
                            : "hover:bg-primary/20 text-primary/60 hover:text-primary"
                        }`}
                      >
                        <X className="size-2.5" />
                      </button>
                    </div>
                  </Badge>
                );
              })}
            </div>

            <div className="flex gap-2 mt-auto pt-2 border-t border-muted/50">
              <Input
                placeholder="Add new skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
                className="h-8 text-sm"
              />
              <Button
                size="sm"
                variant="secondary"
                onClick={addSkill}
                className="h-8"
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end bg-muted/30 py-3">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 hover:bg-destructive/10 hover:text-destructive transition-all active:scale-95"
          onClick={(e) => {
            e.stopPropagation();
            setLikesCount((prev) => prev + 1);
          }}
        >
          <Heart
            className={`size-4 transition-all ${
              likesCount > 0
                ? "fill-destructive text-destructive scale-110"
                : ""
            }`}
          />
          <span className="text-sm font-bold">
            {likesCount.toLocaleString()}
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}

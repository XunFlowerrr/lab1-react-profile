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
import { Heart, Users, BookOpen, UserPlus, Code2, Plus } from "lucide-react";
import { useState } from "react";

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

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills((prev) => [...prev, newSkill.trim()]);
      setNewSkill("");
    }
  };

  return (
    <Card className="w-[400px] shadow-2xl border-muted-foreground/20 overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="size-16 border-2 border-primary/10">
          <AvatarImage src={imageUrl} alt={name} />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            {name}
          </CardTitle>
          <Badge variant="secondary" className="w-fit font-semibold">
            {role}
          </Badge>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
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
            className="min-h-[140px] max-h-[200px] flex flex-col gap-4"
          >
            <div className="flex flex-wrap gap-2 overflow-y-auto pr-2">
              {skills.map((skill, index) => (
                <Badge
                  key={`${skill}-${index}`}
                  variant="outline"
                  className="bg-primary/5 border-primary/20 text-primary px-3 py-1"
                >
                  <Code2 className="size-3 mr-1" />
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 mt-auto pt-2">
              <Input
                placeholder="Add skill..."
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

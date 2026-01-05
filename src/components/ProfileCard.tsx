import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react";
import { useState } from "react";

export interface ProfileCardProps {
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
}

export function ProfileCard({ name, role, bio, imageUrl }: ProfileCardProps) {
  const [likesCount, setLikesCount] = useState(0);

  return (
    <Card className="w-[400px] shadow-2xl border-muted-foreground/20">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="size-16">
          <AvatarImage src={imageUrl} alt={name} />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <CardTitle className="text-2xl">{name}</CardTitle>
          <Badge variant="secondary" className="w-fit">
            {role}
          </Badge>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        <CardDescription className="text-base text-foreground">
          {bio}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 hover:bg-destructive/10 hover:text-destructive transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setLikesCount((prev) => prev + 1);
          }}
        >
          <Heart
            className={`size-4 ${
              likesCount > 0 ? "fill-destructive text-destructive" : ""
            }`}
          />
          <span className="text-sm font-medium">
            {likesCount.toLocaleString()}
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}

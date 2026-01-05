import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ProfileProps {
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
}

export function Profile({ name, role, bio, imageUrl }: ProfileProps) {
  return (
    <Card className="w-full max-w-md">
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
    </Card>
  );
}

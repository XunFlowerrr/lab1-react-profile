import TiltedCard from "@/components/TiltedCard";
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
    <TiltedCard
      imageSrc="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      altText={name}
      captionText={name}
      containerHeight="400px"
      containerWidth="100%"
      imageHeight="300px"
      imageWidth="400px"
      rotateAmplitude={12}
      scaleOnHover={1.05}
      showMobileWarning={false}
      showTooltip={false}
      displayOverlayContent={true}
      overlayContent={
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
        </Card>
      }
    />
  );
}

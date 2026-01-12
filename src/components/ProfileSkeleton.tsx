import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

export function ProfileSkeleton() {
  return (
    <Card className="w-[400px] h-[500px] shadow-2xl border-muted-foreground/20 overflow-hidden flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4">
        <Skeleton className="size-16 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardHeader>
      <div className="px-6">
        <Skeleton className="h-px w-full" />
      </div>
      <CardContent className="pt-6 flex-1 flex flex-col items-center justify-center gap-4">
        <Spinner className="size-8 text-primary" />
        <p className="text-sm text-muted-foreground font-medium animate-pulse">
          Fetching GitHub profile...
        </p>
      </CardContent>
      <CardFooter className="flex justify-end bg-muted/30 py-3">
        <Skeleton className="h-8 w-16" />
      </CardFooter>
    </Card>
  );
}

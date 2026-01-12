import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Loader2 } from "lucide-react";
import { fetchGithubRepos, type Project } from "@/lib/github";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRepos = async () => {
      try {
        const data = await fetchGithubRepos();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    getRepos();
  }, []);

  if (loading) {
    return (
      <div className="container px-4 py-12 mx-auto flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">
          Fetching GitHub repositories...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 py-12 mx-auto text-center">
        <h2 className="text-2xl font-bold text-destructive">Error</h2>
        <p className="text-muted-foreground">{error}</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="space-y-4 mb-12">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          Featured Projects
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A collection of projects fetched directly from GitHub. These represent
          my latest work and contributions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="h-48 bg-muted flex flex-col items-center justify-center border-b p-6 text-center">
              <Github className="w-12 h-12 mb-4 opacity-20" />
              <span className="text-muted-foreground font-mono text-sm break-all">
                {project.github}
              </span>
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-1">{project.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-wrap gap-2">
                {project.tags.length > 0 ? (
                  project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">
                    No tags available
                  </span>
                )}
              </div>
            </CardContent>
            <CardFooter className="gap-3 pt-6 border-t mt-auto">
              <Button variant="outline" size="sm" asChild className="flex-1">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" /> Code
                </a>
              </Button>
              {project.demo && (
                <Button size="sm" asChild className="flex-1">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" /> Demo
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Palette, Globe } from "lucide-react";
import githubProfile from "@/assets/github_profile.jpg";

const Home = () => {
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Hi, I'm{" "}
            <span className="text-primary tracking-tighter">
              Tanit Yodsirawong
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A passionate Full Stack Developer building beautiful, responsive,
            and functional web applications. I love turning complex problems
            into simple, elegant solutions.
          </p>
          <div className="flex flex-wrap gap-4 hover:scale-110 transition-all ease-in-out duration-300">
            <Button asChild size="lg">
              <Link to="/projects">
                View Projects <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>

          <div className="pt-8 grid grid-cols-3 gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <Code className="w-8 h-8 text-primary" />
              <span className="text-sm font-medium">Modern Tech</span>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2">
              <Palette className="w-8 h-8 text-primary" />
              <span className="text-sm font-medium">Clean Design</span>
            </div>
            <div className="flex flex-col items-center md:items-start gap-2">
              <Globe className="w-8 h-8 text-primary" />
              <span className="text-sm font-medium">Responsive</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative z-10 w-full aspect-square overflow-hidden rounded-2xl border-4 border-background shadow-2xl">
            <img
              src={githubProfile}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-4 -right-4 w-full h-full border-4 border-primary/20 rounded-2xl -z-10"></div>
          <div className="absolute -bottom-4 -left-4 w-full h-full border-4 border-primary/20 rounded-2xl -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;

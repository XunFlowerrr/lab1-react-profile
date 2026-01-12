import { useSearchParams } from "react-router-dom";
import { useTaskStore, type TaskStatus } from "@/store/taskStore";
import { useUserStore } from "@/store/userStore";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tasks = useTaskStore((state) => state.tasks);
  const assignTask = useTaskStore((state) => state.assignTask);
  const users = useUserStore((state) => state.users);

  const statusFilter = (searchParams.get("status") || "All") as
    | TaskStatus
    | "All";
  const queryFilter = searchParams.get("query") || "";

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;
    const matchesSearch =
      task.title.toLowerCase().includes(queryFilter.toLowerCase()) ||
      task.assignee.toLowerCase().includes(queryFilter.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleAssign = (taskId: string, nextUser: string) => {
    assignTask(taskId, nextUser);
    toast.success(`Task reassigned to ${nextUser}`);
  };

  const updateFilters = (updates: Record<string, string | undefined>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === "All" || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    setSearchParams(newParams);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Manage and track your project tasks.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <Tabs
          value={statusFilter}
          onValueChange={(value) => updateFilters({ status: value })}
          className="w-full md:w-auto"
        >
          <TabsList>
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Todo">Todo</TabsTrigger>
            <TabsTrigger value="Doing">Doing</TabsTrigger>
            <TabsTrigger value="Done">Done</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks or assignee..."
            className="pl-8"
            value={queryFilter}
            onChange={(e) => updateFilters({ query: e.target.value })}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map((task) => (
          <Card key={task.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <Badge
                  variant={
                    task.status === "Done"
                      ? "default"
                      : task.status === "Doing"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {task.status}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  ID: {task.id}
                </span>
              </div>
              <CardTitle className="mt-2">{task.title}</CardTitle>
              <CardDescription>Assigned to: {task.assignee}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-0">
              <Select
                value={task.assignee}
                onValueChange={(value) => handleAssign(task.id, value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Assign user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user} value={user}>
                      {user}
                    </SelectItem>
                  ))}
                  {users.length === 0 && (
                    <SelectItem value="none" disabled>
                      No users available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </CardFooter>
          </Card>
        ))}
        {filteredTasks.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No tasks found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
};

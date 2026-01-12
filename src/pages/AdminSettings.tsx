import { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Trash2,
  User as UserIcon,
  Users as UsersIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const AdminSettings = () => {
  const { users, addUser, deleteUser } = useUserStore();
  const [newUserName, setNewUserName] = useState("");

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim()) {
      toast.error("User name cannot be empty");
      return;
    }
    if (users.includes(newUserName.trim())) {
      toast.error("User already exists");
      return;
    }
    addUser(newUserName.trim());
    setNewUserName("");
    toast.success(`User "${newUserName}" added successfully`);
  };

  const handleDeleteUser = (name: string) => {
    deleteUser(name);
    toast.success(`User "${name}" deleted`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-red-600">
          Manage Users
        </h2>
        <p className="text-muted-foreground">
          Admin portal to manage system users and global settings.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UsersIcon size={20} />
              User Management
            </CardTitle>
            <CardDescription>
              Add or remove mock users for task assignment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddUser} className="flex gap-2 mb-6">
              <Input
                placeholder="New user name..."
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
              <Button type="submit" size="icon">
                <Plus size={18} />
              </Button>
            </form>

            <div className="space-y-2">
              {users.map((name) => (
                <div
                  key={name}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary rounded-full">
                      <UserIcon size={16} />
                    </div>
                    <span className="font-medium">{name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteUser(name)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
              {users.length === 0 && (
                <p className="text-center py-4 text-muted-foreground">
                  No users found.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-dashed flex flex-col justify-center items-center p-8 text-center opacity-70">
          <h3 className="text-lg font-semibold mb-2">
            More Settings Coming Soon
          </h3>
          <p className="text-sm text-muted-foreground">
            Future updates will include role management, system logs, and data
            exports.
          </p>
        </Card>
      </div>
    </div>
  );
};

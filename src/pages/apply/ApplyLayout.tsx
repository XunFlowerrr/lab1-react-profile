import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useJobFormStore } from "@/store/useJobFormStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Personal Info", path: "/apply/step-1" },
  { id: 2, title: "Experience", path: "/apply/step-2" },
  { id: 3, title: "Review", path: "/apply/step-3" },
];

export default function ApplyLayout() {
  const location = useLocation();
  const { isStep1Complete, isStep2Complete } = useJobFormStore();

  // Navigation Guard logic
  if (location.pathname === "/apply/step-2" && !isStep1Complete()) {
    return <Navigate to="/apply/step-1" replace />;
  }
  if (
    location.pathname === "/apply/step-3" &&
    (!isStep1Complete() || !isStep2Complete())
  ) {
    return <Navigate to="/apply/step-1" replace />;
  }

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center mb-6">
            Job Application Form
          </CardTitle>
          <div className="flex justify-between items-center px-4 mb-8">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="flex items-center flex-1 last:flex-none"
              >
                <div className="relative flex flex-col items-center">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                      location.pathname === step.path
                        ? "bg-primary border-primary text-primary-foreground font-bold"
                        : "bg-background border-muted-foreground text-muted-foreground"
                    )}
                  >
                    {step.id}
                  </div>
                  <span className="absolute -bottom-6 text-xs font-medium whitespace-nowrap">
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 bg-muted mx-4" />
                )}
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent className="mt-4">
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { useJobFormStore } from "@/store/useJobFormStore";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function Step3() {
  const navigate = useNavigate();
  const { personalInfo, experience, resetForm } = useJobFormStore();

  const handleSubmit = () => {
    toast.success("Application submitted successfully!");
    resetForm();
    navigate("/");
  };

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h3 className="font-semibold text-lg">Personal Information</h3>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <span className="text-muted-foreground">Full Name:</span>
          <span>
            {personalInfo.firstName} {personalInfo.lastName}
          </span>
          <span className="text-muted-foreground">Email:</span>
          <span>{personalInfo.email}</span>
          <span className="text-muted-foreground">Phone:</span>
          <span>{personalInfo.phone}</span>
        </div>
      </section>

      <Separator />

      <section className="space-y-3">
        <h3 className="font-semibold text-lg">Work Experience</h3>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <span className="text-muted-foreground">Company:</span>
          <span>{experience.company}</span>
          <span className="text-muted-foreground">Position:</span>
          <span>{experience.position}</span>
          <span className="text-muted-foreground">Duration:</span>
          <span>{experience.duration}</span>
        </div>
      </section>

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/apply/step-2")}
        >
          Back to Edit
        </Button>
        <Button onClick={handleSubmit}>Confirm & Submit</Button>
      </div>
    </div>
  );
}

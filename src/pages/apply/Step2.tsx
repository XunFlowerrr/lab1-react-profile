import { useNavigate } from "react-router-dom";
import { useJobFormStore } from "@/store/useJobFormStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Step2() {
  const navigate = useNavigate();
  const { experience, setExperience } = useJobFormStore();

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      company: formData.get("company") as string,
      position: formData.get("position") as string,
      duration: formData.get("duration") as string,
    };
    setExperience(data);
    navigate("/apply/step-3");
  };

  return (
    <form onSubmit={handleNext} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Company Name</label>
        <Input
          name="company"
          defaultValue={experience.company}
          required
          placeholder="Acme Corp"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Position</label>
        <Input
          name="position"
          defaultValue={experience.position}
          required
          placeholder="Frontend Developer"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Duration (e.g. 2 years)</label>
        <Input
          name="duration"
          defaultValue={experience.duration}
          required
          placeholder="2 years"
        />
      </div>
      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/apply/step-1")}
        >
          Previous
        </Button>
        <Button type="submit">Review Application</Button>
      </div>
    </form>
  );
}

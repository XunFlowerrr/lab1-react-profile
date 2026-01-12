import { useNavigate } from "react-router-dom";
import { useJobFormStore } from "@/store/useJobFormStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Step1() {
  const navigate = useNavigate();
  const { personalInfo, setPersonalInfo } = useJobFormStore();

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
    };
    setPersonalInfo(data);
    navigate("/apply/step-2");
  };

  return (
    <form onSubmit={handleNext} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">First Name</label>
          <Input
            name="firstName"
            defaultValue={personalInfo.firstName}
            required
            placeholder="John"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Last Name</label>
          <Input
            name="lastName"
            defaultValue={personalInfo.lastName}
            required
            placeholder="Doe"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input
          name="email"
          type="email"
          defaultValue={personalInfo.email}
          required
          placeholder="john.doe@example.com"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Phone Number</label>
        <Input
          name="phone"
          type="tel"
          defaultValue={personalInfo.phone}
          required
          placeholder="081-234-5678"
        />
      </div>
      <div className="flex justify-end pt-4">
        <Button type="submit">Next Step</Button>
      </div>
    </form>
  );
}

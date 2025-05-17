import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface IkigaiResponse {
  selected: string[];
  summary: string;
}

interface IkigaiData {
  love: IkigaiResponse;
  goodAt: IkigaiResponse;
  worldNeeds: IkigaiResponse;
  paidFor: IkigaiResponse;
}

const defaultOptions = {
  love: [
    "Working with technology",
    "Helping others",
    "Creative problem-solving",
    "Learning new things",
    "Teaching and mentoring",
  ],
  goodAt: [
    "Technical skills",
    "Communication",
    "Problem-solving",
    "Project management",
    "Team collaboration",
  ],
  worldNeeds: [
    "Better technology solutions",
    "Environmental sustainability",
    "Education and learning",
    "Healthcare improvements",
    "Social impact",
  ],
  paidFor: [
    "Technical expertise",
    "Management skills",
    "Creative services",
    "Consulting",
    "Specialized knowledge",
  ],
};

const steps = [
  { id: "love", title: "What do you love?" },
  { id: "goodAt", title: "What are you good at?" },
  { id: "worldNeeds", title: "What does the world need?" },
  { id: "paidFor", title: "What can you be paid for?" },
];

export default function IkigaiWizard({
  onSubmit,
}: {
  onSubmit: (data: IkigaiData) => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<IkigaiData>({
    love: { selected: [], summary: "" },
    goodAt: { selected: [], summary: "" },
    worldNeeds: { selected: [], summary: "" },
    paidFor: { selected: [], summary: "" },
  });

  const currentStepData = steps[currentStep];
  const currentCategory = currentStepData.id as keyof IkigaiData;

  const handleCheckboxChange = (option: string) => {
    setFormData((prev) => {
      const currentSelected = prev[currentCategory].selected;
      const newSelected = currentSelected.includes(option)
        ? currentSelected.filter((item) => item !== option)
        : [...currentSelected, option];

      return {
        ...prev,
        [currentCategory]: {
          ...prev[currentCategory],
          selected: newSelected,
        },
      };
    });
  };

  const handleSummaryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [currentCategory]: {
        ...prev[currentCategory],
        summary: value,
      },
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{currentStepData.title}</CardTitle>
        <Progress
          value={((currentStep + 1) / steps.length) * 100}
          className="mt-2"
        />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {defaultOptions[currentCategory].map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={option}
                checked={formData[currentCategory].selected.includes(option)}
                onCheckedChange={() => handleCheckboxChange(option)}
              />
              <label
                htmlFor={option}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option}
              </label>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Other things...
            </label>
            <Textarea
              placeholder="Add any other items..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              In your own words, summarize this category
            </label>
            <Textarea
              value={formData[currentCategory].summary}
              onChange={(e) => handleSummaryChange(e.target.value)}
              placeholder="Summarize your thoughts..."
              className="min-h-[150px]"
            />
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button onClick={handleSubmit}>Submit</Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

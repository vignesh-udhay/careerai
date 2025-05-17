import { useState } from "react";
import { useForm, Controller, ControllerRenderProps } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface IkigaiResponse {
  selected: string[];
  summary?: string;
}

interface IkigaiData {
  love: IkigaiResponse;
  goodAt: IkigaiResponse;
  worldNeeds: IkigaiResponse;
  paidFor: IkigaiResponse;
}

const formSchema = z.object({
  love: z.object({
    selected: z.array(z.string()),
    summary: z
      .string()
      .min(10, "Please provide a more detailed summary")
      .optional()
      .or(z.literal("")),
  }),
  goodAt: z.object({
    selected: z.array(z.string()),
    summary: z
      .string()
      .min(10, "Please provide a more detailed summary")
      .optional()
      .or(z.literal("")),
  }),
  worldNeeds: z.object({
    selected: z.array(z.string()),
    summary: z
      .string()
      .min(10, "Please provide a more detailed summary")
      .optional()
      .or(z.literal("")),
  }),
  paidFor: z.object({
    selected: z.array(z.string()),
    summary: z
      .string()
      .min(10, "Please provide a more detailed summary")
      .optional()
      .or(z.literal("")),
  }),
});

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

  const form = useForm<IkigaiData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      love: { selected: [], summary: "" },
      goodAt: { selected: [], summary: "" },
      worldNeeds: { selected: [], summary: "" },
      paidFor: { selected: [], summary: "" },
    },
  });

  const currentStepData = steps[currentStep];
  const currentCategory = currentStepData.id as keyof IkigaiData;

  const handleNext = async () => {
    const isValid = await form.trigger(currentCategory);
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onFormSubmit = (data: IkigaiData) => {
    // Ensure each category has the correct structure
    const formattedData: IkigaiData = {
      love: {
        selected: data.love.selected || [],
        summary: data.love.summary || "",
      },
      goodAt: {
        selected: data.goodAt.selected || [],
        summary: data.goodAt.summary || "",
      },
      worldNeeds: {
        selected: data.worldNeeds.selected || [],
        summary: data.worldNeeds.summary || "",
      },
      paidFor: {
        selected: data.paidFor.selected || [],
        summary: data.paidFor.summary || "",
      },
    };
    console.log(" formattedData:", formattedData);
    onSubmit(formattedData);
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
      <CardContent>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
          <div className="space-y-4">
            {defaultOptions[currentCategory].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Controller
                  name={`${currentCategory}.selected`}
                  control={form.control}
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<
                      IkigaiData,
                      `${typeof currentCategory}.selected`
                    >;
                  }) => (
                    <Checkbox
                      id={option}
                      checked={field.value.includes(option)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...field.value, option]
                          : field.value.filter(
                              (item: string) => item !== option
                            );
                        field.onChange(newValue);
                      }}
                    />
                  )}
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
              <Controller
                name={`${currentCategory}.summary`}
                control={form.control}
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    IkigaiData,
                    `${typeof currentCategory}.summary`
                  >;
                }) => (
                  <Textarea
                    {...field}
                    placeholder="Summarize your thoughts..."
                    className="min-h-[150px]"
                  />
                )}
              />
              {form.formState.errors[currentCategory]?.summary && (
                <p className="text-sm text-red-500">
                  {form.formState.errors[currentCategory]?.summary?.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button type="submit">Submit</Button>
            ) : (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

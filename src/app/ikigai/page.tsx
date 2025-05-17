"use client";

import axios from "axios";
import { useState } from "react";
import IkigaiWizard from "../components/IkigaiWizard";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { useIkigaiStore } from "@/store/ikigaiStore";
import { useChecklistStore } from "@/store/checklistStore";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function IkigaiPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setResult } = useIkigaiStore();
  const { updateChecklistStatus } = useChecklistStore();

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/summarize", formData);
      // Store the result using Zustand store
      setResult(res.data);

      // Update the checklist status using Zustand store
      updateChecklistStatus("Find your Ikigai", "Done");

      // Navigate to results page
      router.push("/ikigai/results");
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative">
      <Toaster position="top-center" expand={true} richColors closeButton />
      <div className="max-w-4xl mx-auto relative">
        <div className="relative min-h-screen">
          <div className="flex flex-col gap-4 z-10 pt-1.5">
            <div className="flex justify-end px-12">
              <Link href="/dashboard">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>

            <IkigaiWizard onSubmit={handleSubmit} onCategoryChange={() => {}} />
          </div>
        </div>
      </div>
    </main>
  );
}

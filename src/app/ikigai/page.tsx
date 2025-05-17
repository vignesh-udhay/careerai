"use client";

import axios from "axios";
import { useState } from "react";
import IkigaiWizard from "../components/IkigaiWizard";
import IkigaiCircles from "../components/IkigaiCircles";
import { motion } from "motion/react";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { useIkigaiStore } from "@/store/ikigaiStore";
import { useChecklistStore } from "@/store/checklistStore";

export default function IkigaiPage() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<
    "love" | "good" | "needs" | "paid" | null
  >(null);
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
      updateChecklistStatus("Answer Ikigai questions", "Done");

      // Navigate back to home page
      router.push("/");
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleStart = () => {
    setShowForm(true);
    setCurrentCategory("love");
  };

  return (
    <main className="min-h-screen relative">
      <Toaster position="top-center" expand={true} richColors closeButton />
      <div className="max-w-4xl mx-auto relative">
        <div className="relative min-h-screen">
          <div className="absolute inset-0 z-0">
            <IkigaiCircles
              onStart={handleStart}
              currentCategory={currentCategory}
            />
          </div>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative z-10 pt-1.5"
            >
              <IkigaiWizard
                onSubmit={handleSubmit}
                onCategoryChange={setCurrentCategory}
              />
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}

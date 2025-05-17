"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useIkigaiStore } from "@/store/ikigaiStore";
import { useChecklistStore } from "@/store/checklistStore";

export default function IkigaiResults() {
  const router = useRouter();
  const { checklist, updateChecklistStatus } = useChecklistStore();
  const { result, setResult, clearResult } = useIkigaiStore();

  useEffect(() => {
    if (!result) {
      // If no result is found, redirect to home
      router.push("/");
    } else {
      // Update the checklist status when results are displayed
      updateChecklistStatus("Review summary", "Done");
    }
  }, [result, router, updateChecklistStatus]);

  if (!result) {
    return null;
  }

  return (
    <main className="min-h-screen relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full px-12 py-8"
        >
          <div className="flex flex-row items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Your Ikigai Results</h1>
            <div className="flex gap-2">
              <Link href="/ikigai/explore">
                <Button>Explore Roles</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Summary</h2>
              <p className="text-gray-700">{result.summary}</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Sentiment</h2>
              <p className="text-gray-700">{result.sentiment}</p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Suggested Roles</h2>
              <ul className="list-disc list-inside space-y-1">
                {result.suggestions.map((role, index) => (
                  <li key={index} className="text-gray-700">
                    {role}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Key Themes</h2>
              <div className="flex flex-wrap gap-2">
                {result.themes.map((theme, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Suggested Paths</h2>
              <ul className="list-disc list-inside space-y-1">
                {result.paths.map((path, index) => (
                  <li key={index} className="text-gray-700">
                    {path}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

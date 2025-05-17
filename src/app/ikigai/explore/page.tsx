"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useIkigaiStore } from "@/store/ikigaiStore";
import { useChecklistStore } from "@/store/checklistStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExploreRoles() {
  const router = useRouter();
  const { checklist, updateChecklistStatus } = useChecklistStore();
  const { result } = useIkigaiStore();

  useEffect(() => {
    if (!result) {
      // If no result is found, redirect to home
      router.push("/dashboard");
    } else {
      // Update the checklist status when explore page is visited
      updateChecklistStatus("Explore roles", "Done");
    }
  }, [result, router, updateChecklistStatus]);

  if (!result) {
    return null;
  }

  const getLinkedInSearchUrl = (role: string) => {
    const encodedRole = encodeURIComponent(role);
    return `https://www.linkedin.com/jobs/search/?keywords=${encodedRole}`;
  };

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
            <h1 className="text-2xl font-bold">Explore Suggested Roles</h1>
            <div className="flex gap-2">
              <Link href="/ikigai/results">
                <Button variant="outline">Back to Results</Button>
              </Link>
              <Link href="/dashboard">
                <Button>Back to Home</Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-6">
            {result.suggestions.map((role, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{role}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <p className="text-gray-700">
                      Explore job opportunities for {role} on LinkedIn
                    </p>
                    <a
                      href={getLinkedInSearchUrl(role)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full">
                        Search {role} Jobs on LinkedIn
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}

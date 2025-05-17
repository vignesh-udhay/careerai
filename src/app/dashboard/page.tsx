"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Toaster } from "sonner";
import Link from "next/link";
import { useChecklistStore } from "@/store/checklistStore";
import { useIkigaiStore } from "@/store/ikigaiStore";
import LogoutButton from "@/components/auth/LogoutButton";

export default function Dashboard() {
  const { checklist, updateChecklistStatus } = useChecklistStore();
  const { result } = useIkigaiStore();

  useEffect(() => {
    // Update checklist status if ikigai result exists
    if (result) {
      updateChecklistStatus("Find your Ikigai", "Done");
    }
  }, [result, updateChecklistStatus]);

  return (
    <main className="min-h-screen relative">
      <Toaster position="top-center" expand={true} richColors closeButton />
      <div className="max-w-4xl mx-auto relative py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full px-12">
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold">Your Career Journey</h1>
              <LogoutButton />
            </div>
            <div>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Checklist</h2>
                <ul className="space-y-2">
                  {checklist.map((item) => (
                    <li
                      key={item.task}
                      className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium">{item.task}</span>
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-sm px-2 py-1 rounded ${
                            item.status === "Done"
                              ? "bg-green-200 text-green-800"
                              : "bg-yellow-200 text-yellow-800"
                          }`}
                        >
                          {item.status}
                        </span>
                        {item.link !== "#" && (
                          <Link
                            href={item.link}
                            className={
                              (item.task === "Review summary" &&
                                checklist.find(
                                  (t) => t.task === "Find your Ikigai"
                                )?.status !== "Done") ||
                              (item.task === "Explore roles" && !result)
                                ? "pointer-events-none"
                                : ""
                            }
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={
                                (item.task === "Review summary" &&
                                  checklist.find(
                                    (t) => t.task === "Find your Ikigai"
                                  )?.status !== "Done") ||
                                (item.task === "Explore roles" && !result)
                              }
                            >
                              {item.status === "Done" ? "View" : "Start"}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

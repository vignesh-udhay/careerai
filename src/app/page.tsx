"use client";

import axios from "axios";
import { useState } from "react";
import IkigaiWizard from "./components/IkigaiWizard";

export default function Home() {
  const [checklist, setChecklist] = useState([
    { task: "Answer Ikigai questions", status: "Not Started" },
    { task: "Review summary", status: "Not Started" },
    { task: "Explore roles", status: "Not Started" },
  ]);
  const [result, setResult] = useState<{
    summary: string;
    sentiment: string;
    suggestions: string[];
    themes: string[];
    paths: string[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    try {
      // Send the complete data structure
      const res = await axios.post("/api/summarize", formData);
      setResult(res.data);
      setChecklist((prev) =>
        prev.map((item) =>
          item.task === "Answer Ikigai questions"
            ? { ...item, status: "Done" }
            : item
        )
      );
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <IkigaiWizard onSubmit={handleSubmit} />

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Checklist</h2>
          <ul className="mb-4">
            {checklist.map((item) => (
              <li
                key={item.task}
                className="flex items-center justify-between py-1"
              >
                <span>{item.task}</span>
                <span
                  className={`text-sm px-2 py-1 rounded ${
                    item.status === "Done" ? "bg-green-200" : "bg-yellow-200"
                  }`}
                >
                  {item.status}
                </span>
              </li>
            ))}
          </ul>

          {result && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">AI Summary</h2>
              <div className="space-y-2">
                <p>
                  <strong>Summary:</strong> {result.summary}
                </p>
                <p>
                  <strong>Sentiment:</strong> {result.sentiment}
                </p>
                <div>
                  <strong>Suggested Roles:</strong>
                  <ul className="list-disc list-inside">
                    {result.suggestions.map((role, index) => (
                      <li key={index}>{role}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Key Themes:</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {result.themes.map((theme, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>Suggested Paths:</strong>
                  <ul className="list-disc list-inside">
                    {result.paths.map((path, index) => (
                      <li key={index}>{path}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

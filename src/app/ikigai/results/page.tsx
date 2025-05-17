"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useIkigaiStore } from "@/store/ikigaiStore";
import { useChecklistStore } from "@/store/checklistStore";
import { jsPDF } from "jspdf";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";

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

  const exportAsPDF = () => {
    if (!result) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = 20;
    const lineHeight = 7;
    const sectionGap = 15;

    // Title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Your Ikigai Results", pageWidth / 2, yPos, { align: "center" });
    yPos += lineHeight * 2;

    // Summary Section
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Summary", margin, yPos);
    yPos += lineHeight;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const summaryLines = doc.splitTextToSize(
      result.summary,
      pageWidth - margin * 2
    );
    doc.text(summaryLines, margin, yPos);
    yPos += summaryLines.length * lineHeight + sectionGap;

    // Sentiment Section
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Sentiment", margin, yPos);
    yPos += lineHeight;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(result.sentiment, margin, yPos);
    yPos += lineHeight + sectionGap;

    // Suggested Roles Section
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Suggested Roles", margin, yPos);
    yPos += lineHeight;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    result.suggestions.forEach((role, index) => {
      doc.text(`• ${role}`, margin, yPos);
      yPos += lineHeight;
    });
    yPos += sectionGap;

    // Key Themes Section
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Key Themes", margin, yPos);
    yPos += lineHeight;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const themesText = result.themes.join(" • ");
    const themesLines = doc.splitTextToSize(themesText, pageWidth - margin * 2);
    doc.text(themesLines, margin, yPos);
    yPos += themesLines.length * lineHeight + sectionGap;

    // Suggested Paths Section
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Suggested Paths", margin, yPos);
    yPos += lineHeight;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    result.paths.forEach((path, index) => {
      const pathLines = doc.splitTextToSize(
        `• ${path}`,
        pageWidth - margin * 2
      );
      doc.text(pathLines, margin, yPos);
      yPos += pathLines.length * lineHeight;
    });

    // Add page numbers
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageWidth - margin,
        doc.internal.pageSize.getHeight() - 10,
        { align: "right" }
      );
    }

    doc.save("ikigai-results.pdf");
  };

  const exportAsMarkdown = () => {
    if (!result) return;

    const content = `
# Your Ikigai Results

## Summary
${result.summary}

## Sentiment
${result.sentiment}

## Suggested Roles
${result.suggestions.map((role) => `- ${role}`).join("\n")}

## Key Themes
${result.themes.map((theme) => `- ${theme}`).join("\n")}

## Suggested Paths
${result.paths.map((path) => `- ${path}`).join("\n")}
    `;

    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ikigai-results.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copySummary = () => {
    if (!result) return;

    const content = `Your Ikigai Results

Summary
${result.summary}

Sentiment
${result.sentiment}

Suggested Roles
${result.suggestions.map((role) => `• ${role}`).join("\n")}

Key Themes
${result.themes.map((theme) => `• ${theme}`).join("\n")}

Suggested Paths
${result.paths.map((path) => `• ${path}`).join("\n")}`;

    navigator.clipboard.writeText(content);
  };

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={exportAsPDF}>
                    📝 PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={exportAsMarkdown}>
                    📄 Markdown
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={copySummary}>
                    📋 Copy Summary
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

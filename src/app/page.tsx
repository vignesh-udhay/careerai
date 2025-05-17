"use client";

import AuthForm from "@/components/auth/AuthForm";
import { motion } from "motion/react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">CareerAI</h1>
          <p className="text-gray-600 text-lg">
            Discover your career path with AI-powered insights
          </p>
        </motion.div>
        <AuthForm />
      </div>
    </main>
  );
}

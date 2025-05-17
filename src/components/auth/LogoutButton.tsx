"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast.success("Logged out successfully");
      router.refresh();
      router.push("/");
    } catch (error: any) {
      toast.error("Error logging out: " + error.message);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      className="text-red-600 hover:text-red-700 hover:bg-red-50"
    >
      Logout
    </Button>
  );
}

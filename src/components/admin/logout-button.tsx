"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin-auth", { method: "DELETE" });
    router.push("/admin");
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "gap-2"
      )}
    >
      <LogOut className="size-4" />
      Keluar
    </button>
  );
}

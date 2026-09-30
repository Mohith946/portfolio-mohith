"use client";

import { profile } from "@/data/portfolio";
import { toast } from "@/components/ui/Toaster";

export async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email);
    toast("Email copied to clipboard");
  } catch {
    toast(profile.email);
  }
}

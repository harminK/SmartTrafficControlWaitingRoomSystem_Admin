"use server";

import { BACKEND_URL } from "@/config/config";
import { unbanResponse } from "@/types";
import { revalidateTag } from "next/cache";

export async function clearQueueAction(): Promise<unbanResponse | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/user/clear-queue`, {
      method: "POST",
      credentials: "include",
      next: { tags: ["user-status"] },
      cache: "force-cache",
    });
    revalidateTag("user-status", "max");
    revalidateTag("logs", "max");
    return await res.json();
  } catch (error) {
    console.error("Failed to clear queue:", error);
    return null;
  }
}

export async function unbanUserAction(): Promise<unbanResponse | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/user/unban-all`, {
      method: "POST",
      credentials: "include",
      next: { tags: ["user-status"] },
      cache: "force-cache",
    });
    revalidateTag("user-status", "max");
    revalidateTag("logs", "max");
    return await res.json();
  } catch (error) {
    console.error("Failed to unban users:", error);
    return null;
  }
}

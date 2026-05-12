"use client";

import { Button } from "@/components/ui/button";
import { clearQueueAction, unbanUserAction } from "@/actions";

export function AdminActions() {
  const handleClearQueue = async () => {
    await clearQueueAction();
  };

  const handleUnbanUser = async () => {
    await unbanUserAction();
  };

  return (
    <div className="flex gap-4">
      <Button
        onClick={handleClearQueue}
        className="cursor-pointer"
        variant="outline"
      >
        Clear Queue
      </Button>
      <Button
        onClick={handleUnbanUser}
        className="cursor-pointer"
        variant="outline"
      >
        Unban All Users
      </Button>
    </div>
  );
}

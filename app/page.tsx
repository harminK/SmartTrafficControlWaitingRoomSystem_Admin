import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BACKEND_URL } from "@/config/config";
import { logEntry, logEntryType, userStatus, userStatusType } from "@/types";
import { cache } from "react";
import { AdminActions } from "./admin-actions";
import { LogsTable } from "./logs-table";

const getServerStatus = cache(async (): Promise<userStatusType> => {
  try {
    const res = await fetch(`${BACKEND_URL}/user/status`, {
      method: "GET",
      credentials: "include",
      next: { tags: ["user-status"] },
      cache: "force-cache",
    });
    const data: userStatus = await res.json();

    console.log("Fetched user status:", data);

    return (
      data.responseData || {
        blockedUsers: 0,
        queueSize: 0,
        serverLoad: 0,
        totalRequests: 0,
      }
    );
  } catch (err) {
    console.error("Failed to fetch user status:", err);
    return {
      blockedUsers: 0,
      queueSize: 0,
      serverLoad: 0,
      totalRequests: 0,
    };
  }
});

const getLogs = cache(async (): Promise<logEntryType[]> => {
  try {
    const res = await fetch(`${BACKEND_URL}/user/logs`, {
      method: "GET",
      credentials: "include",
      next: { tags: ["logs"] },
      cache: "force-cache",
    });
    const data: logEntry = await res.json();
    return data.responseData || [];
  } catch (err) {
    console.error("Failed to fetch logs:", err);
    return [];
  }
});

export default async function Home() {
  const [total, logs] = await Promise.all([getServerStatus(), getLogs()]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Status Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Total Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{total.totalRequests}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Queue Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{total.queueSize}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Blocked Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{total.blockedUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Server Load</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{total.serverLoad}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mb-8">
          <AdminActions />
        </div>

        {/* Logs Table with Pagination */}
        <Card>
          <CardHeader>
            <CardTitle>Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <LogsTable logs={logs} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
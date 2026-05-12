export type userStatus = {
  status: "SUCCESS" | "ERROR";
  message?: string;
  responseData?: {
    totalRequests: number;
    queueSize: number;
    blockedUsers: number;
    serverLoad: number;
  };
  statusCode: number;
};

export type logEntry = {
  status: "SUCCESS" | "ERROR";
  message?: string;
  responseData?: logEntryType[];
  statusCode: number;
};

export type unbanResponse = {
  status: "SUCCESS" | "ERROR";
  message?: string;
  statusCode: number;
};

export type userStatusType = {
  totalRequests: number;
  queueSize: number;
  blockedUsers: number;
  serverLoad: number;
};

export type logEntryType = {
  ip: string;
  method: string;
  time: string;
  url: string;
};

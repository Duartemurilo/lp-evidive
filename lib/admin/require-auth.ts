import { auth } from "@clerk/nextjs/server";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: Record<string, string>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function requireAuthUserId(): Promise<string> {
  const { userId } = await auth();
  if (!userId) {
    throw new ApiError("Não autorizado.", 401);
  }
  return userId;
}

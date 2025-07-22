import z from "zod";

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["PENDING", "COMPLETED", "IN_PROGRESS"]),
});

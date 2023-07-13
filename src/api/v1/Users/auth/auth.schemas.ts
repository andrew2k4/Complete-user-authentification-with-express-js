import { TypeOf, object, string } from "zod";

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email or password"),
    password: string({
      required_error: "password is required",
    }).min(6, "Invalid email or password"),
  }).strict(),
});

export type createSessionInput = TypeOf<typeof createSessionSchema>["body"];

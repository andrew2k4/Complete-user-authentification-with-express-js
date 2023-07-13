import { TypeOf, object, string } from "zod";

export const getOneProductSchema = object({
  params: object({
    id: string({ required_error: "Id is required" }).cuid("Not valid id"),
  }),
}).strict();

export type getOneProductInput = TypeOf<typeof getOneProductSchema>["params"];

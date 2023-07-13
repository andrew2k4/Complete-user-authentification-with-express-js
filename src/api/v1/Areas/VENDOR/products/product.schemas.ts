import { TypeOf, number, object, string, z } from "zod";

export const createProductSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    price: number({
      required_error: "Price is required",
    }),
    coverImage: string({
      required_error: "CoverImage is required",
    }),
    description: string({
      required_error: "Description is required",
    }).min(10, "description is too short"),
    state: z.enum(
      [
        "NEWWITHTAG",
        "NEWWITHOUTTAG",
        "VERYGOODSTATE",
        "GOODSTATE",
        "SATISFYING",
      ],
      {
        required_error: "State is required",
        invalid_type_error:
          "state must to be  NEWWITHTAG oder NEWWITHOUTTAG other VERYGOODSTATE other GOODSTATE other SATISFYING",
      }
    ),
    color: string({
      required_error: "Color is required",
    }),
    brand: string({
      required_error: "Brand is required",
    }),
    matter: string({
      required_error: "Matter is required",
    }),
  }).strict(),
});

export type createProductInput = TypeOf<typeof createProductSchema>["body"];

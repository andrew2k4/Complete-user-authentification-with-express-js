import { TypeOf, coerce, object, string, number } from "zod";

export const createCustomerSchema = object({
  body: object({
    email: string({
      required_error: "Email is Required",
    }).email("Not a valid email"),
    password: string({
      required_error: "Password is required",
    }).min(8, "Password too short - should be 6 chars minimum"),
    passwordConfirmation: string({
      required_error: "Password is required",
    }),
    firstName: string({
      required_error: "Name is required",
    }),
    lastName: string({
      required_error: "Name is required",
    }),
    birthDate: coerce.date({
      required_error: "Name is required",
      invalid_type_error: "birthDate invalid",
    }),
  })
    .strict()
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "password do not match",
      path: ["passwordConfirmation"],
    }),
});

export const createVendorSchema = object({
  body: object({
    email: string({
      required_error: "Email is Required",
    }).email("Not a valid email"),
    password: string({
      required_error: "Password is required",
    }).min(8, "Password too short - should be 6 chars minimum"),
    passwordConfirmation: string({
      required_error: "Password is required",
    }),
    firstName: string({
      required_error: "Name is required",
    }),
    lastName: string({
      required_error: "Name is required",
    }),
    birthDate: coerce.date({
      required_error: "Name is required",
      invalid_type_error: "birthDate invalid",
    }),
    cniImage: string({
      required_error: "Cni image is required",
    }),
    image: string({
      required_error: "Image is required",
    }),
    phoneNumber: number({
      required_error: "Phone number is required",
    }),
  })
    .strict()
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "password do not match",
      path: ["passwordConfirmation"],
    })
    .refine(
      (data) =>
        data.phoneNumber.toString().length === 9 &&
        data.phoneNumber.toString()[0] === "6",
      {
        message: "Invalid phone number",
        path: ["phoneNumber"],
      }
    ),
});

export const verifyUserSchema = object({
  params: object({
    email: string().email(),
    verificationCode: string().uuid(),
  }).strict(),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not valid email"),
  }).strict(),
});

export const resetPasswordSchema = object({
  params: object({
    email: string().email(),
    passwordResetCode: string(),
  }).strict(),
  body: object({
    password: string({
      required_error: "Password is required",
    }).min(8, "Password too short - should be 6 chars minimum"),
    passwordConfirmation: string({
      required_error: "Password is required",
    }),
  })
    .strict()
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "password do not match",
      path: ["passwordConfirmation"],
    }),
});

export type createCustomerInput = TypeOf<typeof createCustomerSchema>["body"];
export type createVendorInput = TypeOf<typeof createVendorSchema>["body"];
export type verifyUserInput = TypeOf<typeof verifyUserSchema>["params"];
export type forgotPassswordInput = TypeOf<typeof forgotPasswordSchema>["body"];
export type resetPasswordInput = TypeOf<typeof resetPasswordSchema>;

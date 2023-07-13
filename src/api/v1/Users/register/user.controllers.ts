import { Request, Response } from "express";
import { nanoid } from "nanoid";
// Schema import
import {
  createCustomerInput,
  createVendorInput,
  forgotPassswordInput,
  resetPasswordInput,
  verifyUserInput,
} from "./user.schemas";

// Services import
import {
  createCustomer,
  createVendor,
  findUserByEmail,
  forgotUserPassword,
  resetUserPassword,
  verifyUser,
} from "./user.services";
import { sendEmail } from "../../../../utils/mailer";

// Create a new user
export async function createCustomerHandler(
  req: Request<
    object,
    object,
    Omit<createCustomerInput, "passwordConfirmation">
  >,
  res: Response
) {
  try {
    const body = req.body;
    Reflect.deleteProperty(req.body, "passwordConfirmation");

    const user = await createCustomer(body); //call create user service
    await sendEmail({
      from: "test@example/com",
      to: user.email,
      subject: "please verify your account",
      text: `http://localhost:3000/api/v1/users/verify/${user.email}/${user.verificationCode}`,
    });
    return res.status(201).send("User successfully created");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.code === "P2002") {
      return res.status(409).send("user already exist");
    }
    console.log(e);
    return res.sendStatus(500);
  }
}

export async function createVendorHandler(
  req: Request<object, object, Omit<createVendorInput, "passwordConfirmation">>,
  res: Response
) {
  try {
    const body = req.body;

    Reflect.deleteProperty(body, "passwordConfirmation");
    const user = await createVendor(body);

    await sendEmail({
      from: "test@example/com",
      to: user.email,
      subject: "please verify your account",
      text: `http://localhost:3000/api/v1/users/verify/${user.email}/${user.verificationCode}`,
    });
    return res.send("User successfully created");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.code === "P2002") {
      return res.status(409).send("user already exist");
    }
    console.log(e);
    return res.sendStatus(500);
  }
}

export async function verifyUserHandler(
  req: Request<verifyUserInput>,
  res: Response
) {
  try {
    const email = req.params.email;
    const verificationCode = req.params.verificationCode;

    //find the user by id
    const user = await findUserByEmail(email);

    if (!user) {
      return res.send("could not verify user");
    }
    //check to see if they are already verified

    if (user.verified) {
      return res.send("User is already verified");
    }

    //check to see if the verificationCode matches
    if (user.verificationCode === verificationCode) {
      await verifyUser(email);
      return res.send("User successfully verified");
    }

    return res.send("could not verify user");
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

export async function forgotPasswordHandler(
  req: Request<object, object, forgotPassswordInput>,
  res: Response
) {
  try {
    const message =
      "If a user with that email is registered you will receive a password reset email";
    const { email } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      console.log(`User with email ${email} does not exist`);
      return res.send(message);
    }

    const passwordResetCode = nanoid();

    await forgotUserPassword(email, passwordResetCode);

    await sendEmail({
      to: user.email,
      from: "test@exemple.com",
      subject: "Reset your password",
      text: `password reset code : ${passwordResetCode}`,
    });

    console.log(`password reset email send to ${email}`);
    return res.send(message);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

export async function resetPasswordHandler(
  req: Request<
    resetPasswordInput["params"],
    object,
    resetPasswordInput["body"]
  >,
  res: Response
) {
  try {
    const { email, passwordResetCode } = req.params;
    const { password } = req.body;

    const user = await findUserByEmail(email);

    if (
      !user ||
      !user.passwordResetCode ||
      user.passwordResetCode !== passwordResetCode
    ) {
      return res.status(400).send("Could not reset user password");
    }

    await resetUserPassword(email, password);

    return res.send("Succesfull updated userPassword");
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  try {
    return res.send(res.locals.user);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

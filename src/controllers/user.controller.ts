import { Request, Response } from "express";
import { omit } from "lodash";

import { createUser } from "../services/user.service";
import { createUserInput } from "../schema/user.schema";

export async function createUserHandler(
  req: Request<{}, {}, Omit<createUserInput["body"], "passwordConfirmation">>,
  res: Response
) {
  try {
    Reflect.deleteProperty(req.body, "passwordConfirmation");
    const user = await createUser(req.body); //call create user service
    return res.send(omit(user, "password"));
  } catch (e: any) {
    console.log(e);
    return res.status(40);
  }
}

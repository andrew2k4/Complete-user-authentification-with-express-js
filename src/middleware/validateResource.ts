import { Request, Response, NextFunction } from "express";

import { AnyZodObject } from "zod";
const validateResource =
  (Schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      Schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      return res.status(400).send(e.errors);
    }
  };

export default validateResource;

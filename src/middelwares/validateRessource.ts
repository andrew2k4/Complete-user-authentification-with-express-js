import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
const validateRessource =
  (Schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      Schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (e: any) {
      return res.status(400).send(e.errors);
    }
  };

export default validateRessource;

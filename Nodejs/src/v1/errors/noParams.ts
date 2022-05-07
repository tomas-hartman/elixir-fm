import { RequestHandler } from "express";
import { RequestError } from "../../types";

export const handleNoParams: RequestHandler = (req, res) => {
  const {data} = req.params;

  if(!data) {
    const error: RequestError = {
      status: res.statusCode,
      reason: "API params missing."
    }

    res.status(400);
    res.json(error);
  }
}
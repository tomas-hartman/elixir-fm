import { exec } from "child_process";
import { RequestHandler } from "express";
import { LookupEntity, RequestError } from "../../types";
import { sanitize } from "../../utils/helpers/sanitize";

import { parseLookup } from "../../utils/parsers/parseLookup";

export const root: RequestHandler = (req, res) => {
  const {query} = req.params;

  if(!query) {
    const error: RequestError = {
      status: res.statusCode,
      reason: res.statusMessage
    }

    res.status(404);
    res.json(error)
  }

  const sanitized = sanitize(query);

  exec(`echo "${sanitized}" | elixir lookup`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    if(stderr) console.error(`stderr: ${stderr}`);

    if(sanitized.split(" ").length > 1) {
      console.error("Root request must contain exactly one token.")

      res.status(400);
      res.json({
        status: res.statusCode,
        reason: "Root request must contain exactly one token."
      });

      return;
    }

    const lookupRes = parseLookup(stdout);
    const roots = lookupRes[0].output.map((item: LookupEntity) => item.root);
    const uniqueRoots = Array.from(new Set(roots));

    res.json({
      status: res.statusCode,
      result: uniqueRoots
    })
  });
}
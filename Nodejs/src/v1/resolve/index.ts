import { exec } from "child_process";
import { RequestHandler } from "express";
import { RequestError } from "../../types";
import { sanitize } from "../../utils/helpers/sanitize";

import { parseResolve } from "../../utils/parsers/parseResolve";


export const resolve: RequestHandler = (req, res) => {
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

  exec(`echo "${sanitized}" | elixir resolve`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    // console.log(`stdout: ${stdout}`);
    if(stderr) console.error(`stderr: ${stderr}`);

    res.json({
      status: res.statusCode,
      result: parseResolve(stdout)
    })
  });
}
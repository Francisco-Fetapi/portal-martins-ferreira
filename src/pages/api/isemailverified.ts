import { NextApiRequest, NextApiResponse } from "next";

export default function isEmailVerified(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.confirmationCode == "12345") {
    return res.send({ status: "success" });
  } else {
    return res.send({ status: "error" });
  }
}

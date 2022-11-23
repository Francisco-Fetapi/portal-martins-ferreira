import { NextApiRequest, NextApiResponse } from "next";
import { strapi } from "../../api/strapi";

interface IConfirmationEmail {
  status: "success";
  code: string;
}

export default async function isEmailVerified(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const query = req.query;
    const { data } = await strapi.post<IConfirmationEmail>("/confirm-email", {
      email: query.email,
    });
    console.log(query.email, data.code);
    if (query.confirmationCode == data.code) {
      return res.send({ status: "success" });
    } else {
      return res.send({ status: "error" });
    }
  } catch (e: any) {
    return res.send({
      status: "error",
      message:
        "Houve um erro ao enviar o email de confirmação, por favor tente mais tarde.",
    });
  }
}

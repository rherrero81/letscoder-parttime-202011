import { Request, Response } from "express";
import { getTemplate } from "./TemplatesController";
import { checkSearchParams } from "../../middleware/checks";
export default [
  {
    path: "/api/v1/template",
    method: "get",
    handler: [
      checkSearchParams,
      async ({ query }: Request, res: Response) => {
          var qquery:any=query;
        const result = await  getTemplate(qquery.q,'');
        res.status(200).send(result);
      }
    ]
  }
];
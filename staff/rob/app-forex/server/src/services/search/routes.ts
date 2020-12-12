import { Request, Response } from "express";
import { getPlacesByName } from "./SearchController";
import { checkSearchParams } from "../../middleware/checks";
export default [
  {
    path: "/api/v1/search",
    method: "get",
    handler: [
      checkSearchParams,
      async ({ query }: Request, res: Response) => {
          var qquery:any=query;
        const result = await getPlacesByName(qquery.q);
        res.status(200).send(result);
      }
    ]
  }
];
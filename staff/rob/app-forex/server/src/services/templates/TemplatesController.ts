import { getTemp } from "./providers/TemplatesDataProvider";

export const getTemplate = async (q: string,u: string) => {
 /*  if (q.length < 3) {
    return {
      type: "FeatureCollection",
      features: []
    };
  } */

  return await getTemp(q,u);
};
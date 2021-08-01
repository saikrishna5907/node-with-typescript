import { HttpContent, HttpResponseMessage } from "inversify-express-utils";

export function customHttpResponse<T extends HttpContent>(response: T): HttpResponseMessage {
  const res = new HttpResponseMessage();
  res.content = response;
  return res;
};
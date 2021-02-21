import { TAG_PARSE_ONKEYDOWN, TAG_PARSE_ONKEYUP } from "./types";

export const tagParserOnKeyDown = (e = {}) => ({
  type: TAG_PARSE_ONKEYDOWN,
  payload: { e: e },
});

export const tagParserOnKeyUp = (e = {}, clearAction = "none") => ({
  type: TAG_PARSE_ONKEYUP,
  payload: { e: e, clearAction: clearAction },
});

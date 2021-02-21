import { TAG_PARSE_ONKEYDOWN, TAG_PARSE_ONKEYUP, TAG_SEARCH } from "../types";

const initialState = {
  tags: [],
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case TAG_SEARCH: {
      return state;
    }
    case TAG_PARSE_ONKEYDOWN: {
      const { e } = action.payload;
      let queryReturn = [];
      if (e.key === "Space" || e.key === 32 || e.key === " ") {
        const val = e.target.value.match(/[^ -][^ ]*/g);
        if (val !== null && val !== undefined && val !== "" && val !== " ") {
          queryReturn = val;
          console.log(queryReturn);
        }
      }
      const newState = [...new Set(state.tags.concat(queryReturn))];
      return { ...state, tags: newState };
    }
    case TAG_PARSE_ONKEYUP: {
      const { e, clearAction } = action.payload;
      if (e.key === "Space" || e.key === 32 || e.key === " ") {
        e.target.value = "";
      }
      if (clearAction === "clear") {
        e.target.value = "";
      }
      return { ...state };
    }
    default: {
      return state;
    }
  }
}

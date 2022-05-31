import { TOKEN } from "@/store/constant/index";
import { getToken } from "@/utils/auth";

const initialState = { token: getToken() || "" };

const user = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case TOKEN:
      return {
        ...state,
        token: data,
      };

    default:
      return state;
  }
};
export default user;

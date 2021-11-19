import api from "@/api";
import { getInstance } from "@/auth";
import { authGuard } from "@/auth/authGuard";

function pipeline(to, from, final, guards) {
  let idx = -1;
  let nxt = (args) => {
    if (typeof args !== "undefined") return final(args);
    if (idx === guards.length - 1) return final();
    idx++;
    return guards[idx](to, from, nxt);
  };
  return nxt();
}

export default {
  pipeline,
  authGuard,
};

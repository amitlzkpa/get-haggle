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

async function dealEditGuard(to, from, next) {
  const authService = getInstance();
  let p = await api.get(`/api/deals/id/${to.params.id}`);
  if (p.data.user === authService.dbUser._id) return next();
  else return next({ path: "/404" });
}

export default {
  pipeline,
  authGuard,
  dealEditGuard,
};

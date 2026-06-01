import { domainState as domain1 } from "../first-domain/state.js";
import { domainState as domain2 } from "../second-domain/state.js";
import { domainState as domain3 } from "../third-domain/state.js";

export function getDomainCouplingVector() {
  const domains = [domain1, domain2, domain3].filter(Boolean);

  let total = 0;
  let count = 0;

  for (const d of domains) {
    for (const n of d.nodes) {
      total += (n.resonance || 0) * (n.weight || 1);
      count++;
    }
  }

  return count === 0 ? 0 : total / count;
}

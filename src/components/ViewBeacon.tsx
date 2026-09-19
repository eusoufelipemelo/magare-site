"use client";

import { useEffect } from "react";

/** Conta uma leitura no OutBox CMS (o CMS ignora repetições do mesmo visitante por 30 min). */
export function ViewBeacon({ endpoint }: { endpoint: string }) {
  useEffect(() => {
    fetch(endpoint, { method: "POST", keepalive: true, mode: "cors" }).catch(() => {});
  }, [endpoint]);
  return null;
}

"use client";

import type { ReactNode } from "react";
import { OrderProvider } from "./order-provider";
import { OrderDrawer } from "./order-drawer";

export function Providers({ children }: { children: ReactNode }) {
  return <OrderProvider>{children}<OrderDrawer /></OrderProvider>;
}

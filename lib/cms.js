"use client";
// Site content context. The server passes published (or, in draft preview, draft) content from MongoDB.
import { createContext, useContext } from "react";
import { DEFAULTS } from "./defaults";

const CmsContext = createContext(DEFAULTS);
export function CmsProvider({ value, children }) {
  return <CmsContext.Provider value={{ ...DEFAULTS, ...(value || {}) }}>{children}</CmsContext.Provider>;
}
export function useCms(key) { return useContext(CmsContext)[key] ?? DEFAULTS[key]; }

import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ysrqnimrdttrcpmkanxs.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcnFuaW1yZHR0cmNwbWthbnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY3NTIzNDEsImV4cCI6MjAyMjMyODM0MX0.mLAOMiUUZphaHo5IzVUduShKyrNVlA_0h89sYPUb0_U";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

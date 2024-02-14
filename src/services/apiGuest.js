import supabase from "./supabase.js";

export async function getGuestsIdAndName() {
  const { data, error } = await supabase
    .from("guests")
    .select("fullName, id")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error("Error while loading the guests.");
  }

  return data;
}

import { supabase } from "./supabaseClient"; // Import existing Supabase client

export async function syncHostWithSupabase(user) {
  if (!user) return;

  const { id, firstName, lastName, emailAddresses } = user;

  // Check if the host already exists in Supabase
  const { data, error } = await supabase
    .from("host")
    .select("*")
    .single();

  if (!data) {
    // If the host is not found, insert it
    const { data: newHost, error: insertError } = await supabase.from("host").insert([
      {
        hostid: id, 
        hostname: `${firstName} ${lastName}`,
        hostemail: emailAddresses[0].emailAddress,
        hostcontact: null, // Can be updated later
      }
    ]).select();

    if (insertError) console.error("Error inserting host:", insertError);
    return newHost;
  }

  return data;
}

import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
    const { data: urls, error } = await supabase
        .from("urls")
        .select("id, slug, original_url, created_at")
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }


    const urlsWithClickCount = await Promise.all(
        urls.map(async (url) => {
          const { count, error: countError } = await supabase
            .from("clicks")
            .select("*", { count: "exact", head: true }) // Count number of rows
            .eq("url_id", url.id);
    
          return { ...url, click_count: countError ? 0 : count };
        })
      );
      
    return NextResponse.json(urlsWithClickCount, { status: 200 });
}

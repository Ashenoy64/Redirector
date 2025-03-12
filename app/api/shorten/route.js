import { NextResponse } from 'next/server';
import { supabase } from "@/lib/supabase";

function generateSlug(length = 6) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let slug = "";
    for (let i = 0; i < length; i++) {
      slug += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return slug;
  }

export async function POST(request) {
    const { url } = await request.json();
    
    if (!url) {
        return NextResponse.json({ error: "URL is required" }, { status : 400 })
    }

    let slug;
    let isUnique = false;
    while (!isUnique) {
        slug = generateSlug(6);
        const { data: existing } = await supabase.from("urls").select("id").eq("slug", slug).single();
        if (!existing) isUnique = true;
    }

    const { data, error } = await supabase.from("urls").insert([{ original_url: url, slug }]).select().single();
    if (error) {
        return NextResponse.json({ error: error.message }, { status : 500 });
    }
    return NextResponse.json({ shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`}, { status : 201 })
}

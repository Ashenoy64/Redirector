import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const url_id = searchParams.get("url_id");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const { data, error } = await supabase
        .from("clicks")
        .select("id,url_id, created_at, user_agent, ip_address, country, device, os, browser")
        .eq("url_id", url_id)
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

    if (error) {
        console.log(error)
        return NextResponse.json({ error: "Failed to fetch clicks" }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}

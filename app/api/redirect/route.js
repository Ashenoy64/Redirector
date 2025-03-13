import { NextResponse } from 'next/server';
import { supabase } from "@/lib/supabase";
import { UAParser } from 'ua-parser-js';

export async function POST(request) {
    const { slug } = await request.json();
    let { data: urlEntry } = await supabase.from("urls").select("*").eq("slug", slug).single();
    if (!urlEntry) {
        return NextResponse.json({ error: "URL not found" }, { status: 404 });
    }

    const userAgent = request.headers.get("user-agent");
    let parsedUA;
    try{
        let parser = new UAParser();
        parsedUA = parser.setUA(userAgent).getResult();
    }
    catch(e){ 
        parsedUA = { device: { type: "Unknown" }, os: { name: "Unknown" }, browser: { name: "Unknown" } };
    }
    const ipAddress = request.headers.get("x-forwarded-for") || request.socket.remoteAddress;
    const country = request.headers.get("x-vercel-ip-country") || "Unknown";


    await supabase.from("clicks").insert([
        {
            url_id: urlEntry.id,
            user_agent: userAgent,
            ip_address: ipAddress,
            country,
            device: parsedUA.device.type || "Unknown",
            os: parsedUA.os.name || "Unknown",
            browser: parsedUA.browser.name || "Unknown",
        },
    ]);
    return NextResponse.json({ url: urlEntry.original_url }, { status: 200 });

}
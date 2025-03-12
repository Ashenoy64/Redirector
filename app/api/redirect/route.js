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
    let parser = new UAParser();
    const parsedUA = parser.setUA(userAgent).getResult();
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

    const response = NextResponse.redirect(urlEntry.original_url);
    response.headers.set("Access-Control-Allow-Credentials", "true");
    response.headers.set("Access-Control-Allow-Origin", "*"); // Allow any origin
    response.headers.set("Access-Control-Allow-Methods", "GET,OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;

}
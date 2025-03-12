"use client"
import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";


export default function Dashboard() {

    const [urls, setUrls] = useState([]);
    const [selectedSlug, setSelectedSlug] = useState(null);
    const [clicks, setClicks] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch("/api/dashboard")
            .then((res) => res.json())
            .then((res)=>{
                setUrls(res);
            });
    }, []);

    const loadClicks = (url_id, reset = false) => {
        const newPage = reset ? 1 : page;
        fetch(`/api/clicks?url_id=${url_id}&page=${newPage}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setClicks(reset ? data : [...clicks, ...data]);
                setSelectedSlug(url_id);
                setPage(newPage + 1);
            });
    };


    return (
        <>
            <Navbar />
            <div className="flex flex-col gap-5 items-center justify-center h-screen">
                <div className="p-6 max-w-3xl mx-auto">
                    <h1 className="text-2xl font-bold mb-4">📊 URL Dashboard</h1>
                    {urls.length === 0 && <p>No URLs found.</p>}
                    <div className="space-y-4">
                        {urls.map((url) => (
                            <div key={url.id} className="p-4 border rounded-lg bg-white shadow-md">
                                <p className="text-lg font-medium">{url.original_url}</p>
                                <p className="text-gray-600">Short: <a href={`/${url.slug}`} className="text-blue-600">{url.slug}</a></p>
                                <p className="text-gray-600">Clicks: {url.click_count}</p>
                                <button
                                    onClick={() => loadClicks(url.id, true)}
                                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                                >
                                    View Clicks
                                </button>
                                {selectedSlug === url.id && (
                                    <div className="mt-2 bg-gray-100 p-3 rounded">
                                        <h3 className="font-semibold">Recent Clicks</h3>
                                        {clicks.length === 0 ? <p>No data</p> : (
                                            <ul className="text-sm">
                                                {clicks.map((click) => (
                                                    <li key={click.id} className="border-b py-1">
                                                        📍 {click.location} - {click.device} ({click.os} - {click.browser + click.user_agent}) IP : {click.ip ? click.ip : "none"} {click.created_at}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        <button
                                            onClick={() => loadClicks(url.slug)}
                                            className="mt-2 px-3 py-1 bg-gray-500 text-white rounded"
                                        >
                                            Next 5
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
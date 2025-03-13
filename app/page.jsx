'use client'
import { useState, useEffect } from "react";
import { ClipboardCopy, Check } from "lucide-react";
import Navbar from "@/components/navbar";


export default function Home() {

  const [state, setState] = useState(0); //0->Welcome, 1-> Form, 2->Result, 3->Error
  const [url, setUrl] = useState('http://localhost:3000/');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset "copied" after 2 sec
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const url = formData.get('url');
    const response = await fetch('/api/shorten', {
      method: 'POST',
      body: JSON.stringify({ url }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if(data.error){
      setState(3);
    }
    else{
      setUrl(data.shortUrl);
      setState(2);
    }
  }




  return (
    <>
    <Navbar />
    <div className="flex flex-col gap-5 items-center justify-center h-screen">
      {state==0 && <div >
        <h1 className="text-4xl font-bold">Welcome to Redirector</h1>
        <p className="mt-4 text-lg">URL Shortener</p>
        <button onClick={() => setState(1)} className="btn btn-primary mt-4">Get Started</button>
      </div>}
      {state == 1 && <form className="w-full mx-auto max-w-sm flex flex-col justify-center" onSubmit={handleSubmit}  >
        <fieldset className="fieldset w-full mx-auto">
          <legend className="fieldset-legend">Get your URL Shortned</legend>
          <label className="input validator w-full">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></g></svg>
            <input type="url" className="w-full" name="url" required pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$" title="Must be valid URL" />
          </label>
          <p className="validator-hint">Must be valid URL</p>
        </fieldset>
        <button type="submit" className="btn btn-success w-36 mx-auto">Submit</button>
      </form>}
      {state == 2 && <div className="flex flex-col mx-auto max-w-sm  gap-5 items-center justify-center h-screen">
        <div className="flex items-center w-full p-2 bg-gray-100 rounded-lg border border-gray-300">
          {/* Link Icon */}
          <svg
            className="h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </g>
          </svg>

          {/* Input Field */}
          <input
            value={url}
            className="w-full bg-transparent outline-none px-2 text-gray-900"
            disabled
          />

          {/* Copy Button */}
          <button onClick={copyToClipboard} className="ml-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300">
            {copied ? <Check className="h-5 w-5 text-green-600" /> : <ClipboardCopy className="h-5 w-5 text-gray-600" />}
          </button>
        </div>
        <div>
          <button onClick={() => setState(1)} className="btn btn-primary">Go Back</button>
        </div>
      </div >
      }
      {state == 3 && (
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <svg
            className="h-16 w-16 text-red-600 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 14v-4m0-4h.01"></path>
            </g>
          </svg>
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="mt-2 text-lg text-gray-700">Something went wrong. Please try again.</p>
          <button onClick={() => setState(1)} className="btn btn-primary mt-4">Go Back</button>
        </div>
      )}
    </div>
    </>
  );
}

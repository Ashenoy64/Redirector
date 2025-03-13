"use client";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <svg
          className="h-16 w-16 text-red-600 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 14v-4m0-4h.01"></path>
          </g>
        </svg>
        <h2 className="text-2xl font-bold text-red-600">Redirection Failed</h2>
        <p className="mt-2 text-lg text-gray-700">For Query Contact Support example.com.</p>
      </div>
    </div>
  );
}

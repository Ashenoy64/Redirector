'use client';
import { useRouter,useParams, permanentRedirect } from "next/navigation";
import { useEffect } from "react";


export default function RedirectPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug; 
 
  useEffect(  () => {
    if (slug) {
      fetch("/api/redirect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            permanentRedirect(data.url);
            // router.push(data.url);
          });
        } else {
          router.push("/notFound");
        }
      });
    }
  }, [router,slug]);

  return <div></div>;
}

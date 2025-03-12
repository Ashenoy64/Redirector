
export default async function RedirectPage({ params }) {
  const { slug } =await params;

  if (slug) {
    fetch(`/api/redirect`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug }),
    }).then((res) => {
      if (res.ok) window.location.href = res.url;
    });
  }

  return <div></div>;
}

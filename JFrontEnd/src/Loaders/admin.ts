export const adminJobApplicationsLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";

  try {
    const response = await fetch(`/api/jobApplication?page=${page}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch job applications");
    }

    return await response.json();
  } catch (error) {
    throw new Response("Error loading job applications", { status: 500 });
  }
};
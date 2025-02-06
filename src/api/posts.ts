export const fetchPosts = async (query: string) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/v1/messages?` + new URLSearchParams({ query }).toString()
    );
    const data = await response.json();
    return data.messages;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const fetchSinglePost = async (id: string) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/messages/${id}`);
        if (!response.ok) {
            throw new Error(`Error fetching post: ${response.statusText}`);
        }
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error("Error fetching post:", error);
        throw error;
    }
};

export const toggleLikePost = async (id: number, liked: boolean) => {
    try {
        const url = `${process.env.REACT_APP_API_URL}/v1/messages/${id}/${liked ? "unlike" : "like"}`;
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postId: id }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error toggling like:", error);
        throw error;
    }
};

export const sharePost = async (id: number) => {
    try {
        await fetch(`${process.env.REACT_APP_API_URL}/v1/messages/${id}/share`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postId: id }),
        });
    } catch (error) {
        console.error("Error sharing post:", error);
        throw error;
    }
};

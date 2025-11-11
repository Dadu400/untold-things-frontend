
export const submitOrder = async (requestBody: any) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error submitting order:", error);
        throw error;
    }
};  
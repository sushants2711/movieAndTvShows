import { baseUrl } from "../baseUrl";

export const updateMovieApi = async (id, data) => {
    try {
        const url = baseUrl + `/api/v1/movie/update/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    };
};
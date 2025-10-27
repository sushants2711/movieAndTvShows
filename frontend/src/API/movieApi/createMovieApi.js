import { baseUrl } from "../baseUrl";

export const createMovieApi = async (data) => {
    try {
        const url = baseUrl + "/api/v1/movie/add";
        const response = await fetch(url, {
            method: "POST",
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
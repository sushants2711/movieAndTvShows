import { baseUrl } from "../baseUrl";

export const getMovieByIdApi = async (id) => {
    try {
        const url = baseUrl + `/api/v1/movie/details/${id}`
        const response = await fetch(url, {
            method: "GET",
            credentials: "include"
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    };
};
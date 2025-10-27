import { baseUrl } from "../baseUrl";

export const allMovieApi = async (filter = {}) => {
    try {
        let url = baseUrl + `/api/v1/movie/all`;
        const queryParams = new URLSearchParams();

        Object.entries(filter).forEach(([key, value]) => {
            if (value) queryParams.append(key, value);
        });

        if (queryParams.toString()) {
            url += `?${queryParams.toString()}`;
        };

        // console.log(url)

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


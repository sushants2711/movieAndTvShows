import { baseUrl } from "../baseUrl";

export const deleteApi = async () => {
    try {
        const url = baseUrl + "/api/v1/auth/delete";
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    };
};
import api from "./api";

export const analyzemeal = async (image) => {
    const formdata = new FormData();

    formdata.append("image", image)

    const response = await api.post("/analyze", formdata);

    return response.data
}
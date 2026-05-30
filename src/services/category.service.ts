import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICategory } from "@/types/Category";

const categoryServices = {
    getCategories: (params ?: string) => instance.get(`${endpoint.CATEGORY}?${params}`),
    addCategories: (payload: ICategory) => instance.post(endpoint.CATEGORY, payload),
};

export default categoryServices;
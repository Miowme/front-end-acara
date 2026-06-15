import categoryServices from "@/services/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const useEventFilter = () => {
    const schema = Yup.object().shape({
        category: Yup.string(),
        isOnline: Yup.string(),
        isFeatured: Yup.string(),
    });

    const {
        control,
        reset,
        watch,
        getValues,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const {
        data: dataCategory,
        isSuccess: isSuccessGetCategory,
    } = useQuery({
        queryKey: ["Categories"],
        queryFn: () => categoryServices.getCategories(),
    });

    return {
        control,
        setValue,
        dataCategory,
        isSuccessGetCategory,
    };
};

export default  useEventFilter;
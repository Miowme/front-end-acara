import categoryServices from "@/services/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateValue } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaUpdateInfo = Yup.object().shape({
    name: Yup.string().required("Please input name"),
    description: Yup.string().required("Please input description"),
    slug: Yup.string().required("Please input slug"),
    category: Yup.string().required("Please select category"),
    startDate: Yup.mixed<DateValue>().required("Please select start date"),
    endDate: Yup.mixed<DateValue>().required("Please select end date"),
    isPublished: Yup.string().required("Please select status"),
    isFeatured: Yup.string().required("Please select featured"),
});

const useInfoTab = () => {
    const router = useRouter();
    const {
            control: controlUpdateInfo,
            handleSubmit: handleSubmitUpdateInfo,
            formState: {errors: errorsUpdateInfo},
            reset: resetUpdateInfo,
            setValue: setValueUpdateInfo,
    } = useForm({
            resolver: yupResolver(schemaUpdateInfo),
    });

    const {
        data: dataCategory,
    } = useQuery({
        queryKey: ["Categories"],
        queryFn: () => categoryServices.getCategories(),
        enabled: router.isReady,
    });

    return {
        controlUpdateInfo,
        errorsUpdateInfo,
        handleSubmitUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,
        dataCategory,
    }
}

export default useInfoTab;
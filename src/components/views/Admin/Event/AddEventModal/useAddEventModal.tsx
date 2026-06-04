import { DELAY } from "@/constants/list.constants";
import { ToasterContext } from "@/contexts/ToasterContext";
import useDebounce from "@/hooks/useDebounce";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { IEvent, IEventForm } from "@/types/Event";
import { toDateStandard } from "@/utils/date";
import { yupResolver } from "@hookform/resolvers/yup";
import { getLocalTimeZone, now } from "@internationalized/date";
import { DateValue } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object().shape({
    name: Yup.string().required("Please input name"),
    slug: Yup.string().required("Please input slug"),
    category: Yup.string().required("Please select category"),
    startDate: Yup.mixed<DateValue>().required("Please select start date"),
    endDate: Yup.mixed<DateValue>().required("Please select end date"),
    isPublished: Yup.string().required("Please select status"),
    isFeatured: Yup.string().required("Please select featured"),
    description: Yup.string().required("Please select description"),
    isOnline: Yup.string().required("Please select online or offline"),
    region: Yup.string().required("Please select region"),
    latitude: Yup.string().required("Please select latitude coordinate"),
    longitude: Yup.string().required("Please select longitude coordinate"),
    banner: Yup.mixed<FileList | string>().required("Please input banner"),
});

const useAddModalEvent = () => {
    const { setToaster } = useContext(ToasterContext);
    const router = useRouter();
    const debounce = useDebounce();
    const {
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,
        handleUploadFile,
        handleDeleteFile,
    } = useMediaHandling();
    const {
        control,
        handleSubmit: handleSubmitFormCategory,
        formState: {errors},
        reset,
        watch,
        getValues,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const preview = watch("banner");
    const fileUrl = getValues("banner");

    setValue('startDate', now(getLocalTimeZone()));
    setValue('endDate', now(getLocalTimeZone()));

    const handleUploadBanner = (
        files: FileList, 
        onChange: (files: FileList | undefined) => void
    ) => {
        handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
            if (fileUrl) { 
            setValue("banner", fileUrl);
            }
        });
    };

    const handleDeleteBanner = (
        onChange: (files: FileList | undefined) => void
    ) => {
        handleDeleteFile(fileUrl, () => onChange(undefined))
    };

    const handleOnClose = (onClose: () => void) => {
        handleDeleteFile(fileUrl, () => {
            reset();
            onClose();
        });
    };

    const {
        data: dataCategory,
    } = useQuery({
        queryKey: ["Categories"],
        queryFn: () => categoryServices.getCategories(),
        enabled: router.isReady,
    });

    const [searchRegency, setSearchRegency] = useState("");

    const {
        data: dataRegion
    } = useQuery({
        queryKey: ["region", searchRegency],
        queryFn: () => eventServices.searchLocationByRegency(`${searchRegency}`),
        enabled: searchRegency !== "",
    });

    const handleSearchRegion = (region: string) => {
        debounce(() => setSearchRegency(region), DELAY)
    };

    const addEvent = async (payload: IEvent) => {
        const res = await eventServices.addEvent(payload);
        return res;
    };

    const {
            mutate: mutateAddEvent, 
            isPending: isPendingMutateAddEvent, 
            isSuccess: isSuccessMutateAddEvent,
        } = useMutation({
        mutationFn: addEvent,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            });
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Success add category",
            });
            reset();
        }
    });

    const handleAddEvent = (data: IEventForm) => {
        const payload = {
            ...data,
            isFeatured: Boolean(data.isFeatured),
            isPublished: Boolean(data.isPublished),
            isOnline: Boolean(data.isOnline),
            startDate: toDateStandard(data.startDate),
            endDate: toDateStandard(data.endDate),
            location: {
                region: data.region,
                coordinates: [Number(data.latitude), Number(data.longitude)]
            },
            banner: data.banner,
        };
        mutateAddEvent(payload)
    };

    return {
        control,
        errors,
        reset,
        handleSubmitFormCategory,
        handleAddEvent,
        isPendingMutateAddEvent,
        isSuccessMutateAddEvent,
        preview,
        handleUploadBanner,
        isPendingMutateUploadFile,
        handleDeleteBanner,
        isPendingMutateDeleteFile,
        handleOnClose,
        dataCategory,
        handleSearchRegion,
        dataRegion,
        searchRegency,
    };
};

export default useAddModalEvent;
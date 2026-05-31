import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import { ICategory } from "@/types/Category";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object().shape({
    name: Yup.string().required("Please input name"),
    description: Yup.string().required("Please input description"),
    icon: Yup.mixed<FileList | string>().required("Please input icon"),
});

const useAddModalCategory = () => {
    const { setToaster } = useContext(ToasterContext);
    const {
        mutateUploadFile,
        isPendingMutateUploadFile,
        mutateDeleteFile,
        isPendingMutateDeleteFile,
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

    const preview = watch("icon");

    const handleUploadIcon = (
        files: FileList, 
        onChange: (files: FileList | undefined) => void
    ) => {
        if (files.length !== 0) {
            onChange(files);
            mutateUploadFile({
                file: files[0],
                callback: (fileUrl: string) => {
                    setValue("icon", fileUrl);
                },
            });
        }
    };

    const handleDeleteIcon = (
        onChange: (files: FileList | undefined) => void
    ) => {
        const fileUrl = getValues("icon");
        if (typeof fileUrl === "string"){
            mutateDeleteFile({fileUrl, callback: () => onChange(undefined) });
        }
    }

    const handleOnClose = (onClose: () => void) => {
        const fileUrl = getValues("icon");
        if(typeof fileUrl === "string") {
            mutateDeleteFile({fileUrl, callback: () => {
                reset();
                onClose();
            } });
        } else {
            reset();
            onClose();            
        }
    }

    const addCategory = async (payload: ICategory) => {
        const res = await categoryServices.addCategories(payload);
        return res;
    };

    const {
            mutate: mutateAddCategory, 
            isPending: isPendingMutateAddCategory, 
            isSuccess: isSuccessMutateAddCategory,
        } = useMutation({
        mutationFn: addCategory,
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

    const handleAddCategory = (data: ICategory) => mutateAddCategory(data);

    return {
        control,
        errors,
        reset,
        handleSubmitFormCategory,
        handleAddCategory,
        isPendingMutateAddCategory,
        isSuccessMutateAddCategory,
        preview,
        handleUploadIcon,
        isPendingMutateUploadFile,
        handleDeleteIcon,
        isPendingMutateDeleteFile,
        handleOnClose,
    };
};

export default useAddModalCategory;
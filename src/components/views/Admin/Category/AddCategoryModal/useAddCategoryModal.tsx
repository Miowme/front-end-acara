import { ToasterContext } from "@/contexts/ToasterContext";
import categoryServices from "@/services/category.service";
import uploadServices from "@/services/upload.service";
import { ICategory, ICategoryForm } from "@/types/Category";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object().shape({
    name: Yup.string().required("Please input name"),
    description: Yup.string().required("Please input description"),
    icon: Yup.mixed<FileList>().required("Please input icon"),
});

const useAddModalCategory = () => {
    const { setToaster } = useContext(ToasterContext);
    const {
        control,
        handleSubmit: handleSubmitFormCategory,
        formState: {errors},
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const uploadIcon = async (data: ICategoryForm) => {
        const formData = new FormData();
        formData.append("file", data.icon[0]);
        const {
            data: {
                data :{secure_url: icon}
            },
        } = await uploadServices.uploadFile(formData);
        return {name: data.name, description: data.description, icon}
    };

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

        const {
            mutate: mutateAddFile, 
            isPending: isPendingMutateAddFile, 
        } = useMutation({
        mutationFn: uploadIcon,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            });
        },
        onSuccess: (payload) => {
            mutateAddCategory(payload);
        }
    });

    const handleAddCategory = (data: ICategoryForm) => mutateAddFile(data);

    return {
        control,
        errors,
        reset,
        handleSubmitFormCategory,
        handleAddCategory,
        isPendingMutateAddCategory,
        isSuccessMutateAddCategory,
        isPendingMutateAddFile,
    };
};

export default useAddModalCategory;
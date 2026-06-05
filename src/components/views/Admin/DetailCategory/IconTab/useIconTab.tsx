import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaUpdateIcon = Yup.object().shape({
    icon: Yup.mixed<FileList | string>().required("Please input icon"),
});


const useIconTab = () => {
    const {
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,
        handleUploadFile,
        handleDeleteFile,
    } = useMediaHandling();

    const {
            control: controlUpdateIcon,
            handleSubmit: handleSubmitUpdateIcon,
            formState: {errors: errorsUpdateIcon},
            reset: resetUpdateIcon,
            watch: watchUpdateIcon,
            getValues: getValuesUpdateIcon,
            setValue: setValueUpdateIcon,
    } = useForm({
            resolver: yupResolver(schemaUpdateIcon),
    });

    const preview = watchUpdateIcon("icon");
    const fileUrl = getValuesUpdateIcon("icon");

    const handleUploadIcon = (
        files: FileList, 
        onChange: (files: FileList | undefined) => void
    ) => {
        handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
            if (fileUrl) { 
                setValueUpdateIcon("icon", fileUrl);
            }
        });
    };

    const handleDeleteIcon = (
        onChange: (files: FileList | undefined) => void
    ) => {
        handleDeleteFile(fileUrl, () => onChange(undefined))
    };

    return {
        handleUploadIcon,
        handleDeleteIcon,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,
        controlUpdateIcon,
        handleSubmitUpdateIcon,
        resetUpdateIcon,
        errorsUpdateIcon,
        preview,
    };
};

export default useIconTab;
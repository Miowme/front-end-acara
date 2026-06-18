import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaUpdateInfo = Yup.object().shape({
    fullName: Yup.string().required("Please insert your fullname"),
});

const useInfoTab = () => {
    const {
            control: controlUpdateInfo,
            handleSubmit: handleSubmitUpdateInfo,
            formState: {errors: errorsUpdateInfo},
            reset: resetUpdateInfo,
            setValue: setValueUpdateInfo,
    } = useForm({
            resolver: yupResolver(schemaUpdateInfo),
    });

    return {
        controlUpdateInfo,
        errorsUpdateInfo,
        handleSubmitUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,
    }
}

export default useInfoTab;
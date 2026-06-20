import { ToasterContext } from "@/contexts/ToasterContext";
import authServices from "@/services/auth.service";
import { IUpdatePassword } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { set, useForm } from "react-hook-form";
import * as Yup from "yup";

const schemaUpdatePassword = Yup.object().shape({
    oldPassword: Yup.string().required("Please insert old password"),
    password: Yup.string().required("Please insert your new password"),
    confirmPassword: Yup.string().required("Please insert your new password"),
});

const useSecurityTab = () => {
    const {setToaster} = useContext(ToasterContext);
    const {
            control: controlUpdatePassword,
            handleSubmit: handleSubmitUpdatePassword,
            formState: {errors: errorsUpdatePassword},
            reset: resetUpdatePassword,
            setValue: setValueUpdatePassword,
    } = useForm({
            resolver: yupResolver(schemaUpdatePassword),
    });

    const {
        mutate: mutateUpdatePassword, 
        isPending: isPendingMutateUpdatePassword
    } = useMutation({
        mutationFn: (payload: IUpdatePassword) => updatePassword(payload),
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            });
        },
        onSuccess: () => {
            resetUpdatePassword();
            setValueUpdatePassword("oldPassword", "");
            setValueUpdatePassword("password", "");
            setValueUpdatePassword("confirmPassword", "");
            setToaster({
                type: "success",
                message: "Success update password",
            });            
        },
    });

    const updatePassword = async (payload: IUpdatePassword) => {
        const { data } = await authServices.updatePassword(payload);

        return data;
    }

    const handleUpdatePassword = (data: IUpdatePassword) => mutateUpdatePassword(data);

    return {
        controlUpdatePassword,
        errorsUpdatePassword,
        handleSubmitUpdatePassword,

        isPendingMutateUpdatePassword,
        handleUpdatePassword,
    }
}

export default useSecurityTab;
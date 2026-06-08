import { ToasterContext } from "@/contexts/ToasterContext";
import ticketServices from "@/services/ticket.service";
import { ITicket } from "@/types/Ticket";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object().shape({
    name: Yup.string().required("Please input name"),
    price: Yup.string().required("Please input price"),
    quantity: Yup.string().required("Please input quantity"),
    description: Yup.string().required("Please input description"),
});

const useAddTicketModal = () => {
    const router = useRouter();
    const { setToaster } = useContext(ToasterContext);

    const {
        control,
        handleSubmit: handleSubmitFormTicket,
        formState: {errors},
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const addTicket = async (payload: ITicket) => {
        const res = await ticketServices.addTicket(payload);
        return res;
    };

    const {
            mutate: mutateAddTicket, 
            isPending: isPendingMutateAddTicket, 
            isSuccess: isSuccessMutateAddTicket,
        } = useMutation({
        mutationFn: addTicket,
        onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            });
        },
        onSuccess: () => {
            setToaster({
                type: "success",
                message: "Success add ticket",
            });
            reset();
        }
    });

    const handleAddTicket = (data: ITicket) => {
        data.events = `${router.query.id}`;
        data.price = Number(data.price);
        data.quantity = Number(data.quantity);
        mutateAddTicket(data);
    }

    return {
        control,
        errors,
        reset,
        handleSubmitFormTicket,
        handleAddTicket,
        isPendingMutateAddTicket,
        isSuccessMutateAddTicket,
    };
};

export default useAddTicketModal;
import { ToasterContext } from "@/contexts/ToasterContext";
import eventServices from "@/services/event.service";
import { ICategory } from "@/types/Category";
import { IEvent, IEventForm } from "@/types/Event";
import { toDateStandard } from "@/utils/date";
import { DateValue } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";


const useDetailEvent = () => {
    const {query, isReady} = useRouter();
    const {setToaster} = useContext(ToasterContext);

    const getEventById = async () => {
        const {data} = await eventServices.getEventById(`${query.id}`);
        return data.data;
    }

    const updateEvent = async (payload: ICategory) => {
        const data = await eventServices.updateEvent(`${query.id}`, payload);
        return data.data;
    };

    const {data: dataEvent, refetch: refetchEvent} = useQuery({
        queryKey: ["Event"],
        queryFn: getEventById,
        enabled: isReady,
    });

    const {
        mutate: mutateUpdateEvent, 
        isPending: isPendingMutateUpdateEvent, 
        isSuccess: isSuccessMutateUpdateEvent,
    } = useMutation({
        mutationFn: (payload: IEvent) => updateEvent(payload),
                onError: (error) => {
            setToaster({
                type: "error",
                message: error.message,
            });
        },
        onSuccess: () => {
            refetchEvent();
            setToaster({
                type: "success",
                message: "Success update event",
            });
        }
    })

    const handleUpdateEvent = (data: IEvent) => mutateUpdateEvent(data);

    const handleUpdateInfo = (data: IEventForm) => {
        const payload = {
            ...data,
            startDate: toDateStandard(data.startDate as DateValue),
            endDate: toDateStandard(data.endDate as DateValue),
        };
        mutateUpdateEvent(payload)
    };

    const handleUpdateLocation = (data: IEventForm) => {
        const payload = {
            ...data,
            location: {
                address: `${data.address}`,
                region: `${data.region}`,
                coordinates: [Number(data.latitude), Number(data.longitude)],
            },
        };
        mutateUpdateEvent(payload)
    };

    const {data: dataDefaultRegion, isPending: isPendingDefaultRegion} = useQuery({
        queryKey: ["defaultRegion"],
        queryFn: () => eventServices.getRegencyById(dataEvent?.location?.region),
        enabled: !!dataEvent?.location?.region,
    });

    return {
        dataEvent,
        handleUpdateEvent,
        handleUpdateInfo,
        handleUpdateLocation,
        isPendingMutateUpdateEvent,
        isSuccessMutateUpdateEvent,
        dataDefaultRegion,
        isPendingDefaultRegion,
    };
};

export default useDetailEvent;
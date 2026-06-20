import useChangeUrl from "@/hooks/useChangeUrl";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useEvent = () => {
    const router = useRouter();
    const {
        currentLimit,
        currentPage,
        currentCategory,
        currentIsFeatured,
        currentIsOnline,
    } = useChangeUrl();
    
    const getEvents = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}&isPublish=true&category=${currentCategory}&isFeatured=${currentIsFeatured}&isOnline=${currentIsOnline}`;
        const res = await eventServices.getEvents(params);
        const {data} = res;
        return data;
    };

    const {
        data: dataEvent,
        isLoading: isLoadingEvent,
        isRefetching: isRefetchingEvent,
        refetch: refetchEvent,
    } = useQuery({
        queryKey: [
                "Events", 
                currentPage, 
                currentLimit, 
                currentCategory, 
                currentIsFeatured, 
                currentIsOnline
        ],
        queryFn: () => getEvents(),
        enabled: router.isReady && !!currentPage && !!currentLimit,
    });

    return {
        dataEvent,
        isLoadingEvent,
        isRefetchingEvent,
        refetchEvent,
    };
};

export default useEvent;
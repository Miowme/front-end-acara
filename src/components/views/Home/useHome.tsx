import { LIMIT_BANNER, PAGE_DEFAULT } from "@/constants/list.constants";
import bannerServices from "@/services/banner.service";
import { useQuery } from "@tanstack/react-query";


const useHome = () => {
    const getBanners = async () => {
        let params = `limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}`;
        const res = await bannerServices.getBanners(params);
        const { data } = res;
        return data;
    };

    const {
        data: dataBanners,
        isLoading: isLoadingBanners,
    } = useQuery({
        queryKey: ["Banners"],
        queryFn: () => getBanners(),
        enabled: true,
    });

    return {
        dataBanners,
        isLoadingBanners,
    };
}

export default useHome;
import { Button, Tab, Tabs } from "@nextui-org/react";
import { useRouter } from "next/router";
import InfoTab from "./InfoTab";
import useDetailBanner from "./useDetailBanner";
import ImageTab from "./ImageTab";

const DetailBanner = () => {
    const router = useRouter();

    const {       
        dataBanner,
        handleUpdateBanner,
        isPendingMutateUpdateBanner,
        isSuccessMutateUpdateBanner,
    } = useDetailBanner();

    const handleBack = () => {
        router.push("/admin/banner?limit=8&page=1&search=");
    };
    return (
        <div className="flex flex-col gap-4"> 
            <div className="flex justify-end">
                <Button 
                    color="danger" 
                    variant="solid" 
                    onPress={handleBack}
                >
                    Back to Banner
                </Button>
            </div>
        
        <Tabs aria-label="Options">
            <Tab key="image" title="Image">
                <ImageTab 
                    currentImage={dataBanner?.image} 
                    onUpdate={handleUpdateBanner}
                    isPendingUpdate={isPendingMutateUpdateBanner}
                    isSuccessUpdate={isSuccessMutateUpdateBanner}
                />
            </Tab>
            <Tab key="info" title="Info">
                <InfoTab 
                    dataBanner={dataBanner} 
                    onUpdate={handleUpdateBanner}
                    isPendingUpdate={isPendingMutateUpdateBanner}
                    isSuccessUpdate={isSuccessMutateUpdateBanner}    
                />
            </Tab>
        </Tabs>
    </div>
  );
};

export default DetailBanner;
import { Button, Tab, Tabs } from "@nextui-org/react";
import { useRouter } from "next/router";
import CoverTab from "./CoverTab";
import InfoTab from "./InfoTab";
import useDetailEvent from "./useDetailEvent";
import LocationTab from "./LocationTab";

const DetailEvent = () => {
    const router = useRouter();

    const {       
        dataEvent,
        handleUpdateEvent,
        handleUpdateInfo,
        handleUpdateLocation,
        isPendingMutateUpdateEvent,
        isSuccessMutateUpdateEvent,
        dataDefaultRegion,
        isPendingDefaultRegion,
    } = useDetailEvent();

    const handleBack = () => {
        router.push("/admin/event?limit=8&page=1&search=");
    };
    return (
        <div className="flex flex-col gap-4"> 
            <div className="flex justify-end">
                <Button 
                    color="danger" 
                    variant="solid" 
                    onPress={handleBack}
                >
                    Back to Event
                </Button>
            </div>
        
        <Tabs aria-label="Options">
            <Tab key="cover" title="Cover">
                <CoverTab 
                    currentCover={dataEvent?.banner} 
                    onUpdate={handleUpdateEvent}
                    isPendingUpdate={isPendingMutateUpdateEvent}
                    isSuccessUpdate={isSuccessMutateUpdateEvent}
                />
            </Tab>
            <Tab key="info" title="Info">
                <InfoTab 
                    dataEvent={dataEvent} 
                    onUpdate={handleUpdateInfo}
                    isPendingUpdate={isPendingMutateUpdateEvent}
                    isSuccessUpdate={isSuccessMutateUpdateEvent}    
                />
            </Tab>
            <Tab key="location" title="Location">
                <LocationTab 
                    dataEvent={dataEvent} 
                    dataDefaultRegion={dataDefaultRegion?.data?.data[0]?.name}
                    isPendingDefaultRegion={isPendingDefaultRegion}
                    onUpdate={handleUpdateLocation}
                    isPendingUpdate={isPendingMutateUpdateEvent}
                    isSuccessUpdate={isSuccessMutateUpdateEvent}    
                />
            </Tab>
        </Tabs>
    </div>
  );
};

export default DetailEvent;
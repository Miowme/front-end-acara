import { Button, Tab, Tabs } from "@nextui-org/react";
import { useRouter } from "next/router";
import IconTab from "./IconTab";
import InfoTab from "./InfoTab";
import useDetailCategory from "./useDetailCategory";

const DetailCategory = () => {
    const router = useRouter();

    const {       
        dataCategory,
        handleUpdateCategory,
        isPendingMutateUpdateCategory,
        isSuccessMutateUpdateCategory,
    } = useDetailCategory();

    const handleBack = () => {
        router.push("/admin/category?limit=8&page=1&search=");
    };
    return (
        <div className="flex flex-col gap-4"> 
            <div className="flex justify-end">
                <Button 
                    color="danger" 
                    variant="solid" 
                    onPress={handleBack}
                >
                    Back to Category
                </Button>
            </div>
        
        <Tabs aria-label="Options">
            <Tab key="icon" title="Icon">
                <IconTab 
                    currentIcon={dataCategory?.icon} 
                    onUpdate={handleUpdateCategory}
                    isPendingUpdate={isPendingMutateUpdateCategory}
                    isSuccessUpdate={isSuccessMutateUpdateCategory}
                />
            </Tab>
            <Tab key="info" title="Info">
                <InfoTab 
                    dataCategory={dataCategory} 
                    onUpdate={handleUpdateCategory}
                    isPendingUpdate={isPendingMutateUpdateCategory}
                    isSuccessUpdate={isSuccessMutateUpdateCategory}    
                />
            </Tab>
        </Tabs>
    </div>
  );
};

export default DetailCategory;
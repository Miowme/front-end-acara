import { Button, Tab, Tabs } from "@nextui-org/react";
import { useRouter } from "next/router";
import PictureTab from "./PictureTab";
import useProfile from "./useProfile";
import InfoTab from "./InfoTab";

const Profile = () => {

    const {       
        dataProfile,
        handleUpdateProfile,
        isPendingMutateUpdateProfile,
        isSuccessMutateUpdateProfile,
    } = useProfile();

    return (
        <div className="flex flex-col gap-4"> 
        <Tabs aria-label="Options">
            <Tab key="picture" title="Picture">
                <PictureTab 
                    currentPicture={dataProfile?.profilePicture} 
                    onUpdate={handleUpdateProfile}
                    isPendingUpdate={isPendingMutateUpdateProfile}
                    isSuccessUpdate={isSuccessMutateUpdateProfile}
                />
            </Tab>
            <Tab key="info" title="Info">
                <InfoTab 
                    dataProfile={dataProfile} 
                    onUpdate={handleUpdateProfile}
                    isPendingUpdate={isPendingMutateUpdateProfile}
                    isSuccessUpdate={isSuccessMutateUpdateProfile}
                />
            </Tab>
        </Tabs>
    </div>
  );
};

export default Profile;
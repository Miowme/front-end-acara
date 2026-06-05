import InputFile from "@/components/ui/InputFile";
import { Button, Card, CardBody, CardHeader, Skeleton, Spinner } from "@nextui-org/react"
import Image from "next/image";
import useCoverTab from "./useCoverTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IEvent } from "@/types/Event";

interface PropTypes {
    currentCover: string;
    onUpdate: (data: IEvent) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const CoverTab = (props: PropTypes) => {
    const {currentCover, onUpdate, isPendingUpdate, isSuccessUpdate} = props;
    const {
        handleUploadCover,
        handleDeleteCover,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,
        controlUpdateCover,
        handleSubmitUpdateCover,
        errorsUpdateCover,
        resetUpdateCover,
        preview,
    } = useCoverTab();

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateCover();
        }
    }, [isSuccessUpdate])

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="text-xl font-bold w-full">Cover Event</h1>
                <p className="text-small text-default-400 w-full">Manage cover of this event</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateCover(onUpdate)}>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current cover</p>
                        <Skeleton 
                            isLoaded={!!currentCover} 
                            className="aspect-video rounded-lg"
                        >
                            <Image src={currentCover} alt="Cover" fill className="!relative rounded-lg" />
                        </Skeleton>
                    </div>
                        <Controller 
                            name="banner"
                            control={controlUpdateCover}
                            render={({field: {onChange, value, ...field}}) => ( 
                            <InputFile 
                                {...field}
                                onDelete={() => handleDeleteCover(onChange)}
                                onUpload={(files) => handleUploadCover(files, onChange)}
                                isUploading={isPendingMutateUploadFile}
                                isDeleting={isPendingMutateDeleteFile}
                                isInvalid={errorsUpdateCover.banner !== undefined}
                                errorMessage={errorsUpdateCover.banner?.message}
                                isDropable
                                label={<p className="text-sm mb-2 font-medium text-default-700">Update New Cover</p>}
                                preview={typeof preview === "string" ? preview: ""}
                            />
                            )}
                        />
                    <Button
                        color="danger"
                        className="mt-2 disabled:bg-default-500"
                        type="submit"
                        disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
                    >
                        {isPendingUpdate ? (
                        <Spinner size="sm" color="white" /> 
                            ) : (
                            "Save Changes"
                        )}
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default CoverTab;
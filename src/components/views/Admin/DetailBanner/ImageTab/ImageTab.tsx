import InputFile from "@/components/ui/InputFile";
import { Button, Card, CardBody, CardHeader, Skeleton, Spinner } from "@nextui-org/react"
import Image from "next/image";
import useImageTab from "./useImageTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IBanner } from "@/types/Banner";

interface PropTypes {
    currentImage: string;
    onUpdate: (data: IBanner) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const ImageTab = (props: PropTypes) => {
    const {currentImage, onUpdate, isPendingUpdate, isSuccessUpdate} = props;
    const {
        handleUploadImage,
        handleDeleteImage,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,
        controlUpdateImage,
        handleSubmitUpdateImage,
        errorsUpdateImage,
        resetUpdateImage,
        preview,
    } = useImageTab();

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateImage();
        }
    }, [isSuccessUpdate])

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="text-xl font-bold w-full">Banner Image</h1>
                <p className="text-small text-default-400 w-full">Manage image of this banner</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateImage(onUpdate)}>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current Banner</p>
                        <Skeleton 
                            isLoaded={!!currentImage} 
                            className="h-32 rounded-lg"
                        >
                            <Image src={currentImage} alt="icon" fill className="!relative rounded-lg" />
                        </Skeleton>
                    </div>
                        <Controller 
                            name="image"
                            control={controlUpdateImage}
                            render={({field: {onChange, value, ...field}}) => ( 
                            <InputFile 
                                {...field}
                                onDelete={() => handleDeleteImage(onChange)}
                                onUpload={(files) => handleUploadImage(files, onChange)}
                                isUploading={isPendingMutateUploadFile}
                                isDeleting={isPendingMutateDeleteFile}
                                isInvalid={errorsUpdateImage.image !== undefined}
                                errorMessage={errorsUpdateImage.image?.message}
                                isDropable
                                label={<p className="text-sm mb-2 font-medium text-default-700">Update New Image</p>}
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

export default ImageTab;
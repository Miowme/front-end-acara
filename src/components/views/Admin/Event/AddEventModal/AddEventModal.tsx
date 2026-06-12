import { Autocomplete, AutocompleteItem, Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner, Textarea } from "@nextui-org/react";
import useAddModalEvent from "./useAddEventModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";
import { ICategory } from "@/types/Category";
import { IRegency } from "@/types/Event";
import { getLocalTimeZone, now } from "@internationalized/date";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    refetchEvent: () => void;
}

const AddEventModal = (props: PropTypes) => {
    const { isOpen, onClose, onOpenChange, refetchEvent } = props;
    const {
        control,
        errors,
        handleSubmitFormCategory,
        handleAddEvent,
        isPendingMutateAddEvent,
        isSuccessMutateAddEvent,
        preview,
        handleUploadBanner,
        isPendingMutateUploadFile,
        handleDeleteBanner,
        isPendingMutateDeleteFile,
        handleOnClose,
        dataCategory,
        handleSearchRegion,
        dataRegion,
        searchRegency,
    } = useAddModalEvent();

    useEffect(() => {
        if(isSuccessMutateAddEvent) {
            onClose();
            refetchEvent();
        }
    }, [isSuccessMutateAddEvent])

    const disabledSubmit = isPendingMutateAddEvent || isPendingMutateUploadFile || isPendingMutateDeleteFile;

    return (
        <Modal onOpenChange={onOpenChange} isOpen={isOpen} placement="center" scrollBehavior="inside" onClose={() => handleOnClose(onClose)}>
            <form onSubmit={handleSubmitFormCategory(handleAddEvent)}>
                <ModalContent className="m-4">
                    <ModalHeader>Add Event</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-bold">Information</p>
                            <div className="flex flex-col gap-4 mb-2">
                            <Controller 
                                name="name"
                                control={control}
                                render={({field}) => ( 
                                <Input 
                                    {...field}
                                    autoFocus 
                                    label="Name" 
                                    variant="bordered" 
                                    type="text"
                                    isInvalid={errors.name !== undefined}
                                    errorMessage={errors.name?.message}
                                />
                              )}
                            />
                            <Controller 
                                name="slug"
                                control={control}
                                render={({field}) => ( 
                                <Input 
                                    {...field}
                                    label="Slug" 
                                    variant="bordered" 
                                    type="text"
                                    isInvalid={errors.slug !== undefined}
                                    errorMessage={errors.slug?.message}
                                />
                              )}
                            />
                            <Controller 
                                name="category"
                                control={control}
                                render={({field: {onChange, ...field}}) => ( 
                                <Autocomplete 
                                    {...field}
                                    defaultItems={dataCategory?.data.data || []}
                                    label="Category" 
                                    variant="bordered" 
                                    isInvalid={errors.category !== undefined}
                                    errorMessage={errors.category?.message}
                                    onSelectionChange={(value) => onChange(value)}
                                    placeholder="Search category here"
                                >
                                    {(category: ICategory) => (
                                        <AutocompleteItem key={`${category._id}`}>
                                            {category.name}
                                        </AutocompleteItem>
                                    )}
                                </Autocomplete>
                              )}
                            />
                            <Controller 
                                name="startDate"
                                control={control}
                                render={({field}) => ( 
                                <DatePicker
                                    {...field}
                                    autoFocus 
                                    label="Start Date" 
                                    variant="bordered" 
                                    hideTimeZone
                                    showMonthAndYearPickers
                                    isInvalid={errors.startDate !== undefined}
                                    errorMessage={errors.startDate?.message}
                                />
                              )}
                            />
                            <Controller 
                                name="endDate"
                                control={control}
                                render={({field}) => ( 
                                <DatePicker
                                    {...field}
                                    autoFocus 
                                    label="End Date" 
                                    variant="bordered" 
                                    hideTimeZone
                                    showMonthAndYearPickers
                                    isInvalid={errors.endDate !== undefined}
                                    errorMessage={errors.endDate?.message}
                                />
                              )}
                            />
                            <Controller 
                                name="isPublish"
                                control={control}
                                render={({field}) => ( 
                                <Select
                                    {...field}
                                    autoFocus 
                                    label="Status" 
                                    variant="bordered" 
                                    isInvalid={errors.isPublish !== undefined}
                                    errorMessage={errors.isPublish?.message}
                                    disallowEmptySelection
                                >
                                    <SelectItem key="true" value="true">Publish</SelectItem>
                                    <SelectItem key="false" value="false">Draft</SelectItem>
                                </Select>
                              )}
                            />
                            <Controller 
                                name="isFeatured"
                                control={control}
                                render={({field}) => ( 
                                <Select
                                    {...field}
                                    autoFocus 
                                    label="Featured" 
                                    variant="bordered" 
                                    isInvalid={errors.isFeatured !== undefined}
                                    errorMessage={errors.isFeatured?.message}
                                    disallowEmptySelection
                                >
                                    <SelectItem key="true" value="true">Yes</SelectItem>
                                    <SelectItem key="false" value="false">No</SelectItem>
                                </Select>
                              )}
                            />
                            <Controller 
                                name="description"
                                control={control}
                                render={({field}) => ( 
                                <Textarea 
                                    {...field}
                                    label="Description" 
                                    variant="bordered" 
                                    isInvalid={errors.description !== undefined}
                                    errorMessage={errors.description?.message}
                                />
                              )}
                            />
                            <p className="text-sm font-bold">Location</p>
                            <div className="flex flex-col gap-4 mb-2">
                            <Controller 
                                name="isOnline"
                                control={control}
                                render={({field}) => ( 
                                <Select
                                    {...field}
                                    autoFocus 
                                    label="Online / Offline" 
                                    variant="bordered" 
                                    isInvalid={errors.isOnline !== undefined}
                                    errorMessage={errors.isOnline?.message}
                                    disallowEmptySelection
                                >
                                    <SelectItem key="true" value="true">Online</SelectItem>
                                    <SelectItem key="false" value="false">Offline</SelectItem>
                                </Select>
                              )}
                            />
                            <Controller 
                                name="region"
                                control={control}
                                render={({field: {onChange, ...field}}) => ( 
                                <Autocomplete 
                                    {...field}
                                    defaultItems={dataRegion?.data.data && searchRegency !== "" ? dataRegion?.data.data : []}
                                    label="City" 
                                    variant="bordered" 
                                    onInputChange={(search) => handleSearchRegion(search)}
                                    isInvalid={errors.region !== undefined}
                                    errorMessage={errors.region?.message}
                                    onSelectionChange={(value) => onChange(value)}
                                    placeholder="Search city here"
                                >
                                    {(regency: IRegency) => (
                                        <AutocompleteItem key={`${regency.id}`}>
                                            {regency.name}
                                        </AutocompleteItem>
                                    )}
                                </Autocomplete>
                              )}
                            />
                            <Controller 
                                name="address"
                                control={control}
                                render={({field}) => ( 
                                <Input 
                                    {...field}
                                    label="Address" 
                                    variant="bordered" 
                                    isInvalid={errors.address !== undefined}
                                    errorMessage={errors.address?.message}
                                />
                              )}
                            />
                            <Controller 
                                name="latitude"
                                control={control}
                                render={({field}) => ( 
                                <Input 
                                    {...field}
                                    label="Latitude" 
                                    variant="bordered" 
                                    isInvalid={errors.latitude !== undefined}
                                    errorMessage={errors.latitude?.message}
                                />
                              )}
                            />
                            <Controller 
                                name="longitude"
                                control={control}
                                render={({field}) => ( 
                                <Input 
                                    {...field}
                                    label="Longitude" 
                                    variant="bordered" 
                                    isInvalid={errors.longitude !== undefined}
                                    errorMessage={errors.longitude?.message}
                                />
                              )}
                            />
                            </div>
                            <p className="text-sm font-bold">Cover</p>
                            <Controller 
                                name="banner"
                                control={control}
                                render={({field: {onChange, value, ...field}}) => ( 
                                <InputFile 
                                    {...field}
                                    onDelete={() => handleDeleteBanner(onChange)}
                                    onUpload={(files) => handleUploadBanner(files, onChange)}
                                    isUploading={isPendingMutateUploadFile}
                                    isDeleting={isPendingMutateDeleteFile}
                                    isInvalid={errors.banner !== undefined}
                                    errorMessage={errors.banner?.message}
                                    isDropable
                                    preview={typeof preview === "string" ? preview: ""}
                                />
                              )}
                            />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            color="danger" 
                            variant="flat" 
                            onPress={() => handleOnClose(onClose)} 
                            disabled={disabledSubmit}
                        >
                            Cancel
                        </Button>
                        <Button 
                            color="danger" 
                            type="submit" 
                            disabled={disabledSubmit}
                        >
                            {isPendingMutateAddEvent ? (
                                <Spinner size="sm" color="white" />
                            ) : ( 
                                "Create Event"
                            )}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    );
}

export default AddEventModal;
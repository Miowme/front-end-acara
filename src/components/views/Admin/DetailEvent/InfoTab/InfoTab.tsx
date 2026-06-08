import { IEventForm } from "@/types/Event"; 
import { Autocomplete, AutocompleteItem, Button, Card, CardBody, CardHeader, DatePicker, Input, Select, SelectItem, Skeleton, Spinner, Textarea } from "@nextui-org/react"
import useInfoTab from "./useInfoTab";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { ICategory } from "@/types/Category";
import { toInputDate } from "@/utils/date";

interface PropTypes {
    dataEvent: IEventForm;
    onUpdate: (data: IEventForm) => void;
    isPendingUpdate: boolean;
    isSuccessUpdate: boolean;
}

const InfoTab = (props: PropTypes) => {
    const {dataEvent, onUpdate, isPendingUpdate, isSuccessUpdate} = props;
    const {
        controlUpdateInfo,
        errorsUpdateInfo,
        handleSubmitUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,
        dataCategory,
    } = useInfoTab();

    useEffect(() => {
        if(dataEvent) {
            setValueUpdateInfo("name", `${dataEvent?.name}`);
            setValueUpdateInfo("description", `${dataEvent?.description}`);
            setValueUpdateInfo("slug", `${dataEvent?.slug}`);
            setValueUpdateInfo("category", `${dataEvent?.category}`);
            setValueUpdateInfo("startDate", toInputDate(`${dataEvent?.startDate}`));
            setValueUpdateInfo("endDate", toInputDate(`${dataEvent?.endDate}`));
            setValueUpdateInfo("isPublish", `${dataEvent?.isPublish}`);
            setValueUpdateInfo("isFeatured", `${dataEvent?.isFeatured}`);
        }
    }, [dataEvent]);

    useEffect(() => {
        if(isSuccessUpdate) {
            resetUpdateInfo();
        }
    }, [isSuccessUpdate]);
    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="text-xl font-bold w-full">Event Information</h1>
                <p className="text-small text-default-400 w-full">Manage information of this event</p>
            </CardHeader>
            <CardBody>
                <form 
                    className="flex flex-col gap-4" 
                    onSubmit={handleSubmitUpdateInfo(onUpdate)}
                >
                    <Skeleton isLoaded={!!dataEvent?.name} className="rounded-lg">
                            <Controller 
                                name="name"
                                control={controlUpdateInfo}
                                render={({field}) => ( 
                                <Input 
                                    {...field}
                                    label="Name" 
                                    variant="bordered" 
                                    labelPlacement="outside"
                                    type="text"
                                    isInvalid={errorsUpdateInfo.name !== undefined}
                                    errorMessage={errorsUpdateInfo.name?.message}
                                    className="mt-2"
                                />
                              )}
                            />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.slug} className="rounded-lg">
                            <Controller 
                                name="slug"
                                control={controlUpdateInfo}
                                render={({field}) => ( 
                                <Input 
                                    {...field}
                                    label="Slug" 
                                    variant="bordered" 
                                    labelPlacement="outside"
                                    type="text"
                                    isInvalid={errorsUpdateInfo.slug !== undefined}
                                    errorMessage={errorsUpdateInfo.slug?.message}
                                    className="mt-2"
                                />
                              )}
                            />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.category} className="rounded-lg">
                            <Controller 
                                name="category"
                                control={controlUpdateInfo}
                                render={({field: {onChange, ...field}}) => ( 
                                <Autocomplete 
                                    {...field}
                                    defaultItems={dataCategory?.data.data || []}
                                    label="Category" 
                                    labelPlacement="outside"
                                    variant="bordered" 
                                    defaultSelectedKey={dataEvent?.category}
                                    isInvalid={errorsUpdateInfo.category !== undefined}
                                    errorMessage={errorsUpdateInfo.category?.message}
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
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.startDate} className="rounded-lg">
                            <Controller 
                                name="startDate"
                                control={controlUpdateInfo}
                                render={({field}) => ( 
                                <DatePicker
                                    {...field}
                                    autoFocus 
                                    label="Start Date" 
                                    variant="bordered" 
                                    labelPlacement="outside"
                                    hideTimeZone
                                    showMonthAndYearPickers
                                    isInvalid={errorsUpdateInfo.startDate !== undefined}
                                    errorMessage={errorsUpdateInfo.startDate?.message}
                                />
                              )}
                            />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.endDate} className="rounded-lg">
                            <Controller 
                                name="endDate"
                                control={controlUpdateInfo}
                                render={({field}) => ( 
                                <DatePicker
                                    {...field}
                                    autoFocus 
                                    label="End Date" 
                                    labelPlacement="outside"
                                    variant="bordered" 
                                    hideTimeZone
                                    showMonthAndYearPickers
                                    isInvalid={errorsUpdateInfo.endDate !== undefined}
                                    errorMessage={errorsUpdateInfo.endDate?.message}
                                />
                              )}
                            />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
                            <Controller 
                                name="isPublish"
                                control={controlUpdateInfo}
                                render={({field}) => ( 
                                <Select
                                    {...field}
                                    autoFocus 
                                    label="Status" 
                                    variant="bordered" 
                                    isInvalid={errorsUpdateInfo.isPublish !== undefined}
                                    errorMessage={errorsUpdateInfo.isPublish?.message}
                                    disallowEmptySelection
                                    defaultSelectedKeys={[
                                        dataEvent?.isPublish ? "true" : "false",
                                    ]}
                                >
                                    <SelectItem key="true" value="true">Publish</SelectItem>
                                    <SelectItem key="false" value="false">Draft</SelectItem>
                                </Select>
                              )}
                            />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent} className="rounded-lg">
                            <Controller 
                                name="isFeatured"
                                control={controlUpdateInfo}
                                render={({field}) => ( 
                                <Select
                                    {...field}
                                    autoFocus 
                                    label="Featured" 
                                    variant="bordered" 
                                    isInvalid={errorsUpdateInfo.isFeatured !== undefined}
                                    errorMessage={errorsUpdateInfo.isFeatured?.message}
                                    disallowEmptySelection
                                    defaultSelectedKeys={[
                                        dataEvent?.isFeatured ? "true" : "false",
                                    ]}
                                >
                                    <SelectItem key="true" value="true">Yes</SelectItem>
                                    <SelectItem key="false" value="false">No</SelectItem>
                                </Select>
                              )}
                            />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.description} className="rounded-lg">
                            <Controller 
                                name="description"
                                control={controlUpdateInfo}
                                render={({field}) => ( 
                                <Textarea 
                                    {...field}
                                    label="Description" 
                                    labelPlacement="outside"
                                    variant="bordered" 
                                    isInvalid={errorsUpdateInfo.description !== undefined}
                                    errorMessage={errorsUpdateInfo.description?.message}
                                />
                              )}
                            />
                    </Skeleton>
                    <Button
                        color="danger"
                        className="mt-2 disabled:bg-default-500"
                        type="submit"
                        disabled={isPendingUpdate || !dataEvent?._id}
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

export default InfoTab;
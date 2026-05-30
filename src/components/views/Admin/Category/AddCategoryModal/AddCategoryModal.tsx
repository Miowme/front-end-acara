import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Textarea } from "@nextui-org/react";
import useAddModalCategory from "./useAddCategoryModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    refetchCategory: () => void;
}

const AddCategoryModal = (props: PropTypes) => {
    const { isOpen, onClose, onOpenChange, refetchCategory } = props;
    const {
        control,
        errors,
        reset,
        handleSubmitFormCategory,
        handleAddCategory,
        isPendingMutateAddCategory,
        isSuccessMutateAddCategory,
        isPendingMutateAddFile,
    } = useAddModalCategory();

    useEffect(() => {
        if(isSuccessMutateAddCategory) {
            onClose();
            refetchCategory();
        }
    }, [isSuccessMutateAddCategory])

    return (
        <Modal onOpenChange={onOpenChange} isOpen={isOpen} placement="center" scrollBehavior="inside">
            <form onSubmit={handleSubmitFormCategory(handleAddCategory)}>
                <ModalContent className="m-4">
                    <ModalHeader>Add Category</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-4">
                            <p className="text-sm font-bold">Information</p>
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
                            <p className="text-sm font-bold">Icon</p>
                            <Controller 
                                name="icon"
                                control={control}
                                render={({field: {onChange, value, ...field}}) => ( 
                                <InputFile 
                                    {...field}
                                    onChange={(e) => {
                                        onChange(e.currentTarget.files)
                                    }}
                                    isInvalid={errors.icon !== undefined}
                                    errorMessage={errors.icon?.message}
                                />
                              )}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            color="danger" 
                            variant="flat" 
                            onPress={onClose} 
                            disabled={isPendingMutateAddCategory || isPendingMutateAddFile}
                        >
                            Cancel
                        </Button>
                        <Button 
                            color="danger" 
                            type="submit" 
                            disabled={isPendingMutateAddCategory || isPendingMutateAddFile}
                        >
                            {isPendingMutateAddCategory || isPendingMutateAddFile ? (
                                <Spinner size="sm" color="white" />
                            ) : ( 
                                "Create Category"
                            )}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    );
}

export default AddCategoryModal;
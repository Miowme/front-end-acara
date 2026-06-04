import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteEventModal from "./useDeleteEventModal";

interface PropTypes {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
    refetchEvent: () => void;
    selectedId: string;
    setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteEventModal = (props: PropTypes) => {
    const { isOpen, 
            onOpenChange, 
            onClose, 
            refetchEvent, 
            selectedId,
            setSelectedId,
        } = props;

    const { 
        mutateDeleteEvent,
        isPendingMutateDeleteEvent,
        isSuccessMutateDeleteEvent, 
    } = useDeleteEventModal();

    useEffect(() => {
        if(isSuccessMutateDeleteEvent){
            onClose();
            refetchEvent();
        }
    }, [isSuccessMutateDeleteEvent]);

    return (
        <Modal 
            onOpenChange={onOpenChange} 
            isOpen={isOpen} 
            placement="center" 
            scrollBehavior="inside" 
        >
            <ModalContent className="m-4">
                <ModalHeader>Delete Event</ModalHeader>
                <ModalBody>
                    <p className="text-medium">
                        Are you sure want to delete this event?
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="danger" 
                        variant="flat" 
                        onPress={() => {
                            onClose();
                            setSelectedId("");
                        }} 
                        disabled={isPendingMutateDeleteEvent}
                    >
                        Cancel
                    </Button>
                    <Button 
                        color="danger" 
                        type="submit" 
                        disabled={isPendingMutateDeleteEvent}
                        onPress={() => mutateDeleteEvent(selectedId)}
                    >
                        {isPendingMutateDeleteEvent ? (
                            <Spinner size="sm" color="white" />
                        ) : ( 
                            "Delete Event"
                        )}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default DeleteEventModal;
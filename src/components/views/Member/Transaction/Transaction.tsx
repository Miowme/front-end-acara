import DataTable from "@/components/ui/DataTable";
import { Chip } from "@nextui-org/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_TRANSACTION } from "./Transaction.constants";
import useTransaction from "./useTransaction";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import { convertIDR } from "@/utils/currency";

const Transaction = () => {
        const {push, isReady, query} = useRouter();
        const { 
            dataTransactions, 
            isLoadingTransactions, 
            isRefetchingTransactions, 
            refetchTransactions,
        } = useTransaction();

        const { setUrl } = useChangeUrl();

        useEffect(() => {
            if(isReady) {
                setUrl();
            }
        }, [isReady])

        const renderCell = useCallback(
            (transaction: Record<string, unknown>, columnKey: Key) => {
                const cellValue = transaction[columnKey as keyof typeof transaction];
                
                switch(columnKey) {
                    case "status": 
                        const colorMap: Record<string, "success" | "warning" | "danger" | "default"> = {
                            completed: "success",
                            pending: "warning",
                            cancelled: "danger",
                        };
                        return (
                            <Chip 
                                color={colorMap[cellValue as string] || "default"} 
                                size="sm" 
                                variant="flat"
                            >
                                {cellValue as ReactNode}
                            </Chip>
                        );
                    case "total":
                        return convertIDR(Number(cellValue));
                    case "actions":
                        return (
                            <DropdownAction 
                                onPressButtonDetail={() => push(`/member/transaction/${transaction?.orderId}`)} 
                                hideButtonDelete
                            />
                        );
                        default: 
                            return cellValue as ReactNode;
                }
            }, [push],
        );

    return (
        <section>
            { Object.keys(query).length > 0 && (
                <DataTable 
                    columns={COLUMN_LIST_TRANSACTION} 
                    data={dataTransactions?.data || []}
                    emptyContent="Transaction is empty"
                    isLoading={isLoadingTransactions || isRefetchingTransactions}
                    renderCell={renderCell} 
                    totalPages={dataTransactions?.pagination.totalPages}
                />
            )}
        </section>
    );
};

export default Transaction;
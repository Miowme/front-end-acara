import DataTable from "@/components/ui/DataTable";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_CATEGORY } from "./Category.constants";
import useCategory from "./useCategory";
import InputFile from "@/components/ui/InputFile";

const Category = () => {
        const {push, isReady, query} = useRouter();
        const {
            currentPage, 
            currentLimit, 
            dataCategory, 
            isLoadingCategory, 
            isRefetchingCategory, 
            setURL,
            handleChangeLimit,
            handleChangePage,
            handleSearch,
            handleClearSearch,
        } = useCategory();

        useEffect(() => {
            if(isReady) {
                setURL();
            }
        }, [isReady])

        const renderCell = useCallback(
            (category: Record<string, unknown>, columnKey: Key) => {
                const cellValue = category[columnKey as keyof typeof category];
                
                switch(columnKey) {
                    // case "icon":
                    //     return (
                    //         <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
                    //     );
                        case "actions":
                            return (
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button isIconOnly size="sm" variant="light">
                                            <CiMenuKebab className="text-default-700"/>
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu>
                                        <DropdownItem 
                                            key="detail-category-button"
                                            onPress={() => push(`/admin/category/${category._id}`)}
                                        >
                                            Detail Category
                                        </DropdownItem>
                                        <DropdownItem 
                                            key="delete-category"
                                            className="text-danger-500"
                                        >
                                            Delete
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
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
                    buttonTopContentLabel="Create Category"
                    columns={COLUMN_LIST_CATEGORY} 
                    currentPage={Number(currentPage)}
                    data={dataCategory?.data || []}
                    emptyContent="Category is empty"
                    isLoading={isLoadingCategory || isRefetchingCategory}
                    limit={String(currentLimit)}
                    onChangeLimit={handleChangeLimit}
                    onChangePage={handleChangePage}
                    onChangeSearch={handleSearch}
                    onClearSearch={handleClearSearch}
                    onClickButtonTopContent={() => {}}
                    renderCell={renderCell} 
                    totalPages={dataCategory?.pagination.totalPages}
                />
            )}
            <InputFile name="input" isDropable></InputFile>
        </section>
    );
};

export default Category;
import { Avatar, Button, ButtonProps, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Link, Listbox, ListboxItem, Spinner } from "@nextui-org/react"
import Image from "next/image";
import { BUTTON_ITEMS, NAV_ITEMS } from "../LandingPageLayout.constants";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar";
import { Fragment } from "react";
import { IEvent } from "@/types/Event";

const LandingPageLayoutNavbar = () => {
    const router = useRouter();
    const session = useSession();
    const {
        dataProfile,         
        dataEventsSearch,
        isLoadingEventsSearch,
        isRefetchingEventsSearch,
        handleSearch,
        search,
        setSearch,
    } = useLandingPageLayoutNavbar();
    return (
        <Navbar 
            maxWidth="full" 
            className="max-w-screen-3xl 3xl:container" 
            isBordered 
            isBlurred={false} 
            shouldHideOnScroll
        >
            <div className="flex items-center gap-8">
                <NavbarBrand as={Link} href="/">
                    <Image 
                        src="/images/general/logo.svg" 
                        alt="logo" 
                        width={100} 
                        height={50} 
                        className="cursor-pointer"
                    />
                </NavbarBrand>
                <NavbarContent className="hidden lg:flex">
                    {NAV_ITEMS.map((item) => ( 
                        <NavbarItem 
                            key={`nav-${item.label}`} 
                            as={Link} 
                            href={item.href}
                            className={cn(
                                "font-medium text-default-700 hover:text-danger",
                                {
                                    "font-bold text-danger-500": router.pathname === item.href,
                                }
                            )}
                        >
                            {item.label}
                        </NavbarItem>
                    ))}
                </NavbarContent>
            </div>
            <NavbarContent justify="end">
                <NavbarMenuToggle className="lg:hidden"/>
                <NavbarItem className="hidden lg:items-center lg:flex lg:gap-4 lg:relative">
                    <Input 
                        isClearable 
                        className="w-[300px]" 
                        placeholder="Search Event"
                        startContent={<CiSearch />}
                        onClear={() => setSearch("")}
                        onChange={handleSearch}
                    />
                    {search  !== "" && (
                        <Listbox 
                            items={dataEventsSearch?.data || []} 
                            className="absolute right-0 top-12 rounded-xl border bg-white"
                        >
                            {!isRefetchingEventsSearch && !isLoadingEventsSearch ? (
                                (item: IEvent) => (
                                    <ListboxItem key={item._id} href={`/event/${item.slug}`}>
                                        <div className="flex items-center gap-2">
                                            <Image 
                                                src={`${item.banner}`} 
                                                alt={`${item.name}`} 
                                                className="w-2/5 rounded-md" width={100} height={40}
                                            />
                                            <p className="w-3/5 text-wrap">
                                                {item.name}
                                            </p>
                                         </div>
                                    </ListboxItem>
                                )
                            ) : (
                                <ListboxItem key="loading">
                                    <Spinner color="danger" size="sm" />
                                </ListboxItem>
                            )}
                        </Listbox>
                    )}
                    {session.status === "authenticated" && (
                            <Button
                                as={Link}
                                href="/member/transaction"
                                isIconOnly
                                variant="light"
                                className={cn(
                                    "text-default-700 hover:text-danger min-w-10 w-10 h-10", 
                                    {
                                        "hidden": dataProfile?.role === "admin",
                                    }
                                )}
                                aria-label="Shopping Cart"
                            >
                                <FaShoppingCart size={28} />
                            </Button>
                    )}
                </NavbarItem>
                {session.status === "authenticated" ? (
                    <NavbarItem className="hidden lg:block">
                        <Dropdown>
                            <DropdownTrigger>
                                <Avatar 
                                    src={dataProfile?.profilePicture} 
                                    className="cursor-pointer" 
                                    showFallback 
                                />
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem key="admin" href="/admin/event" className={cn({
                                    hidden: dataProfile?.role !== "admin",
                                })}>
                                    Admin
                                </DropdownItem>
                                <DropdownItem key="profile" href="/member/profile" className={cn({
                                    hidden: dataProfile?.role === "admin",
                                })}>
                                    Profile
                                </DropdownItem>
                                <DropdownItem key="transaction" href="/member/transaction" className={cn({
                                    hidden: dataProfile?.role === "admin",
                                })}>
                                    Transaction
                                </DropdownItem>
                                <DropdownItem key="signout" onPress={() => signOut()}>
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarItem>
                ) : ( 
                <div className="hidden lg:gap-4 lg:flex">
                    {BUTTON_ITEMS.map((item) => ( 
                        <NavbarItem key={`button-${item.label}`}>
                            <Button 
                                as={Link} 
                                color="danger"
                                href={item.href} 
                                variant={item.variant as ButtonProps["variant"]}
                            >
                                {item.label}
                            </Button>
                        </NavbarItem>
                    ))}
                </div>       
                )}

                <NavbarMenu className="gap-4">
                    {NAV_ITEMS.map((item) => ( 
                        <NavbarMenuItem 
                            key={`nav-${item.label}`} 
                        >
                            <Link 
                                href={item.href}                             
                                className={cn("font-medium text-default-700 hover:text-danger", {
                                "font-bold text-danger": router.pathname === item.href
                            })}>{item.label}</Link>
                        </NavbarMenuItem>
                    ))}
                    {session.status === "authenticated" ? (
                        <Fragment>
                            <NavbarMenuItem                             
                                className={cn("font-medium text-default-700 hover:text-danger", {
                                    "hidden": dataProfile?.role !== "admin",
                                })}
                            >
                                <Link href="/admin/event">Admin</Link>
                            </NavbarMenuItem>
                            <NavbarMenuItem                          
                                className={cn("font-medium text-default-700 hover:text-danger", {
                                    "hidden": dataProfile?.role === "admin",
                                })}
                            >
                                <Link href="/member/profile">Profile</Link>
                            </NavbarMenuItem>
                            <NavbarMenuItem                          
                                className={cn("font-medium text-default-700 hover:text-danger", {
                                    "hidden": dataProfile?.role === "admin",
                                })}
                            >
                                <Link href="/member/transaction">Transaction</Link>
                            </NavbarMenuItem>
                            <NavbarMenuItem>
                                <Button 
                                    color="danger" 
                                    onPress={() => signOut()} 
                                    className="mt-2 w-full"
                                    variant="bordered"
                                    size="md"
                                >
                                    Logout
                                </Button>
                            </NavbarMenuItem>
                        </Fragment>
                    ) : (
                        <Fragment>
                            {BUTTON_ITEMS.map((item) => (
                                <NavbarMenuItem key={`button-${item.label}`}>
                                    <Button 
                                        as={Link} 
                                        color="danger" 
                                        href={item.href} 
                                        fullWidth 
                                        variant={item.variant as ButtonProps["variant"]} 
                                        size="md"
                                        >
                                            {item.label}
                                        </Button>
                                </NavbarMenuItem>
                            ))}
                        </Fragment>
                    )}
                </NavbarMenu>
            </NavbarContent>
        </Navbar>
    )
}

export default LandingPageLayoutNavbar;
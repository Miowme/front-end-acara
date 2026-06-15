import { BreadcrumbItem, Breadcrumbs, Skeleton, Tab, Tabs } from "@nextui-org/react";
import useDetailEvent from "./useDetailEvent";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { convertTime } from "@/utils/date";
import Image from "next/image";
import { ITicket } from "@/types/Ticket";
import DetailEventTicket from "./DetailEventTicket";

const DetailEvent = () => {
    const {
        dataDetailEvent,
        isLoadingDetailEvent,
        dataTicket,
        isLoadingTicket,
    } = useDetailEvent();
    return(
        <div className="px-8 md:px-0">
            <Skeleton className="h-6 w-1/4 rounded-lg" isLoaded={!!dataDetailEvent?.name}>
                <Breadcrumbs>
                    <BreadcrumbItem href="/">Home</BreadcrumbItem>
                    <BreadcrumbItem href="/event">Event</BreadcrumbItem>
                    <BreadcrumbItem>{dataDetailEvent?.name}</BreadcrumbItem>
                </Breadcrumbs>
            </Skeleton>

            <section className="mt-4 flex flex-col gap-10 lg:flex-row">
                <div className="w-full lg:w-4/6">
                    <div className="mb-4">
                        <Skeleton isLoaded={!!dataDetailEvent?.name} className="h-8 mb-2 rounded-lg">
                            <h1 className="text-2xl font-semibold text-danger">
                                {dataDetailEvent?.name}
                            </h1>
                        </Skeleton>
                        <Skeleton isLoaded={!!dataDetailEvent?.startDate || !!dataDetailEvent?.endDate} className="h-6 mb-2 w-1/2 rounded-lg">
                            <div className="flex items-center gap-2 text-foreground-500">
                                <FaClock width={16} />
                                <p>
                                    {convertTime(dataDetailEvent?.startDate)} -
                                    {convertTime(dataDetailEvent?.endDate)}
                                </p>
                            </div>
                        </Skeleton>
                        <Skeleton isLoaded={!!dataDetailEvent?.isOnline || !!dataDetailEvent?.location} className="h-6 mb-2 w-1/2 rounded-lg">
                            <div className="flex items-center gap-2 text-foreground-500">
                                <FaLocationDot width={16} />
                                <p>
                                    {dataDetailEvent?.isOnline ? "Online" : "Offline"}
                                    {dataDetailEvent?.isOnline ? "" : ` - ${dataDetailEvent?.location?.address}`}
                                </p>
                            </div>
                        </Skeleton>
                        <Skeleton isLoaded={!!dataDetailEvent?.banner} className="w-full aspect-video mb-4">
                            <Image 
                                alt="cover" 
                                src={dataDetailEvent?.banner && dataDetailEvent?.banner} 
                                className="aspect-video w-full rounded-lg object-cover"
                                width={1920}
                                height={1080}
                            />
                        </Skeleton>
                        <Tabs aria-label="Tab Detail Event" fullWidth>
                            <Tab key="Description" title="Description">
                                <h2 className="text-xl font-semibold text-foreground-700">
                                    About Event
                                </h2>
                                <Skeleton isLoaded={!!dataDetailEvent?.description} className="h-32 w-full rounded-lg mt-2">
                                    <p className="text-foreground-500">
                                        {dataDetailEvent?.description}
                                    </p>
                                </Skeleton>
                            </Tab>

                            <Tab key="Tickets" title="Tickets">
                                <h2 className="text-xl font-semibold text-foreground-700">Ticket</h2>
                                <div className="mt-2 flex flex-col gap-8">
                                    {dataTicket?.map((ticket: ITicket) => (
                                        <DetailEventTicket 
                                            key={`ticket-${ticket._id}`}
                                            ticket={ticket}
                                        />
                                    ))}
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                <div className="w-full lg:w-2/6"></div>
            </section>
        </div>
    );
};

export default DetailEvent;
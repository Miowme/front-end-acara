import { IEvent } from "@/types/Event";
import { cn } from "@/utils/cn";
import { convertTime } from "@/utils/date";
import { Card, CardBody, CardFooter, Skeleton } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

interface PropTypes {
    className?: string;
    event?: IEvent;
    isLoading?: boolean;
    key?: string;
}

const CardEvent = (props: PropTypes) => {
    const {event, className, isLoading, key} = props;
    return (
        <Card 
            shadow="sm" 
            isPressable 
            as={Link} 
            href={`/event/${event?.slug}`} 
            key={key} 
            className={cn(className, "cursor-pointer")}
        >
            {!isLoading ? (
                <Fragment>
                    <CardBody>
                        <Image 
                            alt="cover" 
                            src={`${event?.banner}`} 
                            width={1920} 
                            height={1080} 
                            className="aspect-video w-full rounded-lg object-cover"
                        />
                    </CardBody>
                    <CardFooter className="flex-col items-center pt-0 text-left">
                        <h2 className="line-clamp-1 text-lg font-bold text-danger">
                            {event?.name}
                        </h2>
                        <p className="mb-2 line-clamp-2">{event?.description}</p>
                        <p className="text-foreground-500">
                            {convertTime(`${event?.startDate}`)}
                        </p>
                    </CardFooter>
                </Fragment>
            ) : (
                <Fragment>
                    <CardBody>
                        <Skeleton className="rounded-lg aspect-video w-full bg-default-300" />
                    </CardBody>
                    <CardFooter className="flex flex-col items-start gap-2">
                        <Skeleton className="w-3/5 rounded-lg bg-default-200 h-4" />
                        <Skeleton className="w-4/5 rounded-lg bg-default-200 h-4" />
                        <Skeleton className="w-2/5 rounded-lg bg-default-200 h-4" />
                    </CardFooter>
                </Fragment>
            )}
        </Card>
    );
};

export default CardEvent;
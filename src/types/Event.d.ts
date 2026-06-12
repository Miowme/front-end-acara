import { DateValue } from "@nextui-org/react";

interface IRegency {
    id: string;
    name: string;
}

interface IEvent {
    _id?: string;
    name?: string;
    slug?: string;
    category?: string;
    isFeatured?:boolean | string;
    isPublish?: boolean | string;
    isOnline?: boolean | string;
    description?: string;
    startDate?: string | DateValue;
    endDate?: string | DateValue;
    location?: {
        address: string;
        region: string;
        coordinates: number[];
    }
    banner?: string | FileList;
}

interface IEventForm extends IEvent {
    region?: string;
    address?: string;
    latitude?: string;
    longitude?: string;
}

export type { IEvent, IRegency, IEventForm };
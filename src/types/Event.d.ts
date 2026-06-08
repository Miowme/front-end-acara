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
    startDate?: string;
    endDate?: string;
    location?: {
        address: string;
        region: string;
        coordinates: number[];
    }
    banner?: string | FileList;
}

interface IEventForm extends IEvent {
    region?: string;
    startDate?: DateValue;
    endDate?: DateValue;
    address?: string;
    latitude?: string;
    longitude?: string;
}

export type { IEvent, IRegency, IEventForm };
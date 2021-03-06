export interface User {
    id:        number;
    username:  string;
    email:     string;
    provider:  string;
    confirmed: boolean;
    blocked:   boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Event {
    id:         number;
    attributes: EventAttributes;
}

export interface EventMetadata {
    data: Event[],
    meta: Meta
}

export interface Meta {
    pagination: Pagination;
}

export interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface EventAttributes {
    name:        string;
    createdAt:   Date;
    updatedAt:   Date;
    publishedAt: Date;
    slug:        string;
    venue:       string;
    address:     string;
    date:        string;
    time:        string;
    performers:  string;
    description: string;
    image:       Image;
}

export interface Image {
    data: Data | null;
}

export interface Data {
    id:         number;
    attributes: DataAttributes;
}

export interface DataAttributes {
    name:              string;
    alternativeText:   null;
    caption:           null;
    width:             number;
    height:            number;
    formats:           Formats;
    hash:              string;
    ext:               string;
    mime:              string;
    size:              number;
    url:               string;
    previewUrl:        null;
    provider:          string;
    provider_metadata: ProviderMetadata;
    createdAt:         Date;
    updatedAt:         Date;
}

export interface Formats {
    thumbnail: ImageProperties;
    large:     ImageProperties;
    medium:    ImageProperties;
    small:     ImageProperties;
}

export interface ImageProperties {
    name:              string;
    hash:              string;
    ext:               string;
    mime:              string;
    width:             number;
    height:            number;
    size:              number;
    path:              null;
    url:               string;
    provider_metadata: ProviderMetadata;
}

export interface ProviderMetadata {
    public_id:     string;
    resource_type: ResourceType;
}

export enum ResourceType {
    Image = "image",
}

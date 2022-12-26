export interface GetSectionsData {
    _id:            string;
    name:           string;
    description:    string;
    customerCode:   CustomerCode;
    regionCode:     string;
    type:           string;
    status:         string;
    onMenu:         boolean;
    main:           boolean;
    renderingOrder: number;
    layout:         Layout;
    sections:       Section[];
}

export enum CustomerCode {
    Kten = "KTEN",
}

export interface Layout {
    _id:         string;
    name:        string;
    type:        string;
    description: string;
    doubleEntry: boolean;
}

export interface Section {
    title:             string;
    component:         string;
    componentMetadata: ComponentMetadata;
    renderingPosition: number;
    sectionId:         string;
    items:             Item[];
}

export interface ComponentMetadata {
    thumbnailVerticalAlign: string;
    thumbnailDetails:       ThumbnailDetails;
    activeType:             string;
}

export interface ThumbnailDetails {
    maxLines:      number;
    title:         boolean;
    innerTitle:    boolean;
    innerChapter:  boolean;
    innerDuration: boolean;
    background:    boolean;
    chapter:       boolean;
    date:          boolean;
    description:   boolean;
    gradient:      boolean;
}

export interface Item {
    id:                 string;
    videoUrl:           null | string;
    title:              string;
    image:              null | string;
    optimizedImage:     null | string;
    date:               number | null;
    commerce:           null;
    description?:       null | string;
    logo:               null;
    genre:              null;
    type:               Type;
    poster:             string;
    optimizedPoster:    string;
    customerCode?:      CustomerCode;
    midroll?:           null;
    preroll?:           null;
    guid?:              string;
    season:             null;
    serie:              null;
    mainCategory:       null;
    secondCategory:     null;
    featureCategory:    null;
    listClassification: null;
    keywords:           string[];
    mainProgram:        null;
    rating:             null;
    cast_field:         null;
    vast:               null | string;
    onItemSelected:     OnItemSelected;
    link?:              string;
    imageCaption?:      null;
    imageAltText?:      null | string;
    imageCredits?:      null;
    author?:            string;
    longDescription?:   null;
    customer_code?:     CustomerCode;
    section_id?:        null;
}

export interface OnItemSelected {
    actionType: ActionType;
    configs:    Configs;
}

export enum ActionType {
    Player = "PLAYER",
}

export interface Configs {
    linkTo: string;
    data:   any[];
}

export enum Type {
    Channel = "channel",
    Clip = "clip",
}

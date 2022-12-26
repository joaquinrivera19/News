export interface GetArticleByID {
    id:                 string;
    videoUrl:           string;
    link:               string;
    title:              string;
    image:              string;
    optimizedImage:     string;
    imageCaption:       null;
    imageAltText:       null;
    imageCredits:       null;
    author:             string;
    date:               number;
    dateUpdate:         number;
    commerce:           null;
    description:        string;
    longDescription:    string;
    logo:               null;
    genre:              null;
    type:               string;
    poster:             string;
    optimizedPoster:    string;
    customer_code:      string;
    section_id:         null;
    vast:               null;
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
    onItemSelected:     OnItemSelected;
}

export interface OnItemSelected {
    actionType: string;
    configs:    Configs;
}

export interface Configs {
    linkTo: string;
    data:   any[];
}

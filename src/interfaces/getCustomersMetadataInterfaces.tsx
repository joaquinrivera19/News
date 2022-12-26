export interface GetCustomersMetadata {
    displayName: string;
    config:      Config;
}

export interface Config {
    theme:    Theme;
    template: Template;
    features: Features;
    insight:  Insight;
    devices:  string[];
    general:  General;
    assets:   Assets;
    pages:    Page[];
}

export interface Assets {
    logo:                 string;
    placeholderLandscape: string;
    placeholderPortrait:  string;
}

export interface Features {
    ads:       Ads;
    analytics: Analytics;
    regions:   Regions;
}

export interface Ads {
    enabled: boolean;
}

export interface Analytics {
    enabled: boolean;
    client:  string;
}

export interface Regions {
    enabled: boolean;
    regions: Region[];
}

export interface Region {
    regionCode:  string;
    displayName: string;
}

export interface General {
    rtl: boolean;
}

export interface Insight {
    insightApiURL:    string;
    tenantId:         string;
    accountId:        string;
    entityForSeries:  string;
    entityForVods:    string;
    entityForStories: string;
}

export interface Page {
    _id:             string;
    name:            string;
    description:     string;
    customerCode:    string;
    regionCode:      string;
    type:            string;
    layout:          Layout;
    status:          string;
    onMenu:          boolean;
    main:            boolean;
    renderingOrder:  number;
    primaryEntity:   null;
    secondaryEntity: null;
    doubleEntry:     boolean;
    media:           string;
    icon:            Icon;
}

export interface Icon {
    selected:   string;
    unselected: string;
}

export interface Layout {
    _id:         string;
    name:        string;
    type:        string;
    description: string;
    doubleEntry: boolean;
    staticPage?: StaticPage;
}

export interface StaticPage {
    _id:          string;
    name:         string;
    defaultText?: DefaultText;
}

export interface DefaultText {
    relatedCarouselTitle: RelatedCarouselTitle;
}

export interface RelatedCarouselTitle {
    en: string;
    eb: string;
}

export interface Template {
    name:        string;
    layouts:     Layouts;
    dynamicText: DynamicText;
    ref:         Ref;
}

export interface DynamicText {
    exitDialog: ExitDialog;
}

export interface ExitDialog {
    title:        string;
    message:      string;
    cancelLabel:  string;
    confirmLabel: string;
}

export interface Layouts {
    Series:   Series;
    Articles: Articles;
    VOD:      VOD;
    LogIn:    Articles;
    Commerce: Articles;
}

export interface Articles {
    type: string;
}

export interface Series {
    type:   string;
    layout: Layout;
}

export interface VOD {
    type:        string;
    defaultText: DefaultText;
    layout:      Layout;
}

export interface Ref {
    _id:        string;
    name:       string;
    layouts:    Layout[];
    components: Component[];
}

export interface Component {
    _id:      string;
    name:     string;
    platform: Platform;
    category: Category;
}

export interface Category {
    _id:        string;
    name:       string;
    attributes: Attribute[];
}

export interface Attribute {
    name:    string;
    type:    Type;
    default: boolean | number | string;
    data:    Datum[];
}

export interface Datum {
    name:    string;
    type:    Type;
    default: boolean | number;
}

export enum Type {
    Boolean = "boolean",
    Number = "number",
    Object = "object",
    String = "string",
}

export interface Platform {
    smarttv: Mobile;
    web:     Mobile;
    mobile:  Mobile;
}

export interface Mobile {
    name:     string;
    metadata: Metadata;
}

export interface Metadata {
    thumbnailVerticalAlign?: string;
    thumbnailDetails:        ThumbnailDetails;
    activeType?:             string;
    isPortrait?:             boolean;
    thumbnailAlign?:         string;
    thumbnailType?:          string;
    thumbnailPosterType?:    string;
    thumbnailSize?:          string;
    height?:                 string;
    gradientBaseColor?:      string;
    titleMaxLines?:          number;
    paragraphMaxLines?:      number;
    textSize?:               string;
    textAlign?:              string;
    type?:                   string;
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
    gradient?:     boolean;
}

export interface Theme {
    mode:           string;
    buttonType:     string;
    playerGradient: string;
    thumbnails:     Thumbnails;
    colorPalette:   ColorPalette;
    font:           Font;
    screenLoaders:  ScreenLoaders;
}

export interface ColorPalette {
    dark:  Dark;
    light: Dark;
}

export interface Dark {
    primary:   string;
    secondary: string;
    tertiary:  string;
}

export interface Font {
    fontCDN:    string;
    fontFamily: string;
}

export interface ScreenLoaders {
    splash:    string;
    loader:    string;
    dotsColor: DotsColor;
}

export interface DotsColor {
    colorA: string;
    colorB: string;
    colorC: string;
}

export interface Thumbnails {
    borderRounded: boolean;
    shadow:        boolean;
}

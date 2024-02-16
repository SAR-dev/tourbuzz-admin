export interface HotelType {
    id: number
    districts_id: number
    images_id: number
    name: string
    map_link: string
    website: string
    review: string
    created_at: string
    updated_at: string
    district: DistrictType
    avatar: ImageType
}

export interface DistrictType {
    id: number
    name: string
    divisions_id: number
    division: DivisionType
}

export interface DivisionType {
    id: number
    name: string
}

export interface DivisionWithDistrictType {
    division: DivisionType
    districts: DistrictType[]
}

export interface ImageType {
    id: number
    title: string
    source_url: string
    thumbnail_url: string
    optimized_url: string
    created_at: string;
    updated_at: string;
}

export interface AdType {
    id: number
    title: string
    subtitle: string
    link: string
    image_url: string
    active: boolean
    created_at: string;
    updated_at: string;
}

export interface WriterType {
    id: number
    images_id: number
    email: string
    name: string
    username: string
    about: string
    contact_no: string
    website: string
    created_at: string;
    updated_at: string;
    avatar: ImageType | null
}

export interface ArticleType {
    id: number
    writers_id: number
    title: string
    category: string
    slug: string
    subtitle: string
    summary: string
    md_desc: string
    image_ids: string
    created_at: string;
    updated_at: string;
    writer: WriterType
    images: ImageType[]
}

export interface UserType {
    id: number
    email: number
    username: string
    name: string
    images_id: number
    last_logged_in: string
    created_at: string;
    updated_at: string;
    avatar: ImageType | null
}

export interface OrganizerType {
    id: number
    name: string
    username: string
    description: string
    slogan: string
    email: string
    images_id: number
    verification: string
    social_link: string
    contact_no: string
    created_at: string;
    updated_at: string;
    avatar: ImageType | null
}

export interface EnquiryListType {
    user: UserType
    enquiries: EnquiryType[]
}

export interface EnquiryType {
    id: number
    users_id: number
    question: string
    answer?: string
    answered_at: string
    created_at: string;
    updated_at: string;
}

export interface PlaceType {
    id: number
    images_id: number
    districts_id: number
    name: string
    postal_code: string
    map_link: string
    description: string
    type: string
    created_at: string;
    updated_at: string;
    district: DistrictType
    avatar: ImageType | null
}

export interface PackageType {
    id: number;
    status: string;
    tours_id: number;
    title: string;
    included: string
    excluded: string
    conditions: string
    price: number;
    created_at: string;
    updated_at: string;
}

export interface TourLogType {
    id: number;
    status: string;
    tours_id: number;
    hotels_id: number
    title: string;
    description: string;
    date: string;
    image_ids: string;
    created_at: string;
    updated_at: string;
    images: ImageType[]
    places: PlaceType[]
    hotel: HotelType
}

export interface ListTourType {
    id: number;
    tour_types_id: number;
    organizers_id: number;
    images_id: number;
    title: string;
    video_link: string;
    slug: string;
    highlight: string;
    group_size: string;
    group_info: string;
    transports: string;
    start_at: string;
    finish_at: string;
    last_sell_at: string;
    image_ids: string;
    created_at: string;
    updated_at: string;
    tour_type_name: string;
    organizer_name: string;
    organizer_verification: string;
    place_names_list: string[];
    district_names_list: string[];
    package_prices_list: number[];
    images: ImageType[];
    avatar: ImageType;
    expired: boolean;
}

export interface TourType {
    id: number
    tour_types_id: number
    organizers_id: number
    images_id: number
    title: string
    slug: string
    md_desc: string
    highlights: string
    faq: string
    video_link: string
    group_size: string
    group_info: string
    transports: string
    cancel_ins: string
    start_ins: string
    finish_ins: string
    start_at: string
    finish_at: string
    last_sell_at: string
    image_ids: string
    max_ticket_amount: number
    created_at: string;
    updated_at: string;

    organizer: OrganizerType
    avatar: ImageType
    images: ImageType[]
    tour_type: TypeOfTour
    packages: PackageType[]
    tour_logs: TourLogType[]
}

// PAYLOADS

export interface CreateAdType {
    title: string
    subtitle: string
    link: string
    image_url: string
    active: boolean
}

export interface UpdateAdType {
    ads_id: number
    title: string
    subtitle: string
    link: string
    image_url: string
    active: boolean
}

export interface CreateWriterType {
    images_id: number
    email: string
    name: string
    username: string
    about: string
    contact_no: string
    website: string
}

export interface CreateOrganizerType {
    images_id: number
    email: string
    name: string
    username: string
    description: string
    slogan: string
    contact_no: string
    verification: string
    social_link: string
}

export interface UpdateOrganizerType {
    organizers_id: number
    images_id: number
    email: string
    name: string
    username: string
    description: string
    slogan: string
    contact_no: string
    verification: string
    social_link: string
}

export interface CreateHotelType {
    districts_id: number
    images_id: number
    name: string
    map_link: string
    review: string
    website: string
}

export interface UpdateHotelType {
    hotels_id: number
    districts_id: number
    images_id: number
    name: string
    map_link: string
    review: string
    website: string
}

export interface CreatePlaceType {
    images_id: number
    districts_id: number
    name: string
    postal_code: string
    map_link: string
    type: string
    description: string
}

export interface UpdatePlaceType {
    places_id: number
    images_id: number
    districts_id: number
    name: string
    postal_code: string
    map_link: string
    description: string
    type: string
}

export interface CreateArticleType {
    title: string
    category: string
    slug: string
    subtitle: string
    summary: string
    md_desc: string
    image_ids: number[]
    writers_id: number
}

export interface UpdateWriterType {
    writers_id: number
    images_id: number
    email: string
    name: string
    username: string
    about: string
    contact_no: string
    website: string
}

export interface UpdateArticleType {
    articles_id: number
    title: string
    category: string
    slug: string
    subtitle: string
    summary: string
    md_desc: string
    image_ids: number[]
    writers_id: number
}

export interface CreateTourLogtype {
    tours_id: number
    hotels_id: number | null
    title: string
    description: string
    date: string
    place_ids: number[]
    image_ids: number[]
}

export interface CreateTourPackageType {
    tours_id: number
    title: string
    included: string
    excluded: string
    conditions: string
    price: number
}

export interface CreateTourType {
    tour: TourCreatePayload
    tour_logs: TourLogCreatePayload[]
    packages: TourPackageCreatePayload[]
}

export interface UpdateTourType {
    tour: TourUpdatePayload
    tour_logs: TourLogUpdatePayload[]
    packages: TourPackageUpdatePayload[]
}

interface TourCreatePayload {
    tour_types_id: number
    organizers_id: number
    images_id: number
    title: string
    slug: string
    md_desc: string
    highlights: string
    faq: string
    video_link: string
    group_size: string
    group_info: string
    transports: string
    cancel_ins: string
    start_ins: string
    finish_ins: string
    start_at: string
    finish_at: string
    last_sell_at: string
    max_ticket_amount: number
    image_ids: number[]
}

interface TourUpdatePayload extends TourCreatePayload {
    id: number
}

interface TourLogCreatePayload {
    hotels_id: number | null
    title: string
    description: string
    date: string
    place_ids: number[]
    image_ids: number[]
}

interface TourLogUpdatePayload extends TourLogCreatePayload {
    id: number
}

interface TourPackageCreatePayload {
    title: string
    included: string
    excluded: string
    conditions: string
    price: number
}

interface TourPackageUpdatePayload extends TourPackageCreatePayload {
    id: number
}

export interface DivisionWithDistrictData {
    data: DivisionWithDistrictType[]
}

export interface TypeOfPlace {
    type: string
    count: number
}

export interface TypeOfPlaceData {
    data: TypeOfPlace[]
}

export interface ArticleCategory {
    category: string
    count: number
}

export interface ArticleCategoryData {
    data: ArticleCategory[]
}

export interface TypeOfTour {
    id: number
    name: string
    slug: string
    details: string
    created_at: string;
    updated_at: string;
}

export interface ParsedErrorMessageProps {
    status?: number
    message: string
}

export interface RawErrorMessageProps {
    message: string
    name: string
    config: Config
    code: string
    response?: Response
}

interface Config {
    timeout: number
    xsrfCookieName: string
    xsrfHeaderName: string
    maxContentLength: number
    maxBodyLength: number
    headers: Headers
    baseURL: string
    method: string
    url: string
    data: string
}

interface Response {
    data: Data
}

interface Data {
    error: string
    message: string
    status: number
    timestamp: string
    trace: string
}

export function parseErrorMessage(
    err: RawErrorMessageProps
): ParsedErrorMessageProps {
    const res: ParsedErrorMessageProps = { status: 400, message: "" }
    if (err.response) {
        res.status = err.response.data.status
        res.message = err.response.data.message
    } else {
        res.message = err.message
    }
    return res
}

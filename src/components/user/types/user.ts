export interface User {

    full_name: string;
    user_image: string;
    user_biography: string;
    contact: Array<{
        contact_media: string,
        contact_url: string,
        other: string,
        other_identifier: string,  
    }>;
}
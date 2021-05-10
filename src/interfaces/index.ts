export interface IUserAccount {
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    full_name: string;
    id: number;
}

export interface IUserAccountUpdate {
    email?: string;
    full_name?: string;
    password?: string;
    is_active?: boolean;
    is_superuser?: boolean;
}

export interface IUserAccountCreate {
    email: string;
    full_name?: string;
    password?: string;
    is_active?: boolean;
    is_superuser?: boolean;
}

export interface IUserProfile {
    resume: string;
    years_of_experience: number;
    years_of_remote_experience: number;
    english_proficiency: string;
    is_available: boolean;
    preferred_role: string;
    current_annual_salary: number;
    skills: [];
    education: [];
    experience: [];
    side_projects: [];
    publications: [];
    certifications_awards: [];
    owner_id: number;
    id: number;
}

export interface IUserProfileUpdate {
    resume?: string;
    years_of_experience?: number;
    years_of_remote_experience?: number;
    english_proficiency?: string;
    is_available: boolean;
    preferred_role?: string;
    current_annual_salary?: number;
    skills?: [];
    education?: [];
    experience?: [];
    side_projects?: [];
    publications?: [];
    certifications_awards?: [];
}

export interface IUserProfileCreate {
    resume?: string;
    years_of_experience?: number;
    years_of_remote_experience?: number;
    english_proficiency?: string;
    is_available: boolean;
    preferred_role?: string;
    current_annual_salary?: number;
    skills?: [];
    education?: [];
    experience?: [];
    side_projects?: [];
    publications?: [];
    certifications_awards?: [];
}

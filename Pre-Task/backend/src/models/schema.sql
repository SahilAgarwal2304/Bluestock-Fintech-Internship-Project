-- This file is located in: backend/src/models/schema.sql

-- 1. USERS TABLE
CREATE TABLE public.users (
    id SERIAL PRIMARY KEY,
    username character varying(100),
    email character varying(255) NOT NULL UNIQUE,
    password text,
    full_name character varying(255),
    profile_photo text,
    google_uid character varying(255),
    signup_type character varying(1) DEFAULT 'e',
    location text,
    resume text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    role integer DEFAULT 3,
    dob date,
    preference integer,
    mobile_no character varying(20) UNIQUE,
    ac_status integer DEFAULT 1,
    gender character(1),
    heading character varying(200),
    is_mail_verified boolean DEFAULT false,
    is_mo_verified boolean DEFAULT false,
    first_name character varying(255),
    last_name character varying(255),
    CONSTRAINT gender_check CHECK (gender IN ('M', 'F', 'O', 'm', 'f', 'o')),
    CONSTRAINT users_signup_type_check CHECK (signup_type IN ('g', 'e', 'm', 't'))
);

-- 2. COMPANY PROFILE TABLE
CREATE TABLE public.company_profile (
    id SERIAL PRIMARY KEY,
    owner_id integer,
    company_logo_url text,
    company_banner_url text,
    company_name character varying(255),
    about_company text,
    organizations_type character varying(50),
    industry_type character varying(50),
    team_size character varying(20),
    year_of_establishment date,
    company_website text,
    company_app_link text,
    company_vision text,
    headquarter_phone_no character varying(20),
    social_links jsonb,
    map_location_url text,
    careers_link text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_claimed boolean DEFAULT false,
    headquarter_mail_id character varying(255),
    CONSTRAINT company_profile_owner_id_fkey 
        FOREIGN KEY (owner_id) REFERENCES public.users(id)
);

-- 3. TRIGGERS
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_modtime
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_company_profile_modtime
BEFORE UPDATE ON company_profile
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();
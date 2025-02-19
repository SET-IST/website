--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1 (Debian 16.1-1.pgdg120+1)
-- Dumped by pg_dump version 16.1 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: ActivityType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ActivityType" AS ENUM (
    'Lecture',
    'Workshop',
    'SpeedInterview'
);


ALTER TYPE public."ActivityType" OWNER TO postgres;

--
-- Name: AwardType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."AwardType" AS ENUM (
    'NORMAL',
    'SPECIAL'
);


ALTER TYPE public."AwardType" OWNER TO postgres;

--
-- Name: CompanyCategory; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."CompanyCategory" AS ENUM (
    'Platinum',
    'Gold',
    'Silver'
);


ALTER TYPE public."CompanyCategory" OWNER TO postgres;

--
-- Name: ObjectType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ObjectType" AS ENUM (
    'COMPANY',
    'REDEEM'
);


ALTER TYPE public."ObjectType" OWNER TO postgres;

--
-- Name: UserType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."UserType" AS ENUM (
    'Student',
    'Company',
    'Staff'
);


ALTER TYPE public."UserType" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Account" (
    id text NOT NULL,
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text
);


ALTER TABLE public."Account" OWNER TO postgres;

--
-- Name: Activity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Activity" (
    id integer NOT NULL,
    title character varying(60) NOT NULL,
    description character varying(128) NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    duration integer NOT NULL,
    location character varying(60) NOT NULL,
    type public."ActivityType" NOT NULL
);


ALTER TABLE public."Activity" OWNER TO postgres;

--
-- Name: ActivityEnrollment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ActivityEnrollment" (
    "activityId" integer NOT NULL,
    confirmed boolean NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."ActivityEnrollment" OWNER TO postgres;

--
-- Name: Activity_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Activity_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Activity_id_seq" OWNER TO postgres;

--
-- Name: Activity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Activity_id_seq" OWNED BY public."Activity".id;


--
-- Name: AwardToken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."AwardToken" (
    id text NOT NULL,
    type public."AwardType" NOT NULL,
    "studentId" integer NOT NULL
);


ALTER TABLE public."AwardToken" OWNER TO postgres;

--
-- Name: CV; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CV" (
    id integer NOT NULL,
    "cvLocation" character varying(128) NOT NULL,
    "studentId" integer NOT NULL
);


ALTER TABLE public."CV" OWNER TO postgres;

--
-- Name: CV_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CV_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CV_id_seq" OWNER TO postgres;

--
-- Name: CV_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CV_id_seq" OWNED BY public."CV".id;


--
-- Name: CompanyDetails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CompanyDetails" (
    id integer NOT NULL,
    category public."CompanyCategory" NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    "userId" text NOT NULL,
    description character varying(150) NOT NULL,
    "linkHref" text,
    "linkText" character varying(30)
);


ALTER TABLE public."CompanyDetails" OWNER TO postgres;

--
-- Name: CompanyDetails_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CompanyDetails_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CompanyDetails_id_seq" OWNER TO postgres;

--
-- Name: CompanyDetails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CompanyDetails_id_seq" OWNED BY public."CompanyDetails".id;


--
-- Name: QRCode; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."QRCode" (
    id text NOT NULL,
    "objectId" text NOT NULL,
    "objectType" public."ObjectType" NOT NULL
);


ALTER TABLE public."QRCode" OWNER TO postgres;

--
-- Name: Session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Session" (
    id text NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Session" OWNER TO postgres;

--
-- Name: StudentDetails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."StudentDetails" (
    id integer NOT NULL,
    scans integer DEFAULT 0 NOT NULL,
    points integer DEFAULT 0 NOT NULL,
    course character varying(128) NOT NULL,
    university character varying(128) NOT NULL,
    companies_ids text[],
    "userId" text NOT NULL,
    redeems integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."StudentDetails" OWNER TO postgres;

--
-- Name: StudentDetails_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."StudentDetails_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."StudentDetails_id_seq" OWNER TO postgres;

--
-- Name: StudentDetails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."StudentDetails_id_seq" OWNED BY public."StudentDetails".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    "emailVerified" timestamp(3) without time zone,
    image text,
    "readChangelog" boolean DEFAULT true NOT NULL,
    role public."UserType" DEFAULT 'Student'::public."UserType" NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: VerificationToken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VerificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."VerificationToken" OWNER TO postgres;

--
-- Name: _ActivityToCompanyDetails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_ActivityToCompanyDetails" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_ActivityToCompanyDetails" OWNER TO postgres;

--
-- Name: _CompanyDetailsToStudentDetails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_CompanyDetailsToStudentDetails" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_CompanyDetailsToStudentDetails" OWNER TO postgres;

--
-- Name: Activity id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Activity" ALTER COLUMN id SET DEFAULT nextval('public."Activity_id_seq"'::regclass);


--
-- Name: CV id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CV" ALTER COLUMN id SET DEFAULT nextval('public."CV_id_seq"'::regclass);


--
-- Name: CompanyDetails id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompanyDetails" ALTER COLUMN id SET DEFAULT nextval('public."CompanyDetails_id_seq"'::regclass);


--
-- Name: StudentDetails id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StudentDetails" ALTER COLUMN id SET DEFAULT nextval('public."StudentDetails_id_seq"'::regclass);


--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Account" (id, "userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) FROM stdin;
clplplrkr00010ls7dhpgufv0	97e4e38e-60a4-4e68-8839-d50d1cc891ef	credentials	credentials	97e4e38e-60a4-4e68-8839-d50d1cc891ef	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: Activity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Activity" (id, title, description, date, duration, location, type) FROM stdin;
1	Example activity	Example activity description	2023-12-04 15:30:00	120	0-75	Workshop
\.


--
-- Data for Name: ActivityEnrollment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ActivityEnrollment" ("activityId", confirmed, "userId") FROM stdin;
\.


--
-- Data for Name: AwardToken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AwardToken" (id, type, "studentId") FROM stdin;
\.


--
-- Data for Name: CV; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CV" (id, "cvLocation", "studentId") FROM stdin;
\.


--
-- Data for Name: CompanyDetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CompanyDetails" (id, category, username, password, "userId", description, "linkHref", "linkText") FROM stdin;
1	Silver	example	$2b$10$S9O.FjIczBMD7b.PS86/qOi8eQWlLMc4dod/WsF5tDQAW6goeFd6O	97e4e38e-60a4-4e68-8839-d50d1cc891ef		\N	\N
\.


--
-- Data for Name: QRCode; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."QRCode" (id, "objectId", "objectType") FROM stdin;
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Session" (id, "sessionToken", "userId", expires) FROM stdin;
\.


--
-- Data for Name: StudentDetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."StudentDetails" (id, scans, points, course, university, companies_ids, "userId", redeems) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, "emailVerified", image, "readChangelog", role) FROM stdin;
97e4e38e-60a4-4e68-8839-d50d1cc891ef	Example company	example_company@example.com	\N	\N	t	Company
\.


--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VerificationToken" (identifier, token, expires) FROM stdin;
\.


--
-- Data for Name: _ActivityToCompanyDetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_ActivityToCompanyDetails" ("A", "B") FROM stdin;
1	1
\.


--
-- Data for Name: _CompanyDetailsToStudentDetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_CompanyDetailsToStudentDetails" ("A", "B") FROM stdin;
\.


--
-- Name: Activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Activity_id_seq"', 1, true);


--
-- Name: CV_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CV_id_seq"', 1, false);


--
-- Name: CompanyDetails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CompanyDetails_id_seq"', 1, true);


--
-- Name: StudentDetails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."StudentDetails_id_seq"', 4, true);


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- Name: Activity Activity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Activity"
    ADD CONSTRAINT "Activity_pkey" PRIMARY KEY (id);


--
-- Name: AwardToken AwardToken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AwardToken"
    ADD CONSTRAINT "AwardToken_pkey" PRIMARY KEY (id);


--
-- Name: CV CV_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CV"
    ADD CONSTRAINT "CV_pkey" PRIMARY KEY (id);


--
-- Name: CompanyDetails CompanyDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompanyDetails"
    ADD CONSTRAINT "CompanyDetails_pkey" PRIMARY KEY (id);


--
-- Name: QRCode QRCode_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."QRCode"
    ADD CONSTRAINT "QRCode_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: StudentDetails StudentDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StudentDetails"
    ADD CONSTRAINT "StudentDetails_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Account_provider_providerAccountId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON public."Account" USING btree (provider, "providerAccountId");


--
-- Name: ActivityEnrollment_userId_activityId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ActivityEnrollment_userId_activityId_key" ON public."ActivityEnrollment" USING btree ("userId", "activityId");


--
-- Name: AwardToken_studentId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "AwardToken_studentId_key" ON public."AwardToken" USING btree ("studentId");


--
-- Name: CV_studentId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "CV_studentId_key" ON public."CV" USING btree ("studentId");


--
-- Name: CompanyDetails_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "CompanyDetails_userId_key" ON public."CompanyDetails" USING btree ("userId");


--
-- Name: CompanyDetails_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "CompanyDetails_username_key" ON public."CompanyDetails" USING btree (username);


--
-- Name: Session_sessionToken_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");


--
-- Name: StudentDetails_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "StudentDetails_userId_key" ON public."StudentDetails" USING btree ("userId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: VerificationToken_identifier_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON public."VerificationToken" USING btree (identifier, token);


--
-- Name: VerificationToken_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "VerificationToken_token_key" ON public."VerificationToken" USING btree (token);


--
-- Name: _ActivityToCompanyDetails_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_ActivityToCompanyDetails_AB_unique" ON public."_ActivityToCompanyDetails" USING btree ("A", "B");


--
-- Name: _ActivityToCompanyDetails_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_ActivityToCompanyDetails_B_index" ON public."_ActivityToCompanyDetails" USING btree ("B");


--
-- Name: _CompanyDetailsToStudentDetails_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_CompanyDetailsToStudentDetails_AB_unique" ON public."_CompanyDetailsToStudentDetails" USING btree ("A", "B");


--
-- Name: _CompanyDetailsToStudentDetails_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_CompanyDetailsToStudentDetails_B_index" ON public."_CompanyDetailsToStudentDetails" USING btree ("B");


--
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ActivityEnrollment ActivityEnrollment_activityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ActivityEnrollment"
    ADD CONSTRAINT "ActivityEnrollment_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES public."Activity"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ActivityEnrollment ActivityEnrollment_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ActivityEnrollment"
    ADD CONSTRAINT "ActivityEnrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."StudentDetails"("userId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: AwardToken AwardToken_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AwardToken"
    ADD CONSTRAINT "AwardToken_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public."StudentDetails"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CV CV_studentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CV"
    ADD CONSTRAINT "CV_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public."StudentDetails"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CompanyDetails CompanyDetails_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompanyDetails"
    ADD CONSTRAINT "CompanyDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: StudentDetails StudentDetails_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StudentDetails"
    ADD CONSTRAINT "StudentDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _ActivityToCompanyDetails _ActivityToCompanyDetails_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_ActivityToCompanyDetails"
    ADD CONSTRAINT "_ActivityToCompanyDetails_A_fkey" FOREIGN KEY ("A") REFERENCES public."Activity"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ActivityToCompanyDetails _ActivityToCompanyDetails_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_ActivityToCompanyDetails"
    ADD CONSTRAINT "_ActivityToCompanyDetails_B_fkey" FOREIGN KEY ("B") REFERENCES public."CompanyDetails"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CompanyDetailsToStudentDetails _CompanyDetailsToStudentDetails_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_CompanyDetailsToStudentDetails"
    ADD CONSTRAINT "_CompanyDetailsToStudentDetails_A_fkey" FOREIGN KEY ("A") REFERENCES public."CompanyDetails"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CompanyDetailsToStudentDetails _CompanyDetailsToStudentDetails_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_CompanyDetailsToStudentDetails"
    ADD CONSTRAINT "_CompanyDetailsToStudentDetails_B_fkey" FOREIGN KEY ("B") REFERENCES public."StudentDetails"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


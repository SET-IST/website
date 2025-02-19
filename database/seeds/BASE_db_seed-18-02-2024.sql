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
-- Name: EventLogType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."EventLogType" AS ENUM (
    'POINTS',
    'AWARDS',
    'ENROLLMENTS'
);


ALTER TYPE public."EventLogType" OWNER TO postgres;

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
    type public."ActivityType" NOT NULL,
    "idHash" text NOT NULL
);


ALTER TABLE public."Activity" OWNER TO postgres;

--
-- Name: ActivityEnrollment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ActivityEnrollment" (
    "userId" text NOT NULL,
    "activityId" integer NOT NULL,
    confirmed boolean NOT NULL
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
    "userId" text NOT NULL
);


ALTER TABLE public."AwardToken" OWNER TO postgres;

--
-- Name: CompanyDetails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CompanyDetails" (
    id integer NOT NULL,
    category public."CompanyCategory" NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    "userId" text NOT NULL,
    description character varying(500) NOT NULL,
    "linkHref" text,
    "linkText" character varying(40),
    scans integer DEFAULT 0 NOT NULL
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
-- Name: Day; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Day" (
    id integer NOT NULL,
    "dateCode" text NOT NULL
);


ALTER TABLE public."Day" OWNER TO postgres;

--
-- Name: Day_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Day_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Day_id_seq" OWNER TO postgres;

--
-- Name: Day_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Day_id_seq" OWNED BY public."Day".id;


--
-- Name: EventLog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EventLog" (
    id integer NOT NULL,
    "timestamp" timestamp(3) without time zone NOT NULL,
    type public."EventLogType" NOT NULL,
    description text NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."EventLog" OWNER TO postgres;

--
-- Name: EventLog_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EventLog_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EventLog_id_seq" OWNER TO postgres;

--
-- Name: EventLog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EventLog_id_seq" OWNED BY public."EventLog".id;


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
    "cvLocation" character varying(128),
    scans integer DEFAULT 0 NOT NULL,
    points integer DEFAULT 0 NOT NULL,
    course character varying(128) NOT NULL,
    university character varying(128) NOT NULL,
    companies_ids text[],
    "userId" text NOT NULL,
    redeems integer DEFAULT 0 NOT NULL,
    "phoneNumber" text
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
-- Name: _CompanyDetailsToDay; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_CompanyDetailsToDay" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_CompanyDetailsToDay" OWNER TO postgres;

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
-- Name: CompanyDetails id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompanyDetails" ALTER COLUMN id SET DEFAULT nextval('public."CompanyDetails_id_seq"'::regclass);


--
-- Name: Day id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Day" ALTER COLUMN id SET DEFAULT nextval('public."Day_id_seq"'::regclass);


--
-- Name: EventLog id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventLog" ALTER COLUMN id SET DEFAULT nextval('public."EventLog_id_seq"'::regclass);


--
-- Name: StudentDetails id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StudentDetails" ALTER COLUMN id SET DEFAULT nextval('public."StudentDetails_id_seq"'::regclass);


--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Account" (id, "userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) FROM stdin;
cls7uxczs001j128wel3bijcy	8d8f7301-c432-4f14-ba89-a3df4dcaff2b	credentials	credentials	8d8f7301-c432-4f14-ba89-a3df4dcaff2b	\N	\N	\N	\N	\N	\N	\N
cls7uxd0f001k128wexkxtq3w	99340879-19c5-4728-aac7-f10105310821	credentials	credentials	99340879-19c5-4728-aac7-f10105310821	\N	\N	\N	\N	\N	\N	\N
cls7uxd0g001l128wldyh2bz7	0c879510-1859-41ca-b1c4-16b750879f2e	credentials	credentials	0c879510-1859-41ca-b1c4-16b750879f2e	\N	\N	\N	\N	\N	\N	\N
cls7uxd0h001m128wzdvtiru2	55cbaef7-264e-4f84-9f64-1c226d15a700	credentials	credentials	55cbaef7-264e-4f84-9f64-1c226d15a700	\N	\N	\N	\N	\N	\N	\N
cls7uxd14001n128w2dazlqjj	22d4022b-d993-47e2-a763-f72af962226a	credentials	credentials	22d4022b-d993-47e2-a763-f72af962226a	\N	\N	\N	\N	\N	\N	\N
cls7uxd1u001p128wml15kg02	74181410-cecf-4a9a-b503-d6d0c085bf1e	credentials	credentials	74181410-cecf-4a9a-b503-d6d0c085bf1e	\N	\N	\N	\N	\N	\N	\N
cls7uxd1u001q128wyko4l1ke	1001fb17-aa4f-4522-bfaa-bf26fd81fcaf	credentials	credentials	1001fb17-aa4f-4522-bfaa-bf26fd81fcaf	\N	\N	\N	\N	\N	\N	\N
cls7uxd1u001o128wdw62t92u	25a43774-73ce-41a2-876e-0d3e96ba9eeb	credentials	credentials	25a43774-73ce-41a2-876e-0d3e96ba9eeb	\N	\N	\N	\N	\N	\N	\N
cls7uxd2h001r128wwis36kc5	ca759c3d-1e2a-4c67-8ff1-31fe0eac91ca	credentials	credentials	ca759c3d-1e2a-4c67-8ff1-31fe0eac91ca	\N	\N	\N	\N	\N	\N	\N
cls7uxd37001t128wsoaqszis	cdb54fc6-f738-4177-b13f-4869d6f2a7f2	credentials	credentials	cdb54fc6-f738-4177-b13f-4869d6f2a7f2	\N	\N	\N	\N	\N	\N	\N
cls7uxd37001s128whncocjcb	eebe2341-c821-44d2-a831-a299c496c54b	credentials	credentials	eebe2341-c821-44d2-a831-a299c496c54b	\N	\N	\N	\N	\N	\N	\N
cls7uxd37001u128wplef9xc3	ab748943-c12c-4fd0-98cf-0b7009d83812	credentials	credentials	ab748943-c12c-4fd0-98cf-0b7009d83812	\N	\N	\N	\N	\N	\N	\N
cls7uxd3u001v128w2i5v2dft	246ac14e-1fc3-4d86-90de-164bdb9b53d9	credentials	credentials	246ac14e-1fc3-4d86-90de-164bdb9b53d9	\N	\N	\N	\N	\N	\N	\N
cls7uxd4m001x128wqayq687m	7c0b4e5f-40ee-4344-be56-b8574c85976b	credentials	credentials	7c0b4e5f-40ee-4344-be56-b8574c85976b	\N	\N	\N	\N	\N	\N	\N
cls7uxd4m001y128wko8u44ta	88242669-3d5a-4d9c-8ba3-c6acb0513a1f	credentials	credentials	88242669-3d5a-4d9c-8ba3-c6acb0513a1f	\N	\N	\N	\N	\N	\N	\N
cls7uxd4m001w128w30ia7qzb	68e4b620-bcf0-47a4-b2b0-1a2ef60aec12	credentials	credentials	68e4b620-bcf0-47a4-b2b0-1a2ef60aec12	\N	\N	\N	\N	\N	\N	\N
cls7uxd58001z128whegubr74	9cd946b4-9ed5-4859-ac92-65ec9fa3f1bf	credentials	credentials	9cd946b4-9ed5-4859-ac92-65ec9fa3f1bf	\N	\N	\N	\N	\N	\N	\N
cls7uxd5y0020128w09yc7sn3	68b85543-781c-4c54-b24c-c63bc500d950	credentials	credentials	68b85543-781c-4c54-b24c-c63bc500d950	\N	\N	\N	\N	\N	\N	\N
cls7uxd5y0021128w6oawfm7l	c5a53dda-7aaa-4e36-84b9-4f97ac5729c8	credentials	credentials	c5a53dda-7aaa-4e36-84b9-4f97ac5729c8	\N	\N	\N	\N	\N	\N	\N
cls7uxd5y0022128wmkjm4g29	23cef6d6-0667-404d-a06d-15ff0e3d86f6	credentials	credentials	23cef6d6-0667-404d-a06d-15ff0e3d86f6	\N	\N	\N	\N	\N	\N	\N
cls7uxd6m0023128wx8fhnm3m	321071c2-2b46-4883-9aad-a2acc7197a84	credentials	credentials	321071c2-2b46-4883-9aad-a2acc7197a84	\N	\N	\N	\N	\N	\N	\N
cls7uxd7c0024128whoe0oarj	6fbdcc99-c890-46a0-8c89-e40c0ac2f391	credentials	credentials	6fbdcc99-c890-46a0-8c89-e40c0ac2f391	\N	\N	\N	\N	\N	\N	\N
cls7uxd7c0026128wkccsl61n	7e1c70ac-fd82-4b0f-aa82-cb85066a2521	credentials	credentials	7e1c70ac-fd82-4b0f-aa82-cb85066a2521	\N	\N	\N	\N	\N	\N	\N
cls7uxd7c0025128wcdmyaetv	b8a4ca6a-9a54-4b8d-9388-0158834b50e2	credentials	credentials	b8a4ca6a-9a54-4b8d-9388-0158834b50e2	\N	\N	\N	\N	\N	\N	\N
cls7uxd7x0027128wpomcrpbz	981790be-3c92-4a7f-ab51-ea0480c46178	credentials	credentials	981790be-3c92-4a7f-ab51-ea0480c46178	\N	\N	\N	\N	\N	\N	\N
cls7uxd8m0028128wi25jlj09	7ddabdf6-eb6f-4636-9fbd-47c044f42467	credentials	credentials	7ddabdf6-eb6f-4636-9fbd-47c044f42467	\N	\N	\N	\N	\N	\N	\N
cls7uxd8m0029128wohs73ny4	15d28ec1-7e92-4543-8c97-dfe5eed53d52	credentials	credentials	15d28ec1-7e92-4543-8c97-dfe5eed53d52	\N	\N	\N	\N	\N	\N	\N
cls7uxd8m002a128wt3ik6tsg	fbadb5ae-55f5-4608-9e63-d0135e9d1fa4	credentials	credentials	fbadb5ae-55f5-4608-9e63-d0135e9d1fa4	\N	\N	\N	\N	\N	\N	\N
cls7uxd99002b128wriplff9q	57409bbb-ec3e-42b1-b606-d032093ec6ec	credentials	credentials	57409bbb-ec3e-42b1-b606-d032093ec6ec	\N	\N	\N	\N	\N	\N	\N
cls7uxda0002d128wmt4rwmpb	18c6ed4c-e408-4087-b4ee-be2eda93019c	credentials	credentials	18c6ed4c-e408-4087-b4ee-be2eda93019c	\N	\N	\N	\N	\N	\N	\N
cls7uxda0002c128wvamfhjjf	6de826c7-e5f0-493b-bfef-71a8d5ff6b81	credentials	credentials	6de826c7-e5f0-493b-bfef-71a8d5ff6b81	\N	\N	\N	\N	\N	\N	\N
cls7uxda0002e128w6lhmf4rr	6425fff0-7651-4386-9fbc-d5817d1b8b20	credentials	credentials	6425fff0-7651-4386-9fbc-d5817d1b8b20	\N	\N	\N	\N	\N	\N	\N
cls7uxdal002f128w3l5eeuiv	1305a95e-5a3a-4e27-8ef4-eb1f13ddd019	credentials	credentials	1305a95e-5a3a-4e27-8ef4-eb1f13ddd019	\N	\N	\N	\N	\N	\N	\N
cls7uxdbc002g128wfpyjbjcr	7352e512-07ca-498b-be38-f4ec23ab9674	credentials	credentials	7352e512-07ca-498b-be38-f4ec23ab9674	\N	\N	\N	\N	\N	\N	\N
cls7uxdbc002h128wbdr0wkhg	3771b409-ed2a-409a-8cde-0cdf498a5300	credentials	credentials	3771b409-ed2a-409a-8cde-0cdf498a5300	\N	\N	\N	\N	\N	\N	\N
cls7uxdby002j128wwxr4mnmi	a6c0640b-5f75-4574-ac45-c23ba6852d7c	credentials	credentials	a6c0640b-5f75-4574-ac45-c23ba6852d7c	\N	\N	\N	\N	\N	\N	\N
cls7uxdcp002k128w6s4s49jb	cea899e8-14c2-4e04-b2a9-2746b9264539	credentials	credentials	cea899e8-14c2-4e04-b2a9-2746b9264539	\N	\N	\N	\N	\N	\N	\N
cls7uxdcq002l128wgr0zxktq	d3bf6d49-cb00-4581-9dc7-f0dfff411530	credentials	credentials	d3bf6d49-cb00-4581-9dc7-f0dfff411530	\N	\N	\N	\N	\N	\N	\N
cls7uxdcq002m128wgwhxou3l	032b2d1b-9a0a-4b46-896c-0754b7590ca8	credentials	credentials	032b2d1b-9a0a-4b46-896c-0754b7590ca8	\N	\N	\N	\N	\N	\N	\N
cls7uxddb002n128wtp6apunz	c866dd09-5011-40ff-89f8-dd025c090254	credentials	credentials	c866dd09-5011-40ff-89f8-dd025c090254	\N	\N	\N	\N	\N	\N	\N
cls7uxde2002o128wmjheol52	e9c725ea-0762-4475-bdea-13c8302f4d91	credentials	credentials	e9c725ea-0762-4475-bdea-13c8302f4d91	\N	\N	\N	\N	\N	\N	\N
cls7uxde3002p128wgz2ns8rk	a8136c86-d72d-4355-a11b-c0ea726611ea	credentials	credentials	a8136c86-d72d-4355-a11b-c0ea726611ea	\N	\N	\N	\N	\N	\N	\N
cls7uxde3002q128ws15eotxx	c3607698-bbf2-4a11-a1c7-a7f768d4a677	credentials	credentials	c3607698-bbf2-4a11-a1c7-a7f768d4a677	\N	\N	\N	\N	\N	\N	\N
cls7uxdeo002r128w9kj1n6g3	7c16abf8-2cab-4eae-bbd7-aa1a6ee45f47	credentials	credentials	7c16abf8-2cab-4eae-bbd7-aa1a6ee45f47	\N	\N	\N	\N	\N	\N	\N
cls7uxdfg002s128wv8ameemj	7072a7fa-33d2-4de7-b83f-eb891f907cd5	credentials	credentials	7072a7fa-33d2-4de7-b83f-eb891f907cd5	\N	\N	\N	\N	\N	\N	\N
cls7uxdfg002t128wceanhs3x	dd782aa0-a0fa-402b-bc56-0eb4639165e7	credentials	credentials	dd782aa0-a0fa-402b-bc56-0eb4639165e7	\N	\N	\N	\N	\N	\N	\N
cls7uxdfg002u128wjmgoturg	44a0a374-7707-479d-9adb-a45884d71049	credentials	credentials	44a0a374-7707-479d-9adb-a45884d71049	\N	\N	\N	\N	\N	\N	\N
cls7uxdg2002v128w7e43021t	85c21d0e-d05f-41c6-a808-2742077090a4	credentials	credentials	85c21d0e-d05f-41c6-a808-2742077090a4	\N	\N	\N	\N	\N	\N	\N
cls7uxdgt002w128wz0uxrgti	be42e6a9-3bee-4528-922d-c0940da1fa9f	credentials	credentials	be42e6a9-3bee-4528-922d-c0940da1fa9f	\N	\N	\N	\N	\N	\N	\N
cls7uxdgt002x128wqer0w4ka	08122166-6d04-4a9f-95b3-ccf57ac4ed2c	credentials	credentials	08122166-6d04-4a9f-95b3-ccf57ac4ed2c	\N	\N	\N	\N	\N	\N	\N
cls7uxdgt002y128wqi01mrdy	8601ad1b-9cd6-4c2d-b843-53358402188b	credentials	credentials	8601ad1b-9cd6-4c2d-b843-53358402188b	\N	\N	\N	\N	\N	\N	\N
cls7uxdhg002z128wunu8fxzp	209607a6-4f56-4cb7-9ff6-cb7877d0f3a0	credentials	credentials	209607a6-4f56-4cb7-9ff6-cb7877d0f3a0	\N	\N	\N	\N	\N	\N	\N
cls7uxdi50031128w98yngg24	994285e0-6d9c-46d0-925a-8f3b1ac31ec7	credentials	credentials	994285e0-6d9c-46d0-925a-8f3b1ac31ec7	\N	\N	\N	\N	\N	\N	\N
cls7uxdi50030128wbpy40k1h	6b4601e1-f21a-41da-a3db-a2edb8713d7e	credentials	credentials	6b4601e1-f21a-41da-a3db-a2edb8713d7e	\N	\N	\N	\N	\N	\N	\N
clsfcgvis0001aqaynwuv9pjg	8c6366c3-b6cb-4ab8-bff4-39eeca67cb75	oauth	fenix	ist196925	MTY5NTkyMzY3MTY2NDU5OTo1NjU3NThhNTM3NzMxM2EzYjcwYzdjMDE0ZDBhMTE1OTY2ZTFiMGVjNjY0ZmVjYzllNjQwZDJmZWNiODRjMmZiYWQzMWU4NGVhYzEzYmYyZGQ1N2M5NWQ3MmNlYjhjMzZmOTlkNjE4NjdlYjE1NTI3OWM5MDc0N2FiMmNkODcyMQ	MTY5NTkyMzY3MTY2NDU5OTpiYmVmMzhkNDc1ZmQwOTgzOTZiM2NjNjhmMjUzY2JlYjUzOTEzMWMxNzA5OWNlNmM4ZTE3NjRiYzc2MGIyZTNlYWM3NDZhNTUzODE2YTUwZDEyY2NkNzM5YzQwODI2Mjg4Mzg5NzE0NjU4YWEwYjBjZjc4ZDdmN2YyZTI0OGJjYg	\N	\N	\N	\N	\N
\.


--
-- Data for Name: Activity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Activity" (id, title, description, date, duration, location, type, "idHash") FROM stdin;
1	Workshop - Indie campers		2024-02-26 10:00:00	45	Sala 0 - 75	Workshop	1
2	Workshop - Magic Beans		2024-02-26 11:00:00	45	Sala 0 - 75	Workshop	2
3	Workshop - Deloitte		2024-02-26 14:00:00	45	Sala 0 - 75	Workshop	3
4	Workshop - Lidl		2024-02-27 14:00:00	45	Sala 0 - 75	Workshop	4
5	Workshop - Celfocus		2024-02-28 14:00:00	45	Sala 0 - 75	Workshop	5
6	Workshop - Synopsys		2024-02-28 15:00:00	45	Sala 0 - 75	Workshop	6
7	Workshop - Experis		2024-02-29 10:00:00	45	Sala 0 - 75	Workshop	7
8	Workshop - Kaizen		2024-02-29 15:00:00	45	Sala 0 - 75	Workshop	8
9	Speed Interview - Deloitte, KPMG		2024-02-26 11:00:00	60	Sala 1	SpeedInterview	9
10	Speed Interview - Magic Beans, Siemens		2024-02-26 11:00:00	60	Sala 2	SpeedInterview	10
11	Speed Interview - NTT Data, Leroy Merlin		2024-02-26 16:00:00	60	Sala 1	SpeedInterview	11
12	Speed Interview - Fidelidade		2024-02-27 11:00:00	60	Sala 1	SpeedInterview	12
13	Speed Interview - Noesis		2024-02-27 11:00:00	60	Sala 2	SpeedInterview	13
14	Speed Interview - Deloitte		2024-02-27 16:00:00	60	Sala 1	SpeedInterview	14
15	Speed Interview - BPI		2024-02-29 11:00:00	60	Sala 1	SpeedInterview	15
16	Speed Interview - Santander		2024-02-29 11:00:00	60	Sala 2	SpeedInterview	16
17	Speed Interview - PrimeIT		2024-02-29 16:00:00	60	Sala 1	SpeedInterview	17
\.


--
-- Data for Name: ActivityEnrollment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ActivityEnrollment" ("userId", "activityId", confirmed) FROM stdin;
8c6366c3-b6cb-4ab8-bff4-39eeca67cb75	9	t
\.


--
-- Data for Name: AwardToken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."AwardToken" (id, type, "userId") FROM stdin;
ddb834fa-f184-42f0-9741-b516074e8df6	NORMAL	8c6366c3-b6cb-4ab8-bff4-39eeca67cb75
\.


--
-- Data for Name: CompanyDetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CompanyDetails" (id, category, username, password, "userId", description, "linkHref", "linkText", scans) FROM stdin;
1	Silver	aquila_clean_energy	$2b$10$5nJemkr/fY.tEXd2QZXY8OIA3V3i1oB/ozexpGT4Pq2ZxjA26/sBa	8d8f7301-c432-4f14-ba89-a3df4dcaff2b		\N	\N	0
2	Gold	bubblego	$2b$10$rJUI46RULC0KcODPluwKtez/ffnT9mT7uF/yxLSU3iOZUQFDEYv6C	99340879-19c5-4728-aac7-f10105310821		\N	\N	0
3	Gold	bnp	$2b$10$j5Xcu713lI8q3rwbVa9SieTlGBBE2s2DKA3rmz7JnGQQ0e83jHGzS	0c879510-1859-41ca-b1c4-16b750879f2e		\N	\N	0
4	Platinum	fidelidade	$2b$10$.Ycav5OETQqcpozUydsj/uwc/TWLywvwGVEFog3m.wQ4t.Dhm5nZC	55cbaef7-264e-4f84-9f64-1c226d15a700		\N	\N	0
5	Gold	accenture	$2b$10$a4RHZM3gmjra4v8OHtzf2eLRS8FvH8hJhzzUApo2dpDguTNabNBfa	22d4022b-d993-47e2-a763-f72af962226a		\N	\N	0
7	Platinum	axians	$2b$10$lHlrbbeogvMsY4C2fmvvXeAuBgKVpzRVms22UnYskYfJ.7QnuTlLq	74181410-cecf-4a9a-b503-d6d0c085bf1e		\N	\N	0
6	Silver	affinity	$2b$10$CfjAfoux7uYR1fnjmTUlE.VW47z6VfmtTj/KumpOKZegZaYjjY.BO	1001fb17-aa4f-4522-bfaa-bf26fd81fcaf		\N	\N	0
8	Gold	crossjoin	$2b$10$y.GyMi2Tc14Zhexq4LxZz.CglkIWFI18T8f.WB.16N5F81Nkt.6u6	25a43774-73ce-41a2-876e-0d3e96ba9eeb		\N	\N	0
9	Platinum	lidl	$2b$10$d5YW0vuPkDMIawHrOOS3PuMOvBZMtA9wItI7hGFXDv3cjWQBsfrvm	ca759c3d-1e2a-4c67-8ff1-31fe0eac91ca		\N	\N	0
10	Platinum	deloitte	$2b$10$Uj7mKBpEEgfonQFTXRKJVeRx2i8K3cBBA66W9J.s/iEAPz4m4j0tu	cdb54fc6-f738-4177-b13f-4869d6f2a7f2		\N	\N	0
11	Gold	ey	$2b$10$U/WsEtnaT7Gt4ORIIbjxM.W1oXiM1WSEakWaZKAnaT4sZAZVmXsB6	eebe2341-c821-44d2-a831-a299c496c54b		\N	\N	0
12	Silver	grupo_visabeira	$2b$10$aeCq1cyyCV1Yh1y0xs4omeFleyg6xFt/R90HaU4Ebu7IGi7PV0e6m	ab748943-c12c-4fd0-98cf-0b7009d83812		\N	\N	0
13	Platinum	jeronimo_martins	$2b$10$AfEdKhVStrXIVFcApqLbIeSWeWBe.P2.TzfDjt.eXrt6jjSNfXbUa	246ac14e-1fc3-4d86-90de-164bdb9b53d9		\N	\N	0
15	Gold	la_redoute	$2b$10$VkfzX771LXmM1zGQAxx8NOWIWtC7F0QuZj63Rm5tsqD53skmOkkN.	7c0b4e5f-40ee-4344-be56-b8574c85976b		\N	\N	0
14	Gold	kpmg	$2b$10$8PZqWRCYBTRRxbWS5fAJv.7g/8QHlFouDkIGDw27L8BJBkpvlhGpG	68e4b620-bcf0-47a4-b2b0-1a2ef60aec12		\N	\N	0
16	Silver	novobanco	$2b$10$M6UtdGd16ETRPhdxNOG.fe.OqIabVvWTzvbVn86oc63CvZGogkE8G	88242669-3d5a-4d9c-8ba3-c6acb0513a1f		\N	\N	0
17	Gold	arquiconsult	$2b$10$Cf0NdOz.w41NPoVNqDqEjeVq4k2GsnOqSPE.2loe1mkJueuYPw.DO	9cd946b4-9ed5-4859-ac92-65ec9fa3f1bf		\N	\N	0
18	Platinum	experis	$2b$10$M8EjGqY3mBV4jjFB1Mtmb.MlDRWerX1z3WCAJl39hcDqIgDWnBN7.	68b85543-781c-4c54-b24c-c63bc500d950		\N	\N	0
19	Gold	avanade	$2b$10$3kowUMToJp5Yus2i8EFHe.Oe2kCaZZvariC8TOGquxy5DfeRvf0zS	c5a53dda-7aaa-4e36-84b9-4f97ac5729c8		\N	\N	0
20	Gold	blip	$2b$10$m/X8Q6B3NnRu/k9qR1rguOprFHD/nnheu6ZbmPn8IXThxrEx2wNFu	23cef6d6-0667-404d-a06d-15ff0e3d86f6		\N	\N	0
21	Platinum	devoteam	$2b$10$hIZPinzBC8yMZaxGeUB.wevXuWj8zeqJBC.I/PbyI4/OekPzoSvRm	321071c2-2b46-4883-9aad-a2acc7197a84		\N	\N	0
22	Gold	man_powergroup	$2b$10$v9La1VBc9qROyZJwiQM7D.M.54Li/lRfoR1xz7xFYGuzx2p6QSvdG	6fbdcc99-c890-46a0-8c89-e40c0ac2f391		\N	\N	0
23	Gold	dxc	$2b$10$X5I7VEBXxlsZQJeaGKkrneRFRgLTMdcQFwLn6agSX93vuEhIvRXtO	b8a4ca6a-9a54-4b8d-9388-0158834b50e2		\N	\N	0
24	Gold	it_sector	$2b$10$5nKRKayfoBFWuolfmAIZdueteCKozUOqYnhuCsidyp3Zn7z4lakH6	7e1c70ac-fd82-4b0f-aa82-cb85066a2521		\N	\N	0
25	Gold	cellfocus	$2b$10$ikg1A9KSmoeh34ji5MFtTeELFQyJj1CgEIcGOYEA.5qZj.yjkNw8K	981790be-3c92-4a7f-ab51-ea0480c46178		\N	\N	0
26	Gold	santander	$2b$10$1EGMzkhm7g1TGXORcITxdeEDkPXIto80GxY.x88T2PyHsiTp4j93O	15d28ec1-7e92-4543-8c97-dfe5eed53d52		\N	\N	0
27	Gold	primeit	$2b$10$VaZxXu31G9h8o.UjYOOMc.2HJ69zM4NsQgrERXStKJo9HTXGevCJy	7ddabdf6-eb6f-4636-9fbd-47c044f42467		\N	\N	0
28	Gold	secil	$2b$10$LF.FF117UOAYIvJ4m8W5zuwEDQsYz3hPocg6dBvBJzA6i/IXHlBfm	fbadb5ae-55f5-4608-9e63-d0135e9d1fa4		\N	\N	0
29	Gold	siemens	$2b$10$X1q19Ujqxr2rDGfWnLMBSOxZs1h5mb3GQy2m3GUTh/rDO.YU47ona	57409bbb-ec3e-42b1-b606-d032093ec6ec		\N	\N	0
31	Gold	leroy_merlin	$2b$10$XSYEVGv.iU6g22GIh7k8Meho4kW8osx4HtbC8uqjONABHmwWE/oue	6de826c7-e5f0-493b-bfef-71a8d5ff6b81		\N	\N	0
32	Gold	skyline	$2b$10$xLU6yQRnPz4YgDeTYs1F3O7c7nPuUV8P5XRn0jdYjnODlW.8Df05W	6425fff0-7651-4386-9fbc-d5817d1b8b20		\N	\N	0
33	Gold	somincor	$2b$10$1gDotWuyxIV74ocKzsMBz.41kEbeoR8B/sDE1jghzVU1obF2zeh3y	1305a95e-5a3a-4e27-8ef4-eb1f13ddd019		\N	\N	0
34	Gold	synopsys	$2b$10$MjBsIs.WPaILFZCcPxO43eI.H.bjTAMzxqR5ZlsgpeL7yYZe2AC4S	7352e512-07ca-498b-be38-f4ec23ab9674		\N	\N	0
35	Silver	teach_for_portugal	$2b$10$a2ueYWGPX5mHHGlLXX2ANO.PmeLEN6Llu3rHTYh0Vet0aV1TNfD6m	3771b409-ed2a-409a-8cde-0cdf498a5300		\N	\N	0
36	Platinum	thales	$2b$10$18dZLoWA.s0/GqI6SmqvKOdn5dfzJCewF3ZUy9vvqkU3oCuFoGl22	a6c0640b-5f75-4574-ac45-c23ba6852d7c		\N	\N	0
37	Silver	the_loop	$2b$10$PfDr2RzPyB4Ep3bvg9YC5uMhHpVBBle.gb9PDIITl.Uvk2h9rJ0Ty	cea899e8-14c2-4e04-b2a9-2746b9264539		\N	\N	0
38	Gold	unicre	$2b$10$tKSeEbZy9BFtsbrqvvXqh.yJ65..q24f2veGKYEu6t3LcPO0dtsLi	032b2d1b-9a0a-4b46-896c-0754b7590ca8		\N	\N	0
39	Platinum	time_wetech	$2b$10$k6fP6bxu9F7X2sYfu3rOdOo0j6n.dc4SDx7.AnBI7CzImheb/Jgq.	d3bf6d49-cb00-4581-9dc7-f0dfff411530		\N	\N	0
40	Silver	vodafone	$2b$10$biwpiJg9i9RJE88mFVMdyeYa08QSWv1frQqwkY0oGdtskZ46d7dXC	c866dd09-5011-40ff-89f8-dd025c090254		\N	\N	0
41	Gold	velocix	$2b$10$SbK/Io6tYM1/jNnNMpi2PeT07CVoNiXmZLk7Q./6IcF.3k7UcQUfe	e9c725ea-0762-4475-bdea-13c8302f4d91		\N	\N	0
42	Gold	vtxrm	$2b$10$uU4dGPmzBI8df27qieo0zu.XfLfQgSMvGkxBkuCHNdb21NfmlNRTW	a8136c86-d72d-4355-a11b-c0ea726611ea		\N	\N	0
43	Silver	worten	$2b$10$x.4G9T9Yu06KOi3KAVL3geU9rqsPt42PrQk7sMmtNuOtAnK6fBcYq	c3607698-bbf2-4a11-a1c7-a7f768d4a677		\N	\N	0
44	Gold	bpi	$2b$10$uznCm9x1F.yAH/xWZq2mGeSoHQerDZWaZ6e7yQFB98.ELTzNDnjRu	7c16abf8-2cab-4eae-bbd7-aa1a6ee45f47		\N	\N	0
45	Gold	noesis	$2b$10$1jmY24AwQcsWLLR/Tz7xie1zgpAFfrhanouGGpiVjW0JCKtzoiZ8y	44a0a374-7707-479d-9adb-a45884d71049		\N	\N	0
47	Gold	inesc_mn	$2b$10$epi9ieoGpXuI6Tl2yEcKJOhW3LOvHZdZz8aPbMM08Jf9MEjTObP9S	dd782aa0-a0fa-402b-bc56-0eb4639165e7		\N	\N	0
48	Gold	kaizen	$2b$10$TAISyjBKD1ArRUEe0p30DukCoTeeU1LIyPpG3E81chiRLAebyVpni	85c21d0e-d05f-41c6-a808-2742077090a4		\N	\N	0
49	Gold	ntt_data	$2b$10$nWAHi.4RgOyomRl/TRD5Ee79uKNcNEtF0ATiWJBDYctBdLjxW0M4G	be42e6a9-3bee-4528-922d-c0940da1fa9f		\N	\N	0
50	Platinum	indie_campers	$2b$10$Xkz3GjROyP.y2QaJksF7Xe2i0XBsCE58ms3a2gozmzfsysgcIaBhi	08122166-6d04-4a9f-95b3-ccf57ac4ed2c		\N	\N	0
51	Gold	glintt	$2b$10$UybDLdsMJrzTCDT/NmRcl.ENxoqeKuARLDZ1ZKzSxc3RnSHZ7JQDG	8601ad1b-9cd6-4c2d-b843-53358402188b		\N	\N	0
52	Gold	magic_beans	$2b$10$9QSTtDT0Ykv1ML/3.85a0eyUXhL8kFCLxquBnldjArMstL9y7NUP2	209607a6-4f56-4cb7-9ff6-cb7877d0f3a0		\N	\N	0
53	Gold	logicalis	$2b$10$PK7CS6Lf7QSyzSuJTk2xler/PKPZHaW42LHVgUb5Nga6cybdtnrDW	994285e0-6d9c-46d0-925a-8f3b1ac31ec7		\N	\N	0
54	Gold	innowave	$2b$10$GpLJC4tWnz1kcD3YDhyyLelLUR7X98BQ3QQka/xn/uX.4F.L32HRK	6b4601e1-f21a-41da-a3db-a2edb8713d7e		\N	\N	0
30	Gold	sonae	$2b$10$g8b4wD8NvhCPJ9hGZpNj1O5DVwnaLqdB9jnyhcqGHbL4BoMOq.IGq	18c6ed4c-e408-4087-b4ee-be2eda93019c		\N	\N	0
46	Platinum	nos	$2b$10$yY0Gz0vDmqaRJfdY342.iulIDpLdtFa7FJy6ch/lAk05xOBSXl3ki	7072a7fa-33d2-4de7-b83f-eb891f907cd5		\N	\N	2
\.


--
-- Data for Name: Day; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Day" (id, "dateCode") FROM stdin;
1	26_02_2024
2	27_02_2024
3	28_02_2024
4	29_02_2024
\.


--
-- Data for Name: EventLog; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."EventLog" (id, "timestamp", type, description, "userId") FROM stdin;
1	2024-02-14 02:13:23.871	ENROLLMENTS	Updated enrollment state of user 8c6366c3-b6cb-4ab8-bff4-39eeca67cb75 to ENROLL	8c6366c3-b6cb-4ab8-bff4-39eeca67cb75
2	2024-02-15 18:48:15.624	POINTS	Updated points of student 8c6366c3-b6cb-4ab8-bff4-39eeca67cb75 to 30	8c6366c3-b6cb-4ab8-bff4-39eeca67cb75
3	2024-02-15 18:48:47.512	ENROLLMENTS	Updated enrollment state of user 8c6366c3-b6cb-4ab8-bff4-39eeca67cb75 to CONFIRM at activity with id 9	8c6366c3-b6cb-4ab8-bff4-39eeca67cb75
4	2024-02-15 18:48:52.025	ENROLLMENTS	Updated enrollment state of user 8c6366c3-b6cb-4ab8-bff4-39eeca67cb75 to DISCARD at activity with id 9	8c6366c3-b6cb-4ab8-bff4-39eeca67cb75
5	2024-02-15 19:13:48.929	ENROLLMENTS	Updated enrollment state of user 8c6366c3-b6cb-4ab8-bff4-39eeca67cb75 to CONFIRM at activity with id 9	8c6366c3-b6cb-4ab8-bff4-39eeca67cb75
6	2024-02-15 19:13:52.774	ENROLLMENTS	Updated enrollment state of user 8c6366c3-b6cb-4ab8-bff4-39eeca67cb75 to DISCARD at activity with id 9	8c6366c3-b6cb-4ab8-bff4-39eeca67cb75
7	2024-02-15 19:14:10.489	POINTS	Updated points of student 8c6366c3-b6cb-4ab8-bff4-39eeca67cb75 to 300	8c6366c3-b6cb-4ab8-bff4-39eeca67cb75
8	2024-02-15 19:19:23.432	POINTS	Updated points of student 8c6366c3-b6cb-4ab8-bff4-39eeca67cb75 to 1000	8c6366c3-b6cb-4ab8-bff4-39eeca67cb75
9	2024-02-15 19:19:52.019	ENROLLMENTS	Updated enrollment state of user 8c6366c3-b6cb-4ab8-bff4-39eeca67cb75 to CONFIRM at activity with id 9	8c6366c3-b6cb-4ab8-bff4-39eeca67cb75
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
clsgvclrf0003dpfiwt87uewz	51cc81be-3dcc-46b9-b0ce-1a45ccc6d620	8c6366c3-b6cb-4ab8-bff4-39eeca67cb75	2024-03-16 18:47:04.27
\.


--
-- Data for Name: StudentDetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."StudentDetails" (id, "cvLocation", scans, points, course, university, companies_ids, "userId", redeems, "phoneNumber") FROM stdin;
1	cvs/_public/61ffb8d5-9b5e-4cdd-b5c2-739c12d7328b.pdf	2	1000	9121	1519	{7072a7fa-33d2-4de7-b83f-eb891f907cd5,cdb54fc6-f738-4177-b13f-4869d6f2a7f2}	8c6366c3-b6cb-4ab8-bff4-39eeca67cb75	0	\N
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, "emailVerified", image, "readChangelog", role) FROM stdin;
68e4b620-bcf0-47a4-b2b0-1a2ef60aec12	KPMG	kpmg@set.pt	\N	profileImages/_public/10605622-8ab0-4569-aae2-8ce6d875e999.jpeg	t	Company
321071c2-2b46-4883-9aad-a2acc7197a84	Devoteam	devoteam@set.pt	\N	\N	t	Company
55cbaef7-264e-4f84-9f64-1c226d15a700	Fidelidade	fidelidade@set.pt	\N	profileImages/_public/4b5658aa-750b-4dc2-83f8-6c47e43537aa.png	t	Company
7072a7fa-33d2-4de7-b83f-eb891f907cd5	NOS	nos@set.pt	\N	profileImages/_public/51b505a0-fa32-47b2-9d6d-57976f23cf76.jpg	t	Company
7c0b4e5f-40ee-4344-be56-b8574c85976b	La Redoute	la_redoute@set.pt	\N	profileImages/_public/6613acde-f2d9-400d-9276-e0271f48f6d6.png	t	Company
7e1c70ac-fd82-4b0f-aa82-cb85066a2521	IT Sector	it_sector@set.pt	\N	profileImages/_public/33410d14-6b40-4720-95e2-26665af0cb60.jpeg	t	Company
6de826c7-e5f0-493b-bfef-71a8d5ff6b81	Leroy Merlin	leroy_merlin@set.pt	\N	profileImages/_public/a84406a5-fc7d-4e78-a305-182afa615e2a.jpeg	t	Company
9cd946b4-9ed5-4859-ac92-65ec9fa3f1bf	Arquiconsult	arquiconsult@set.pt	\N	profileImages/_public/2b53296a-dd6b-4bed-abd5-6ac2396ac968.jpeg	t	Company
7ddabdf6-eb6f-4636-9fbd-47c044f42467	PrimeIT	primeit@set.pt	\N	profileImages/_public/dbb32063-d6dd-40b4-90c7-f342b72392fa.jpeg	t	Company
981790be-3c92-4a7f-ab51-ea0480c46178	Cellfocus	cellfocus@set.pt	\N	\N	t	Company
44a0a374-7707-479d-9adb-a45884d71049	Noesis	noesis@set.pt	\N	profileImages/_public/8f136f79-f269-4a97-9873-ab1a4d2aaf8b.jpeg	t	Company
85c21d0e-d05f-41c6-a808-2742077090a4	Kaizen	kaizen@set.pt	\N	profileImages/_public/d644021a-4953-410c-a035-00250efe8167.jpeg	t	Company
88242669-3d5a-4d9c-8ba3-c6acb0513a1f	Novobanco	novobanco@set.pt	\N	\N	t	Company
dd782aa0-a0fa-402b-bc56-0eb4639165e7	INESC MN	inesc_mn@set.pt	\N	profileImages/_public/5fa174c2-eb20-43fb-9b55-83d3e46bbfba.jpeg	t	Company
8d8f7301-c432-4f14-ba89-a3df4dcaff2b	Aquila Clean Energy	aquila_clean_energy@set.pt	\N	\N	t	Company
57409bbb-ec3e-42b1-b606-d032093ec6ec	Siemens	siemens@set.pt	\N	profileImages/_public/4f2cddda-f9cb-486d-ac14-f23fb67e1592.jpeg	t	Company
6b4601e1-f21a-41da-a3db-a2edb8713d7e	Innowave	innowave@set.pt	\N	\N	t	Company
68b85543-781c-4c54-b24c-c63bc500d950	Experis	experis@set.pt	\N	profileImages/_public/a2a64670-47e1-427e-8903-6addfce1dfd7.jpeg	t	Company
6425fff0-7651-4386-9fbc-d5817d1b8b20	Skyline	skyline@set.pt	\N	profileImages/_public/c079d502-3bc3-44f0-bf5d-35491326c449.jpeg	t	Company
22d4022b-d993-47e2-a763-f72af962226a	Accenture	accenture@set.pt	\N	profileImages/_public/f6d7b54d-8216-421e-b420-4c664f1cff6e.jpeg	t	Company
25a43774-73ce-41a2-876e-0d3e96ba9eeb	CrossJoin	crossjoin@set.pt	\N	\N	t	Company
99340879-19c5-4728-aac7-f10105310821	Bubblego	bubblego@set.pt	\N	\N	t	Company
c5a53dda-7aaa-4e36-84b9-4f97ac5729c8	Avanade	avanade@set.pt	\N	profileImages/_public/a8f8fc6d-0e31-4266-990f-5a3ec7b0c92e.jpeg	t	Company
08122166-6d04-4a9f-95b3-ccf57ac4ed2c	Indie Campers	indie_campers@set.pt	\N	profileImages/_public/60116954-79a2-4e4e-9e3f-0f0bc609314f.jpeg	t	Company
fbadb5ae-55f5-4608-9e63-d0135e9d1fa4	Secil	secil@set.pt	\N	\N	t	Company
be42e6a9-3bee-4528-922d-c0940da1fa9f	NTT Data	ntt_data@set.pt	\N	profileImages/_public/10c489ec-0239-4c31-b08d-1438c9cf22bc.jpeg	t	Company
1305a95e-5a3a-4e27-8ef4-eb1f13ddd019	Somincor	somincor@set.pt	\N	profileImages/_public/0adfa4bc-5d1c-48a1-8760-041340193133.jpeg	t	Company
18c6ed4c-e408-4087-b4ee-be2eda93019c	SONAE	sonae@set.pt	\N	profileImages/_public/36cad3e6-e667-4067-9709-7b8e15cbe3a8.jpeg	t	Company
7352e512-07ca-498b-be38-f4ec23ab9674	Synopsys	synopsys@set.pt	\N	profileImages/_public/a1d8924d-5d95-4d51-a8a3-328ad215ef23.png	t	Company
a6c0640b-5f75-4574-ac45-c23ba6852d7c	Thales	thales@set.pt	\N	profileImages/_public/be301e20-6629-434e-a447-80b33afda61d.jpeg	t	Company
3771b409-ed2a-409a-8cde-0cdf498a5300	Teach For Portugal	teach_for_portugal@set.pt	\N	profileImages/_public/7ec242bc-ef2c-4fd8-9ee3-e4676e86ae96.jpg	t	Company
d3bf6d49-cb00-4581-9dc7-f0dfff411530	Time wetech	time_wetech@set.pt	\N	profileImages/_public/1918283a-52b6-4290-bd0d-4552c1afc4d2.jpeg	t	Company
032b2d1b-9a0a-4b46-896c-0754b7590ca8	Unicre	unicre@set.pt	\N	profileImages/_public/5878f1c4-2408-4867-9ebc-18686cfd12e1.jpeg	t	Company
cea899e8-14c2-4e04-b2a9-2746b9264539	The Loop	the_loop@set.pt	\N	\N	t	Company
c3607698-bbf2-4a11-a1c7-a7f768d4a677	Worten	worten@set.pt	\N	profileImages/_public/67dacc0b-5fe9-49ab-9eb7-9ee8edfddaba.jpeg	t	Company
b8a4ca6a-9a54-4b8d-9388-0158834b50e2	DXC	dxc@set.pt	\N	\N	t	Company
c866dd09-5011-40ff-89f8-dd025c090254	Vodafone	vodafone@set.pt	\N	profileImages/_public/4ab910ff-f072-4838-8295-d7ab89632f40.jpg	t	Company
a8136c86-d72d-4355-a11b-c0ea726611ea	VTXRM	vtxrm@set.pt	\N	profileImages/_public/8a674727-4241-4087-866f-87151387cad9.jpg	t	Company
7c16abf8-2cab-4eae-bbd7-aa1a6ee45f47	BPI	bpi@set.pt	\N	profileImages/_public/4d9d448f-5e5b-4524-82cd-cb7e5fc4178c.jpeg	t	Company
e9c725ea-0762-4475-bdea-13c8302f4d91	Velocix	velocix@set.pt	\N	\N	t	Company
23cef6d6-0667-404d-a06d-15ff0e3d86f6	Blip	blip@set.pt	\N	profileImages/_public/3a58c33c-1ea0-4505-ac44-212796cef85f.jpeg	t	Company
209607a6-4f56-4cb7-9ff6-cb7877d0f3a0	Magic Beans	magic_beans@set.pt	\N	profileImages/_public/e3cfb24c-2d9c-476a-8209-e60a02b83345.jpeg	t	Company
15d28ec1-7e92-4543-8c97-dfe5eed53d52	Santander	santander@set.pt	\N	\N	t	Company
ab748943-c12c-4fd0-98cf-0b7009d83812	Grupo Visabeira	grupo_visabeira@set.pt	\N	\N	t	Company
74181410-cecf-4a9a-b503-d6d0c085bf1e	Axians	axians@set.pt	\N	profileImages/_public/d0d11d07-c91f-42eb-ab3a-c7b52eb3e1f5.jpeg	t	Company
0c879510-1859-41ca-b1c4-16b750879f2e	BNP Paribas	bnp@set.pt	\N	profileImages/_public/4a05f96d-ed4c-449d-aac5-de470257d041.jpeg	t	Company
6fbdcc99-c890-46a0-8c89-e40c0ac2f391	ManpowerGroup	man_powergroup@set.pt	\N	profileImages/_public/b0acc2c2-67f5-40f7-8b60-369628deaa99.jpeg	t	Company
1001fb17-aa4f-4522-bfaa-bf26fd81fcaf	Affinity	affinity@set.pt	\N	profileImages/_public/f4b59ec5-5564-4d23-9d8e-8ddd30970c3f.gif	t	Company
ca759c3d-1e2a-4c67-8ff1-31fe0eac91ca	Lidl	lidl@set.pt	\N	profileImages/_public/bd87c0a8-2eef-4ac5-ad5e-7a601984bb0c.jpg	t	Company
eebe2341-c821-44d2-a831-a299c496c54b	EY	ey@set.pt	\N	profileImages/_public/cffe21dc-0717-4345-978a-77ea9b459611.png	t	Company
cdb54fc6-f738-4177-b13f-4869d6f2a7f2	Deloitte	deloitte@set.pt	\N	profileImages/_public/78102f12-d9c6-443c-bc10-fd918666bd6c.jpg	t	Company
246ac14e-1fc3-4d86-90de-164bdb9b53d9	Jerónimo Martins	jeronimo_martins@set.pt	\N	profileImages/_public/4584a541-2708-4a50-8ca0-87a2c29a46e2.jpeg	t	Company
8601ad1b-9cd6-4c2d-b843-53358402188b	Glintt	glintt@set.pt	\N	profileImages/_public/17a2c401-45de-4ab6-9273-e28cbddf8c04.jpeg	t	Company
994285e0-6d9c-46d0-925a-8f3b1ac31ec7	Logicalis	logicalis@set.pt	\N	profileImages/_public/202ca92b-84de-40e4-ad10-45aca704a272.jpg	t	Company
8c6366c3-b6cb-4ab8-bff4-39eeca67cb75	Gonçalo Silva	goncalo.c.brito.da.silva@tecnico.ulisboa.pt	\N	profileImages/_public/9ae65075-b9aa-4958-be0b-faaa5f8dd065.jpg	t	Staff
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
1	50
3	10
2	52
4	9
5	25
6	34
7	18
8	48
9	10
9	14
10	29
10	52
11	31
11	49
12	4
13	45
14	10
16	26
15	44
17	27
\.


--
-- Data for Name: _CompanyDetailsToDay; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_CompanyDetailsToDay" ("A", "B") FROM stdin;
3	1
5	1
9	1
10	1
11	1
14	1
17	1
21	1
24	1
29	1
31	1
36	1
38	1
46	1
49	1
50	1
52	1
4	2
6	2
9	2
10	2
13	2
20	2
21	2
32	2
33	2
36	2
41	2
42	2
43	2
45	2
46	2
47	2
51	2
54	2
2	3
8	3
12	3
13	3
15	3
18	3
19	3
23	3
25	3
28	3
34	3
39	3
40	3
41	3
42	3
47	3
53	3
1	4
7	4
16	4
18	4
23	4
26	4
27	4
35	4
37	4
39	4
40	4
44	4
48	4
53	4
30	4
\.


--
-- Data for Name: _CompanyDetailsToStudentDetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_CompanyDetailsToStudentDetails" ("A", "B") FROM stdin;
46	1
10	1
\.


--
-- Name: Activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Activity_id_seq"', 17, true);


--
-- Name: CompanyDetails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CompanyDetails_id_seq"', 54, true);


--
-- Name: Day_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Day_id_seq"', 4, true);


--
-- Name: EventLog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EventLog_id_seq"', 9, true);


--
-- Name: StudentDetails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."StudentDetails_id_seq"', 1, true);


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
-- Name: CompanyDetails CompanyDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompanyDetails"
    ADD CONSTRAINT "CompanyDetails_pkey" PRIMARY KEY (id);


--
-- Name: Day Day_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Day"
    ADD CONSTRAINT "Day_pkey" PRIMARY KEY (id);


--
-- Name: EventLog EventLog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventLog"
    ADD CONSTRAINT "EventLog_pkey" PRIMARY KEY (id);


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
-- Name: Activity_idHash_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Activity_idHash_key" ON public."Activity" USING btree ("idHash");


--
-- Name: AwardToken_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "AwardToken_userId_key" ON public."AwardToken" USING btree ("userId");


--
-- Name: CompanyDetails_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "CompanyDetails_userId_key" ON public."CompanyDetails" USING btree ("userId");


--
-- Name: CompanyDetails_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "CompanyDetails_username_key" ON public."CompanyDetails" USING btree (username);


--
-- Name: Day_dateCode_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Day_dateCode_key" ON public."Day" USING btree ("dateCode");


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
-- Name: _CompanyDetailsToDay_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_CompanyDetailsToDay_AB_unique" ON public."_CompanyDetailsToDay" USING btree ("A", "B");


--
-- Name: _CompanyDetailsToDay_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_CompanyDetailsToDay_B_index" ON public."_CompanyDetailsToDay" USING btree ("B");


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
-- Name: AwardToken AwardToken_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."AwardToken"
    ADD CONSTRAINT "AwardToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."StudentDetails"("userId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CompanyDetails CompanyDetails_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CompanyDetails"
    ADD CONSTRAINT "CompanyDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: EventLog EventLog_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EventLog"
    ADD CONSTRAINT "EventLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


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
-- Name: _CompanyDetailsToDay _CompanyDetailsToDay_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_CompanyDetailsToDay"
    ADD CONSTRAINT "_CompanyDetailsToDay_A_fkey" FOREIGN KEY ("A") REFERENCES public."CompanyDetails"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CompanyDetailsToDay _CompanyDetailsToDay_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_CompanyDetailsToDay"
    ADD CONSTRAINT "_CompanyDetailsToDay_B_fkey" FOREIGN KEY ("B") REFERENCES public."Day"(id) ON UPDATE CASCADE ON DELETE CASCADE;


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


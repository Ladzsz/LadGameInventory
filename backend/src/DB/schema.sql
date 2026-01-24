--
-- PostgreSQL database dump
--

-- Dumped from database version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.4)
-- Dumped by pg_dump version 12.22 (Ubuntu 12.22-0ubuntu0.20.04.4)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: ladzsz
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    description text
);


ALTER TABLE public.categories OWNER TO ladzsz;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: ladzsz
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO ladzsz;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ladzsz
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: games; Type: TABLE; Schema: public; Owner: ladzsz
--

CREATE TABLE public.games (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    category_id integer,
    user_id integer,
    quantity integer DEFAULT 1,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.games OWNER TO ladzsz;

--
-- Name: games_id_seq; Type: SEQUENCE; Schema: public; Owner: ladzsz
--

CREATE SEQUENCE public.games_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.games_id_seq OWNER TO ladzsz;

--
-- Name: games_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ladzsz
--

ALTER SEQUENCE public.games_id_seq OWNED BY public.games.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: ladzsz
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO ladzsz;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: ladzsz
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO ladzsz;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ladzsz
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: ladzsz
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: games id; Type: DEFAULT; Schema: public; Owner: ladzsz
--

ALTER TABLE ONLY public.games ALTER COLUMN id SET DEFAULT nextval('public.games_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: ladzsz
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: ladzsz
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: ladzsz
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: ladzsz
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: ladzsz
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: ladzsz
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: games games_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ladzsz
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: games games_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ladzsz
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--


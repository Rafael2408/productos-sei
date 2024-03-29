PGDMP         	    	            {            productos-sei    15.4    15.4 .    )           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            *           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            +           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ,           1262    16661    productos-sei    DATABASE     �   CREATE DATABASE "productos-sei" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE "productos-sei";
                postgres    false            �            1255    16757    audit_productos()    FUNCTION     �   CREATE FUNCTION public.audit_productos() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO AUDITORIA(usu_id, aud_accion, aud_tabla, aud_fecha)
    VALUES (NEW.usu_id, TG_OP, 'PRODUCTOS', NOW());
    RETURN NEW;
END;
$$;
 (   DROP FUNCTION public.audit_productos();
       public          postgres    false            �            1255    16755    audit_usuarios()    FUNCTION     �   CREATE FUNCTION public.audit_usuarios() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO AUDITORIA(usu_id, aud_accion, aud_tabla, aud_fecha)
    VALUES (NEW.usu_id, TG_OP, 'USUARIOS', NOW());
    RETURN NEW;
END;
$$;
 '   DROP FUNCTION public.audit_usuarios();
       public          postgres    false            �            1259    16725 	   auditoria    TABLE     �   CREATE TABLE public.auditoria (
    aud_id integer NOT NULL,
    usu_id integer,
    aud_accion character varying(30),
    aud_tabla character varying(30),
    aud_fecha timestamp without time zone,
    aud_likert integer
);
    DROP TABLE public.auditoria;
       public         heap    postgres    false            �            1259    16724    auditoria_aud_id_seq    SEQUENCE     �   CREATE SEQUENCE public.auditoria_aud_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.auditoria_aud_id_seq;
       public          postgres    false    219            -           0    0    auditoria_aud_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.auditoria_aud_id_seq OWNED BY public.auditoria.aud_id;
          public          postgres    false    218            �            1259    16732 	   categoria    TABLE     n   CREATE TABLE public.categoria (
    cat_id integer NOT NULL,
    cat_nombre character varying(30) NOT NULL
);
    DROP TABLE public.categoria;
       public         heap    postgres    false            �            1259    16731    categoria_cat_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categoria_cat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.categoria_cat_id_seq;
       public          postgres    false    221            .           0    0    categoria_cat_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.categoria_cat_id_seq OWNED BY public.categoria.cat_id;
          public          postgres    false    220            �            1259    16739 	   productos    TABLE     �   CREATE TABLE public.productos (
    pro_id integer NOT NULL,
    pro_nombre character varying(30),
    pro_descripcion character varying(30),
    pro_precio real,
    pro_cantidad integer,
    usu_id integer,
    cat_id integer
);
    DROP TABLE public.productos;
       public         heap    postgres    false            �            1259    16738    productos_pro_id_seq    SEQUENCE     �   CREATE SEQUENCE public.productos_pro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.productos_pro_id_seq;
       public          postgres    false    223            /           0    0    productos_pro_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.productos_pro_id_seq OWNED BY public.productos.pro_id;
          public          postgres    false    222            �            1259    16706    rol    TABLE     h   CREATE TABLE public.rol (
    rol_id integer NOT NULL,
    rol_nombre character varying(30) NOT NULL
);
    DROP TABLE public.rol;
       public         heap    postgres    false            �            1259    16705    rol_rol_id_seq    SEQUENCE     �   CREATE SEQUENCE public.rol_rol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.rol_rol_id_seq;
       public          postgres    false    215            0           0    0    rol_rol_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.rol_rol_id_seq OWNED BY public.rol.rol_id;
          public          postgres    false    214            �            1259    16713    usuarios    TABLE     �   CREATE TABLE public.usuarios (
    usu_id integer NOT NULL,
    usu_nombre character varying(30) NOT NULL,
    usu_correo character varying(50),
    usu_password character varying(255),
    rol_id integer
);
    DROP TABLE public.usuarios;
       public         heap    postgres    false            �            1259    16712    usuarios_usu_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_usu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.usuarios_usu_id_seq;
       public          postgres    false    217            1           0    0    usuarios_usu_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.usuarios_usu_id_seq OWNED BY public.usuarios.usu_id;
          public          postgres    false    216            }           2604    16728    auditoria aud_id    DEFAULT     t   ALTER TABLE ONLY public.auditoria ALTER COLUMN aud_id SET DEFAULT nextval('public.auditoria_aud_id_seq'::regclass);
 ?   ALTER TABLE public.auditoria ALTER COLUMN aud_id DROP DEFAULT;
       public          postgres    false    218    219    219            ~           2604    16735    categoria cat_id    DEFAULT     t   ALTER TABLE ONLY public.categoria ALTER COLUMN cat_id SET DEFAULT nextval('public.categoria_cat_id_seq'::regclass);
 ?   ALTER TABLE public.categoria ALTER COLUMN cat_id DROP DEFAULT;
       public          postgres    false    220    221    221                       2604    16742    productos pro_id    DEFAULT     t   ALTER TABLE ONLY public.productos ALTER COLUMN pro_id SET DEFAULT nextval('public.productos_pro_id_seq'::regclass);
 ?   ALTER TABLE public.productos ALTER COLUMN pro_id DROP DEFAULT;
       public          postgres    false    222    223    223            {           2604    16709 
   rol rol_id    DEFAULT     h   ALTER TABLE ONLY public.rol ALTER COLUMN rol_id SET DEFAULT nextval('public.rol_rol_id_seq'::regclass);
 9   ALTER TABLE public.rol ALTER COLUMN rol_id DROP DEFAULT;
       public          postgres    false    215    214    215            |           2604    16716    usuarios usu_id    DEFAULT     r   ALTER TABLE ONLY public.usuarios ALTER COLUMN usu_id SET DEFAULT nextval('public.usuarios_usu_id_seq'::regclass);
 >   ALTER TABLE public.usuarios ALTER COLUMN usu_id DROP DEFAULT;
       public          postgres    false    217    216    217            "          0    16725 	   auditoria 
   TABLE DATA           a   COPY public.auditoria (aud_id, usu_id, aud_accion, aud_tabla, aud_fecha, aud_likert) FROM stdin;
    public          postgres    false    219   v4       $          0    16732 	   categoria 
   TABLE DATA           7   COPY public.categoria (cat_id, cat_nombre) FROM stdin;
    public          postgres    false    221   �7       &          0    16739 	   productos 
   TABLE DATA           r   COPY public.productos (pro_id, pro_nombre, pro_descripcion, pro_precio, pro_cantidad, usu_id, cat_id) FROM stdin;
    public          postgres    false    223   Z8                 0    16706    rol 
   TABLE DATA           1   COPY public.rol (rol_id, rol_nombre) FROM stdin;
    public          postgres    false    215   �8                  0    16713    usuarios 
   TABLE DATA           X   COPY public.usuarios (usu_id, usu_nombre, usu_correo, usu_password, rol_id) FROM stdin;
    public          postgres    false    217   �8       2           0    0    auditoria_aud_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.auditoria_aud_id_seq', 92, true);
          public          postgres    false    218            3           0    0    categoria_cat_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.categoria_cat_id_seq', 8, true);
          public          postgres    false    220            4           0    0    productos_pro_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.productos_pro_id_seq', 2, true);
          public          postgres    false    222            5           0    0    rol_rol_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.rol_rol_id_seq', 4, true);
          public          postgres    false    214            6           0    0    usuarios_usu_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.usuarios_usu_id_seq', 47, true);
          public          postgres    false    216            �           2606    16730    auditoria auditoria_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.auditoria
    ADD CONSTRAINT auditoria_pkey PRIMARY KEY (aud_id);
 B   ALTER TABLE ONLY public.auditoria DROP CONSTRAINT auditoria_pkey;
       public            postgres    false    219            �           2606    16737    categoria categoria_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT categoria_pkey PRIMARY KEY (cat_id);
 B   ALTER TABLE ONLY public.categoria DROP CONSTRAINT categoria_pkey;
       public            postgres    false    221            �           2606    16744    productos productos_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (pro_id);
 B   ALTER TABLE ONLY public.productos DROP CONSTRAINT productos_pkey;
       public            postgres    false    223            �           2606    16711    rol rol_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY (rol_id);
 6   ALTER TABLE ONLY public.rol DROP CONSTRAINT rol_pkey;
       public            postgres    false    215            �           2606    16718    usuarios usuarios_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (usu_id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public            postgres    false    217            �           2620    16758    productos productos_audit    TRIGGER     �   CREATE TRIGGER productos_audit AFTER INSERT OR DELETE OR UPDATE ON public.productos FOR EACH ROW EXECUTE FUNCTION public.audit_productos();
 2   DROP TRIGGER productos_audit ON public.productos;
       public          postgres    false    225    223            �           2620    16756    usuarios usuarios_audit    TRIGGER     �   CREATE TRIGGER usuarios_audit AFTER INSERT OR DELETE OR UPDATE ON public.usuarios FOR EACH ROW EXECUTE FUNCTION public.audit_usuarios();
 0   DROP TRIGGER usuarios_audit ON public.usuarios;
       public          postgres    false    217    224            �           2606    16750    productos productos_cat_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_cat_id_fkey FOREIGN KEY (cat_id) REFERENCES public.categoria(cat_id);
 I   ALTER TABLE ONLY public.productos DROP CONSTRAINT productos_cat_id_fkey;
       public          postgres    false    221    3207    223            �           2606    16745    productos productos_usu_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_usu_id_fkey FOREIGN KEY (usu_id) REFERENCES public.usuarios(usu_id);
 I   ALTER TABLE ONLY public.productos DROP CONSTRAINT productos_usu_id_fkey;
       public          postgres    false    223    3203    217            �           2606    16719    usuarios usuarios_rol_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.rol(rol_id);
 G   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_rol_id_fkey;
       public          postgres    false    217    215    3201            "   J  x���K�]9@�z���XK�gM��&	��e��l44]6��A�ґd?�o�_�_�������o?^�*��/�?al���L~}Ѝ�C��u�6	�B�Z!��mr#xH�ZѠ	H��BN\i
z#|T,�̴��3�*��\9���[�ִ�$:�#��s�\��X!~&�J^Q�u�G���a���򳈳��l;cȀ���hm4/�&&����������o�aڨu4-^Y�� ��D"���N���D-mT/��q��5����\i���8x-�
�V^2c<�f��h��š��,[��F	����B��n�Z䀩 a��D�uی�Ȑ��  :���D��)��� u�`z��Iw�Q�����R�diM
tT'�P!Z��f���у����7��Λ=&�4��bMV�������\����+�у��y��U�v����d��T\�<`���;o����칹<p/�y�mQ����]�7&c�R��AF�y��]ʛ1������G";�̓�Ī"�z�;�̓`·����H�y�=�
u^5>{{$�M#5߫�@�cs-z$�v9{0��-����w��8�'r��u�'&��=�����0
�X��Gո�&��>2E����<�=�?#�.�"�?F��[��?gZM0�`(�p����&��-�AKx�	4�&<Є��@h�Mx�	4�%<�����X�Kx`	,�%<�����x�Ox�	<�'<������
��6��d��N\�m�;���+,�S���$������5��+l0��φ��~��*���7@�      $   z   x�˽1@�ڞ" �O�+n _b�H�"l��m��Űh����O9��
�,L��p������4#��W1*��x����1r6�v0|?�؟=|o�I<`��Z��ad}6�"� � (�      &   5   x�3��IM�H���,)�/�4г�4�4�4�2�t,)���I,IDs��qqq e��         6   x�3�tL����,.)JL�/�2��/H�0�9KS2K�,����Ģ�|�=... ��            x�m�Is�@���+<xVo�"�A��\xaw����냦R�C.��U���'qG�����d���e�RҾ�$+�ʫ�"4��Oqv$=P�*@C_QDeU4���e<���U�ls��Z^�-�6��vc�'���2Ou�.p���'T�2|%��UeӐvņ��!HׅJ���b��7�{p+����i{�u�>�ۅp7BU	����s]�^*0WAǀ�n�u� �~�:��pr���7|��٫�e��l�!{��ĝt��A��� ���<�>�m�     
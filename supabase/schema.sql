create table if not exists public.cv_profile (
  id integer primary key check (id = 1),
  name text not null,
  title text not null default '',
  summary text not null default '',
  email text not null default '',
  phone text not null default '',
  location text not null default '',
  linkedin text not null default '',
  github text not null default '',
  photo_url text not null default '',
  footer_description text not null default 'Passionate about technology and innovation, dedicated to creating solutions that make a difference.',
  footer_links jsonb not null default '[{"label":"GitHub","href":"https://github.com/Hussein2334?tab=repositories","icon":"fab fa-github"},{"label":"Email","href":"mailto:husseinali2334@gmail.com","icon":"fas fa-envelope"}]'::jsonb,
  font_family text not null default 'Poppins',
  accent_color text not null default '#2F3C9E',
  language text not null default 'en',
  dark_mode boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.cv_profile
  add column if not exists footer_description text not null default 'Passionate about technology and innovation, dedicated to creating solutions that make a difference.',
  add column if not exists footer_links jsonb not null default '[{"label":"GitHub","href":"https://github.com/Hussein2334?tab=repositories","icon":"fab fa-github"},{"label":"Email","href":"mailto:husseinali2334@gmail.com","icon":"fas fa-envelope"}]'::jsonb,
  add column if not exists language text not null default 'en',
  add column if not exists dark_mode boolean not null default false;

create table if not exists public.cv_admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

create table if not exists public.cv_education (
  id uuid primary key default gen_random_uuid(),
  qualification text not null,
  institution text not null default '',
  period text not null default '',
  description text not null default '',
  documents jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.cv_education
  add column if not exists documents jsonb not null default '[]'::jsonb;

create table if not exists public.cv_experience (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  organization text not null default '',
  period text not null default '',
  description text not null default '',
  documents jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.cv_experience
  add column if not exists documents jsonb not null default '[]'::jsonb;

create table if not exists public.cv_skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  documents jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.cv_skills
  add column if not exists documents jsonb not null default '[]'::jsonb;

create table if not exists public.cv_achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text not null default '',
  date text not null default '',
  description text not null default '',
  documents jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.cv_achievements
  add column if not exists issuer text not null default '',
  add column if not exists documents jsonb not null default '[]'::jsonb;

create table if not exists public.cv_hobbies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  icon text not null default 'fas fa-heart',
  created_at timestamptz not null default now()
);

create table if not exists public.cv_training (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  provider text not null default '',
  date text not null default '',
  description text not null default '',
  skills text not null default '',
  documents jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.cv_training
  add column if not exists documents jsonb not null default '[]'::jsonb;

create table if not exists public.cv_referees (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text not null default '',
  organization text not null default '',
  phone text not null default '',
  email text not null default '',
  address text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.cv_certificates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text not null default '',
  issue_date text not null default '',
  image_url text not null default '',
  documents jsonb not null default '[]'::jsonb,
  description text not null default '',
  created_at timestamptz not null default now()
);

alter table public.cv_certificates
  add column if not exists documents jsonb not null default '[]'::jsonb;

create table if not exists public.cv_gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  image_url text not null,
  created_at timestamptz not null default now()
);

insert into public.cv_hobbies (name, icon)
select seed.name, seed.icon
from (values
  ('Swimming', 'fas fa-swimmer'),
  ('Football', 'fas fa-futbol'),
  ('Reading', 'fas fa-book-reader'),
  ('Team Work', 'fas fa-users'),
  ('Counselling', 'fas fa-hands-helping'),
  ('Cooperative', 'fas fa-handshake')
) as seed(name, icon)
where not exists (
  select 1 from public.cv_hobbies hobby where hobby.name = seed.name
);

insert into public.cv_training (title, provider, description, skills)
select
  'SQL & SQL Server Certification',
  'Udemy',
  'Completed comprehensive training program on SQL and SQL Server through Udemy, covering essential database management skills.',
  'SQL Basics, Advanced SQL Queries, Database Design, SQL Server Administration, Stored Procedures & Functions, Performance Tuning, Data Security'
where not exists (
  select 1 from public.cv_training
  where title = 'SQL & SQL Server Certification' and provider = 'Udemy'
);

insert into public.cv_referees (name, position, organization, phone, email, address)
select seed.name, seed.position, seed.organization, seed.phone, seed.email, seed.address
from (values
  ('MR. ALI ABDULRAHMAN ABDULLA', 'Senior Instructor', 'Karume Institute of Science and Technology', '+255 778395610', 'ali.abdullah@live.com', 'P.O.BOX 1092, Zanzibar-Tanzania'),
  ('MRS ZUHURA IDDI OMAR', 'Teacher', 'Ministry of Education and Vocational Training', '+255 777 418200', 'zuhuraiddiomar@gmail.com', 'P.O.BOX 1092, Zanzibar-Tanzania'),
  ('MR. HILAL SAID AMOUR', 'Manager Digital Banking & Innovation', 'The People''s Bank of Zanzibar', '+255657132387', 'Hilal.Amour@pbzbank.co.tz', 'P ZIC building, 2nd floor')
) as seed(name, position, organization, phone, email, address)
where not exists (
  select 1 from public.cv_referees referee where referee.name = seed.name
);

alter table public.cv_profile enable row level security;
alter table public.cv_admins enable row level security;
alter table public.cv_education enable row level security;
alter table public.cv_experience enable row level security;
alter table public.cv_skills enable row level security;
alter table public.cv_achievements enable row level security;
alter table public.cv_certificates enable row level security;
alter table public.cv_gallery enable row level security;
alter table public.cv_hobbies enable row level security;
alter table public.cv_training enable row level security;
alter table public.cv_referees enable row level security;

grant select on public.cv_profile, public.cv_education, public.cv_experience,
  public.cv_skills, public.cv_achievements, public.cv_certificates,
  public.cv_gallery, public.cv_hobbies, public.cv_training, public.cv_referees
  to anon, authenticated;
grant insert, update, delete on public.cv_profile, public.cv_education,
  public.cv_experience, public.cv_skills, public.cv_achievements,
  public.cv_certificates, public.cv_hobbies, public.cv_training,
  public.cv_gallery, public.cv_referees to authenticated;
grant select on public.cv_admins to authenticated;

drop policy if exists "Public can read CV profile" on public.cv_profile;
create policy "Public can read CV profile"
  on public.cv_profile for select to anon, authenticated using (true);

drop policy if exists "CV admin can update profile" on public.cv_profile;
create policy "CV admin can update profile"
  on public.cv_profile for all to authenticated
  using (exists (select 1 from public.cv_admins where user_id = auth.uid()))
  with check (exists (select 1 from public.cv_admins where user_id = auth.uid()));

drop policy if exists "CV admin can read own admin row" on public.cv_admins;
create policy "CV admin can read own admin row"
  on public.cv_admins for select to authenticated
  using (user_id = auth.uid());

do $$
declare
  table_name text;
  section_name text;
begin
  foreach table_name in array array[
    'cv_education',
    'cv_experience',
    'cv_skills',
    'cv_achievements',
    'cv_certificates',
    'cv_gallery',
    'cv_hobbies',
    'cv_training',
    'cv_referees'
  ]
  loop
    section_name := replace(table_name, 'cv_', '');
    execute format('drop policy if exists %I on public.%I', 'Public can read ' || section_name, table_name);
    execute format(
      'create policy %I on public.%I for select to anon, authenticated using (true)',
      'Public can read ' || section_name,
      table_name
    );
    execute format('drop policy if exists %I on public.%I', 'CV admin can manage ' || section_name, table_name);
    execute format(
      'create policy %I on public.%I for all to authenticated using (exists (select 1 from public.cv_admins where user_id = auth.uid())) with check (exists (select 1 from public.cv_admins where user_id = auth.uid()))',
      'CV admin can manage ' || section_name,
      table_name
    );
  end loop;
end
$$;

insert into public.cv_profile (
  id, name, title, summary, email, phone, location, github, photo_url, font_family, accent_color
) values (
  1,
  'Hussein Ali Abdulrahman',
  'Business Information Technology Specialist',
  'Seeking employment opportunity in Business Information Technology where I can utilize my technical skills, education, and passion for technology to contribute to organizational success.',
  'husseinali2334@gmail.com',
  '+255 658 216 348',
  'Mombasa - Zanzibar',
  'https://github.com/Hussein2334',
  '/images/me1.jpg',
  'Poppins',
  '#2F3C9E'
)
on conflict (id) do nothing;

insert into public.cv_education (qualification, institution, period, description)
select
  'Bachelor of Information Technology',
  'Institute of Accountancy Arusha (IAA)',
  '2023 - 2026 (Ongoing)',
  'Currently pursuing a Bachelor''s degree in Information Technology (NTA Level 8), building on my Diploma with advanced coursework in IT project management, network administration, information security, data mining, and open-source software deployment. Current Cumulative GPA (CGPA): 3.53.'
where not exists (
  select 1 from public.cv_education
  where qualification = 'Bachelor of Information Technology'
    and institution = 'Institute of Accountancy Arusha (IAA)'
);

insert into public.cv_education (qualification, institution, period, description)
select
  'Diploma in Business Information Technology',
  'Zanzibar University',
  '2021 - 2023',
  'Comprehensive study of business information systems, database management, networking, and software development.'
where not exists (
  select 1 from public.cv_education
  where qualification = 'Diploma in Business Information Technology'
    and institution = 'Zanzibar University'
);

insert into public.cv_education (qualification, institution, period, description)
select
  'Certificate in Business Information Technology',
  'Zanzibar University (ZU)',
  '2020 - 2021',
  'Fundamental knowledge in IT concepts, computer systems, and basic programming principles.'
where not exists (
  select 1 from public.cv_education
  where qualification = 'Certificate in Business Information Technology'
    and institution = 'Zanzibar University (ZU)'
);

insert into public.cv_education (qualification, institution, period, description)
select
  'Certificate of Secondary Education',
  'Al-Falaah Muslim Secondary School',
  '2016 - 2019',
  'Completed secondary education with focus on sciences and mathematics.'
where not exists (
  select 1 from public.cv_education
  where qualification = 'Certificate of Secondary Education'
);

insert into public.cv_experience (role, organization, period, description)
select
  'Field Training - Business Information Technology',
  'People''s Bank of Zanzibar (PBZ) - Malindi',
  '2023',
  'One month of intensive field training focusing on practical IT skills in a banking environment.'
where not exists (
  select 1 from public.cv_experience
  where organization like 'People''s Bank of Zanzibar (PBZ)%'
    and role = 'Field Training - Business Information Technology'
);

insert into public.cv_experience (role, organization, period, description)
select
  'Field Training - Business Information Technology',
  'Mamlaka ya Serikali Mtandao Zanzibar (eGAZ) - Mazizini',
  '2022',
  'Two months of comprehensive field training focusing on software development and system administration.'
where not exists (
  select 1 from public.cv_experience
  where organization like '%(eGAZ)%'
    and role = 'Field Training - Business Information Technology'
);

insert into public.cv_skills (name)
select seed.name from (values
  ('Business Information Technology'),
  ('PC Maintenance'),
  ('Windows Installation'),
  ('Network Troubleshooting'),
  ('Database Management'),
  ('Networking'),
  ('Printer Installation'),
  ('Website Development'),
  ('Desktop Support'),
  ('System Analysis & Design'),
  ('Mobile Development')
) as seed(name)
where not exists (select 1 from public.cv_skills where name = seed.name);

insert into public.cv_achievements (title, issuer, date, description)
select
  'UNESCO Certificate of Completion',
  'UNESCO Dar es Salaam Office & Institute of Accountancy Arusha (IAA)',
  'April 2025',
  'Successfully completed a one-year online course on Sexuality Education, HIV & AIDS, Gender-Based Violence, Relationships, and Resource Management, offered in collaboration with the UNESCO Dar es Salaam Office (April 2025).'
where not exists (
  select 1 from public.cv_achievements
  where title = 'UNESCO Certificate of Completion'
);

insert into public.cv_achievements (title, issuer, date, description)
select
  'TRA Certificate of Awards',
  'Tanzania Revenue Authority (TRA)',
  '2026',
  'Recognized by the Tanzania Revenue Authority for active participation as a Member of the IAA Tax Association, Arusha Region (2026), reflecting my growing interest in taxation and public financial systems.'
where not exists (
  select 1 from public.cv_achievements
  where title = 'TRA Certificate of Awards'
);

insert into public.cv_achievements (title, issuer, date, description)
select
  'Certificate of Recognition - ISRC',
  'Institute of Accountancy Arusha Students Organisation (IAASO)',
  '2025/2026',
  'Recognized for participation in the 2025/2026 IAA Students Organisation as an ISRC member representing BIT 3, in appreciation of my commitment, leadership skills, ethical conduct, and hardworking spirit.'
where not exists (
  select 1 from public.cv_achievements
  where title = 'Certificate of Recognition - ISRC'
);

insert into public.cv_achievements (title, issuer, date, description)
select
  'Class Representative Certificate',
  'Zanzibar University Students Organisation (ZANUSO)',
  '2022/2023',
  'Served as Class Representative for the 2022/2023 academic year at Zanzibar University, officially recognized by the Zanzibar University Students Organisation for leadership and dedication to fellow students.'
where not exists (
  select 1 from public.cv_achievements
  where title = 'Class Representative Certificate'
);

insert into public.cv_certificates (title, issuer, issue_date, image_url, description)
select
  'Bachelor of Information Technology - Current Results',
  'Institute of Accountancy Arusha (IAA)',
  '2023 - 2026 (Ongoing)',
  '/certificates/iaa_results_1.jpg',
  'Current academic results. An additional results page is available in the certificates folder.'
where not exists (
  select 1 from public.cv_certificates
  where title = 'Bachelor of Information Technology - Current Results'
);

update public.cv_certificates
set documents = '[
  {"label":"Results (Page 1)","url":"/certificates/iaa_results_1.jpg"},
  {"label":"Results (Page 2)","url":"/certificates/iaa_results_2.jpg"}
]'::jsonb
where title = 'Bachelor of Information Technology - Current Results'
  and documents = '[]'::jsonb;

insert into public.cv_certificates (title, issuer, image_url)
select
  'Diploma in Business Information Technology',
  'Zanzibar University',
  '/certificates/diploma_award.jpg'
where not exists (
  select 1 from public.cv_certificates
  where title = 'Diploma in Business Information Technology'
);

update public.cv_certificates
set documents = '[
  {"label":"Certificate","url":"/certificates/diploma_award.jpg"},
  {"label":"Academic Transcript","url":"/certificates/diploma_transcript.jpg"}
]'::jsonb
where title = 'Diploma in Business Information Technology'
  and documents = '[]'::jsonb;

insert into public.cv_certificates (title, issuer, image_url)
select
  'Certificate in Business Information Technology',
  'Zanzibar University',
  '/certificates/certificate_award.jpg'
where not exists (
  select 1 from public.cv_certificates
  where title = 'Certificate in Business Information Technology'
);

update public.cv_certificates
set documents = '[
  {"label":"Certificate","url":"/certificates/certificate_award.jpg"},
  {"label":"Academic Transcript","url":"/certificates/certificate_transcript.jpg"}
]'::jsonb
where title = 'Certificate in Business Information Technology'
  and documents = '[]'::jsonb;

insert into public.cv_certificates (title, issuer, image_url)
select
  'Certificate of Secondary Education',
  'Al-Falaah Muslim Secondary School',
  '/certificates/secondary_certificate.jpg'
where not exists (
  select 1 from public.cv_certificates
  where title = 'Certificate of Secondary Education'
);

insert into public.cv_certificates (title, issuer, image_url)
select
  'Certificate of Participation',
  'People''s Bank of Zanzibar (PBZ)',
  '/certificates/pbz_certificate.jpg'
where not exists (
  select 1 from public.cv_certificates
  where title = 'Certificate of Participation'
);

insert into public.cv_certificates (title, issuer, image_url)
select
  'Certificate of Completion',
  'Mamlaka ya Serikali Mtandao Zanzibar (eGAZ)',
  '/certificates/egaz_certificate.jpg'
where not exists (
  select 1 from public.cv_certificates
  where title = 'Certificate of Completion'
);

insert into public.cv_certificates (title, issuer, image_url, description)
select
  'SQL & SQL Server Certification',
  'Udemy',
  '/certificates/sql_certificate.jpg',
  'Completed comprehensive training program on SQL and SQL Server through Udemy, covering essential database management skills.'
where not exists (
  select 1 from public.cv_certificates
  where title = 'SQL & SQL Server Certification'
);

update public.cv_certificates
set image_url = '/certificates/sql_certificate.jpg',
    description = 'Completed comprehensive training program on SQL and SQL Server through Udemy, covering essential database management skills.'
where title = 'SQL & SQL Server Certification'
  and issuer = 'Udemy'
  and coalesce(image_url, '') = '';

insert into public.cv_certificates (title, issuer, image_url)
select
  'Burp Suite: Hands-On Testing',
  'Udemy',
  '/certificates/burpsuite_certificate.jpg'
where not exists (
  select 1 from public.cv_certificates
  where title = 'Burp Suite: Hands-On Testing'
);

insert into public.cv_certificates (title, issuer, image_url)
select
  'UNESCO Certificate of Completion',
  'UNESCO Dar es Salaam Office',
  '/certificates/unesco_certificate.jpg'
where not exists (
  select 1 from public.cv_certificates
  where title = 'UNESCO Certificate of Completion'
);

insert into public.cv_certificates (title, issuer, image_url)
select
  'TRA Certificate of Awards',
  'Tanzania Revenue Authority',
  '/certificates/tra_certificate.jpg'
where not exists (
  select 1 from public.cv_certificates
  where title = 'TRA Certificate of Awards'
);

insert into public.cv_certificates (title, issuer, image_url)
select
  'Certificate of Recognition - ISRC',
  'Institute of Accountancy Arusha (IAA)',
  '/certificates/isrc_certificate.jpg'
where not exists (
  select 1 from public.cv_certificates
  where title = 'Certificate of Recognition - ISRC'
);

insert into public.cv_certificates (title, issuer, image_url)
select
  'Class Representative Certificate',
  'Zanzibar University (ZANUSO)',
  '/certificates/zanuso_certificate.jpg'
where not exists (
  select 1 from public.cv_certificates
  where title = 'Class Representative Certificate'
);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'cv-assets',
  'cv-assets',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view CV assets" on storage.objects;
create policy "Public can view CV assets"
  on storage.objects for select to public
  using (bucket_id = 'cv-assets');

drop policy if exists "CV admin can upload assets" on storage.objects;
create policy "CV admin can upload assets"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'cv-assets'
    and exists (select 1 from public.cv_admins where user_id = auth.uid())
  );

drop policy if exists "CV admin can update assets" on storage.objects;
create policy "CV admin can update assets"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'cv-assets'
    and exists (select 1 from public.cv_admins where user_id = auth.uid())
  )
  with check (
    bucket_id = 'cv-assets'
    and exists (select 1 from public.cv_admins where user_id = auth.uid())
  );

drop policy if exists "CV admin can delete assets" on storage.objects;
create policy "CV admin can delete assets"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'cv-assets'
    and exists (select 1 from public.cv_admins where user_id = auth.uid())
  );

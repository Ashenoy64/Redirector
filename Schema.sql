create table urls (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  original_url text not null,
  created_at timestamp default now()
);

create table clicks (
  id uuid default gen_random_uuid() primary key,
  url_id uuid references urls(id) on delete cascade,
  user_agent text,
  ip_address text,
  country text,
  device text,
  os text,
  browser text,
  created_at timestamp default now()
);

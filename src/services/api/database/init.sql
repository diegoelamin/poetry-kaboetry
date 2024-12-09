-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create tables
create table public.users (
  id uuid references auth.users primary key,
  email text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.learning_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  subject text not null,
  level text not null,
  score integer not null,
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, subject, level)
);

create table public.stored_poems (
  id uuid default uuid_generate_v4() primary key,
  subject text not null,
  level text not null,
  content text not null,
  explanations text[] not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(subject, level)
);

create table public.quiz_results (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) not null,
  poem_id uuid references public.stored_poems(id) not null,
  score integer not null,
  answers jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index users_email_idx on public.users (email);
create index learning_progress_user_subject_idx on public.learning_progress (user_id, subject);
create index stored_poems_subject_level_idx on public.stored_poems (subject, level);
create index quiz_results_user_poem_idx on public.quiz_results (user_id, poem_id);

-- Enable RLS
alter table public.users enable row level security;
alter table public.learning_progress enable row level security;
alter table public.stored_poems enable row level security;
alter table public.quiz_results enable row level security;

-- Create policies
create policy "Users can read own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

create policy "Users can read own progress"
  on public.learning_progress for select
  using (auth.uid() = user_id);

create policy "Users can create own progress"
  on public.learning_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.learning_progress for update
  using (auth.uid() = user_id);

create policy "Anyone can read poems"
  on public.stored_poems for select
  to authenticated
  using (true);

create policy "Users can create poems"
  on public.stored_poems for insert
  to authenticated
  with check (true);

create policy "Users can read own quiz results"
  on public.quiz_results for select
  using (auth.uid() = user_id);

create policy "Users can create quiz results"
  on public.quiz_results for insert
  with check (auth.uid() = user_id);
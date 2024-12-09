-- Enable Row Level Security
alter table public.users enable row level security;
alter table public.learning_progress enable row level security;
alter table public.stored_poems enable row level security;
alter table public.quiz_results enable row level security;

-- Users table policies
create policy "Users can read own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

-- Learning progress policies
create policy "Users can read own progress"
  on public.learning_progress for select
  using (auth.uid() = user_id);

create policy "Users can create own progress"
  on public.learning_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.learning_progress for update
  using (auth.uid() = user_id);

-- Stored poems policies
create policy "Anyone can read poems"
  on public.stored_poems for select
  to authenticated
  using (true);

create policy "Users can create poems"
  on public.stored_poems for insert
  to authenticated
  with check (true);

-- Quiz results policies
create policy "Users can read own quiz results"
  on public.quiz_results for select
  using (auth.uid() = user_id);

create policy "Users can create quiz results"
  on public.quiz_results for insert
  with check (auth.uid() = user_id);
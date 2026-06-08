CREATE TABLE public.discord_events (
  id BIGSERIAL PRIMARY KEY,
  event_type TEXT NOT NULL,
  channel_id TEXT,
  channel_name TEXT,
  author_id TEXT,
  author_name TEXT,
  author_avatar TEXT,
  content TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX discord_events_occurred_at_idx ON public.discord_events (occurred_at DESC);

GRANT SELECT ON public.discord_events TO anon, authenticated;
GRANT ALL ON public.discord_events TO service_role;

ALTER TABLE public.discord_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read discord events"
  ON public.discord_events FOR SELECT
  USING (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.discord_events;
ALTER TABLE public.discord_events REPLICA IDENTITY FULL;
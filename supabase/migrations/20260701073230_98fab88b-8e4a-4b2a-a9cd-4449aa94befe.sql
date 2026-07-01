-- Move citext extension out of public schema
CREATE SCHEMA IF NOT EXISTS extensions;
ALTER EXTENSION citext SET SCHEMA extensions;

-- Add explicit deny policies documenting that only service_role may access
-- newsletter_subscribers and rate_limits. All writes/reads go through server
-- functions using the service role key; anon and authenticated must have no access.

-- newsletter_subscribers: deny anon & authenticated on all commands
CREATE POLICY "Deny anon access to newsletter_subscribers"
  ON public.newsletter_subscribers
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- rate_limits: deny anon & authenticated on all commands
CREATE POLICY "Deny anon access to rate_limits"
  ON public.rate_limits
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);
DROP POLICY IF EXISTS "Anyone can submit enquiry" ON public.enquiries;

CREATE POLICY "Anyone can submit enquiry"
ON public.enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'new'
  AND length(btrim(name)) BETWEEN 2 AND 100
  AND length(btrim(email)) BETWEEN 5 AND 200
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(btrim(phone)) BETWEEN 5 AND 30
  AND length(btrim(message)) BETWEEN 5 AND 2000
  AND (service IS NULL OR length(service) <= 100)
);
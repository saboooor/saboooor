Music history uses the `music` D1 binding. The `waves` KV binding remains for waves and the banner; music no longer writes to KV.

Production setup (the database ID in wrangler.jsonc is currently a local placeholder):

1. Authenticate with `vp exec wrangler login`.
2. Create the database with `vp exec wrangler d1 create saboor-music`.
3. Replace the placeholder `database_id` in wrangler.jsonc with the returned UUID.
4. Apply the schema with `vp exec wrangler d1 migrations apply saboor-music --remote`.
5. Regenerate bindings with `vp run cf-typegen`, build, and deploy using the existing workflow.

For local development, run `vp exec wrangler d1 migrations apply saboor-music --local`.

Songs are caught when a visitor loads the site or a connected visitor receives a changed playback session. The timestamp records when the site first detected that play, rather than when playback began. Detection does not run while nobody has the site open. Playback start timestamps deduplicate detections across visitors and allow later replays of the same song to appear separately. Without a playback start timestamp, consecutive detections of the same song share an entry.

History displays each song once, using its latest caught date and time. Likes are shared across all plays of that song. An HTTP-only browser cookie identifies visitors; a database uniqueness constraint prevents duplicate likes from that browser across repeated plays. Clearing cookies or changing browsers creates a new visitor. Likes are additive, with no unlike operation. History loads 50 entries at a time. Caught dates are displayed in America/Toronto time.

The previous KV song is left untouched and is not imported with an invented caught timestamp.

Cloudflare migration reference: https://developers.cloudflare.com/d1/reference/migrations/

The Drizzle setup follows birdflop/web: `drizzle/schema.ts`, `drizzle.config.ts`, a typed `AppDatabase` in `src/util/db.ts`, and the request plugin `src/routes/plugin@!db.ts`. Queries use Drizzle; D1 remains the underlying binding. Existing migration filenames are preserved in `drizzle/migrations` so Wrangler does not replay them.

Generate schema changes with `vp run drizzle:generate` and validate the migration journal with `vp run drizzle:check`. Apply generated migrations through Wrangler using the local/remote commands above. `vp run drizzle:push` and `vp run drizzle:studio` use `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_DATABASE_ID`, and `CLOUDFLARE_D1_TOKEN`, matching birdflop's config. Use Wrangler for migration application to keep the existing Wrangler migration tracking; do not mix Drizzle's separate migration tracking into an already migrated database.

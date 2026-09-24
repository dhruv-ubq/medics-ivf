# medics IVF website (v5: MongoDB backed)

Next.js 14 (App Router) with its own backend (route handlers) and MongoDB. Marketing pages are static and
refresh automatically when content is published. The content studio at `/admin` is protected by sign in.

## 1. Setup (Local)

```bash
npm install
docker compose up -d          # or run your own MongoDB on localhost:27018
cp .env.example .env          # a ready .env is included for local development
npm run seed                  # indexes, roles, first admin user, default content
npm run build && npm start    # or: npm run dev
```

## 2. Docker Deployment (Using your own MongoDB)

```bash
# 1. Prepare .env with your MongoDB URI and initial credentials
cp .env.example .env

# 2. Build and start the container
docker compose up -d --build

# 3. Run seed inside the container
docker compose exec app npm run seed

# (If admin exists and you need to reset password / unlock account):
docker compose exec app npm run seed:reset
```

Sign in at **http://localhost:3000/admin/login** with `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` from `.env`.

### .env
| Variable | Purpose |
|---|---|
| `MONGODB_URI` | `mongodb://localhost:27018/medics-ivf` |
| `MONGODB_DB` | `medics-ivf` |
| `SESSION_TTL_HOURS` | Admin session lifetime (default 8) |
| `SEED_ADMIN_EMAIL`, `SEED_ADMIN_NAME`, `SEED_ADMIN_PASSWORD` | Used only by the seed script |

### Seed script (`scripts/seed.mjs`), safe to rerun
```bash
npm run seed                                                    # from .env
npm run seed -- --email mohit@ubq.in --password "Str0ng!pass" --name "Mohit"
npm run seed -- --reset-password     # reset the admin's password (also unlocks a locked account)
npm run seed -- --reset-content      # overwrite content with defaults, as a new version
```
Passwords must be at least 10 characters with letters and numbers. Existing users and content are never overwritten without a flag.

## 2. Publishing workflow (replaces the old export and upload step)
1. **Edit** in `/admin`. Every change autosaves as a **draft** in MongoDB. Visitors never see drafts.
2. **Preview draft** opens the real site with your unpublished changes (Next.js draft mode, only for signed in users).
3. **Review and publish** shows which sections changed. Publishing makes them live within seconds
   (on-demand revalidation) and stores a **version** with who, when and a note.
4. **History** lets you load any past version into the draft and republish it (rollback). **Discard draft** reverts to live.
5. **Recent activity** is an audit trail of edits, publishes, restores and discards.

Roles: `admin` can edit and publish. `editor` can edit and save drafts only.

## 3. Data model (MongoDB)
| Collection | Contents |
|---|---|
| `users` | email (unique), name, role, bcrypt `passwordHash` (cost 12), active, failedAttempts, lockedUntil, lastLoginAt |
| `roles` | `admin`, `editor` with permission lists |
| `sessions` | SHA-256 hash of the session token, userId, expiresAt (TTL index), ip, user agent |
| `content` | one document per section (`brand`, `clients`, `integrations`, `certifications`, `testimonials`, `banners`) with `draft`, `published`, `version` |
| `content_versions` | every published version, for rollback |
| `audit_log` | who did what, when |
| `media.files` / `media.chunks` | uploaded images (GridFS), served at `/api/media/:id` |

## 4. Security
- Passwords hashed with bcrypt, never stored or logged in plain text. Same error for wrong email or password.
- Account locks for 15 minutes after 5 failed attempts.
- Sessions: random 256-bit token in an httpOnly, SameSite=Lax cookie (Secure in production), stored hashed, revocable, expire automatically.
- Every admin API checks the session and role permission in the database. Middleware blocks `/admin` without a session.
- CSRF: state changing requests must come from the same origin.
- All content is validated with schemas (zod). Images must be uploaded, not pasted inline.
- Uploads: type sniffed from file bytes (PNG, JPG, WebP, GIF, SVG), 5 MB limit, served with `nosniff` and a sandbox CSP.
- Security headers on every page. `/admin` is `noindex` and `no-store`.

## 5. Production notes
- Use a managed MongoDB (replica set) and set `MONGODB_URI` in the host's secrets, not in a file.
- Run behind HTTPS so session cookies are `Secure`.
- For very large media libraries, the media module (`lib/server/media.js`) can be pointed at S3 or similar without changing the studio.
- Change the seeded admin password after first sign in (`npm run seed -- --reset-password --password "..."`).

## 6. Project map
- `app/api/auth/*`: sign in, sign out, current user
- `app/api/admin/*`: content, drafts, publish, versions, restore, discard, media, audit, preview
- `app/api/media/[id]`: public image delivery
- `lib/server/*`: db, auth, content workflow, media, validation, indexes
- `lib/defaults.js`: default content used by the seed and as a fallback
- `components/AdminStudio.jsx`: the content studio

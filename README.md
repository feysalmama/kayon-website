# Kayon Mountain IT Solutions

A responsive Next.js website for Kayon Mountain IT Solutions, built from the supplied company profile and logo. Catalogue details live in `data/catalog.ts`; industry mappings, profile-listed brands, and buyer FAQs are maintained in `data/industries.ts`, `data/brands.ts`, and `data/faqs.ts`.

## Run locally

1. Install Node.js 20 or later.
2. Run `npm install`.
3. Run `npm run dev` and open the local URL printed by Next.js.
4. Run `npm run typecheck` and `npm run build` to verify a production build.

## Self-hosted image CMS

The site includes a Payload CMS admin and PostgreSQL database. Staff can sign in at `/admin`, upload replacement images in **Media**, and assign an uploaded image to a named location in **Site images**. The first user created at `/admin` becomes the initial administrator; further accounts require an administrator session. Unassigned locations continue using the supplied company-profile images.

The Docker Compose setup stores original uploads under `data/uploads/` on the host and keeps database data in the persistent `postgres-data` named volume. No paid S3-compatible storage is required. Keep the `data/uploads` folder and database volume backed up together; losing the database removes the image-to-location assignments even if the upload files remain.

### Start with Docker

1. Install Docker Desktop (Windows/macOS) or Docker Engine and the Compose plugin (Linux).
2. Copy `.env.example` to `.env`. Set unique, long random `POSTGRES_PASSWORD` and `PAYLOAD_SECRET` values. Use letters and numbers for the database password because Compose inserts it into the PostgreSQL connection URL.
3. Run `docker compose up --build -d`.
4. Open `http://localhost:3000/admin` and create the first administrator. Uploaded photos are available immediately in the public pages; the site refreshes its cached image assignments when media or assignments change.
5. To stop the services without deleting stored data, run `docker compose down`. **Do not** run `docker compose down -v` unless you intend to delete the database.

PostgreSQL is bound to `127.0.0.1:5433` for local administration only. Do not expose that port to the public internet. Production deployment should use HTTPS, a private database network, strong secrets, scheduled database/media backups, and a reverse proxy or hosting platform in front of the web service.

To export a database backup while the Compose services are running:

```powershell
docker compose exec -T db pg_dump -U kayon -d kayon -Fc > kayon-db.backup
```

Also back up the host's `data/uploads/` directory. Restore the database and matching media files together. Store backup files and `.env` securely; neither should be committed to source control.

### Run the CMS without Docker

Provide a reachable PostgreSQL database, set `DATABASE_URI`, `PAYLOAD_SECRET`, and `PAYLOAD_PUBLIC_SERVER_URL` in `.env.local`, then run `npm run payload:migrate`, `npm run payload:importmap`, and `npm run dev`. Uploads are written to `data/uploads/`; keep that directory persistent and backed up. Never expose the development server directly to the public internet.

Database schema changes use explicit migrations; automatic development schema push is disabled to prevent interactive migration prompts from blocking Docker startup.

### Editable image locations

The **Site images** collection seeds a record for every available location when the CMS starts. Select a location and assign an uploaded **Media** item; optional location-specific alt text overrides the image's Media alt text.

- Homepage hero printer; four homepage product-category cards; homepage about teaser.
- Three homepage showcase cards and their accessible previews.
- Product explorer card imagery and the fallback image on each product detail page.
- All solution listing and detail imagery.

The bundled `/media/*.jpg` images remain safe fallbacks. Image assignments are cached on the server and invalidated when an image or assignment changes. Next.js serves responsive, optimized image renditions and caches generated variants locally. In a multi-instance deployment, use shared persistent uploads and a shared cache or CDN strategy; this Docker Compose configuration is a single-host setup.

### Product detail galleries

To show multiple photos on a product detail page, upload them in **Media**, then edit that product's record in **Product Content** and select the photos in **Product gallery**. The selected order is used on the public page: the first image is shown first, and visitors can switch images using the thumbnail controls. Products without gallery images continue to use their existing **Site images** assignment or bundled fallback. Media alt text is used for gallery accessibility.

### Brands and product assignments

Open **Product Content** to edit an existing product or create a new one. For a new product, enter its **Product name**, a unique **Product URL slug** (or leave it blank to generate from the name), category, description and optional summary/related solution. Then select its **Brand**. Use the relationship's **+** button to create a brand without leaving the product editor: enter its name, unique URL slug, brand details, and upload/select its logo. Save the brand and then save the product. Existing products may remain unassigned until their brand is confirmed.

The **Brands** collection also lists each brand's assigned products. Public brand detail pages show all assigned catalogue products; product details link back to their brand. The brand directory and homepage/About brand marquees use these same CMS records. Existing company-profile brands and their documented assignments are seeded once when each brand is first added. Changing or clearing a product's brand is respected on subsequent starts.

Apply the included database migration with **npm run payload:migrate** before starting an updated production deployment. Brand names, logos and details are now CMS-managed. Footer/header company logos, favicon, company profile PDF and map embed remain code-managed.

### Institution projects by industry

In **Admin ? Institutions ? Create**, select the industry and enter the institution name, institution logo, project name and project image. Both images can be selected from Media or uploaded directly with previews. Save to display the record in the right-hand list on that industry's detail page. Create another record to add another project for the same institution. Changing the industry moves the project to that industry's page.

Only administrators can create, edit or delete institution projects. Public pages show all matching records, ordered by institution name. Empty sectors show an empty-state message rather than example institutions. Apply the included database migration before updating a production deployment.

## Media and branding

- `public/brand/logo.png` is the supplied transparent company logo used in the navigation, social-sharing metadata and structured data. `public/brand/logo-footer.png` is the supplied white footer variant. `public/brand/company-profile.pdf` is the downloadable company profile.
- `public/media/*.jpg` contains image fallbacks cropped from the supplied company profile. The video showcase uses these images unless licensed product footage is configured.
- Industries and brands have separate directory pages, with dedicated detail pages for each listed sector and brand. The homepage shows a short industries preview linking to the full directory. Sector descriptions are indicative areas for discussion, not claims of sector-specific projects or customers.
- The Brands directory uses CMS-managed logos and product relationships, initially seeded from the supplied company profile. Brand enquiries ask Kayon to confirm current products and availability; they do not imply stock or an active partnership.
- The Contact page embeds a map search for Sara Building, Mekanisa Area, Addis Ababa and provides a direct directions link. The map requires an internet connection and is provided by Google Maps.
- Internal page navigation shows only the company icon (not the wordmark) while the next page loads. The transition is skipped when the visitor has requested reduced motion.
- Product and solution detail pages include FAQs based on documented offerings, links between relevant industries and catalogued solutions, and related product categories.
- Product pages and the product explorer support a multi-product quote list. Its contents are saved in the visitor's browser with local storage and passed into the contact enquiry; clearing browser storage removes the saved list. Visitors can also use the ID-card-printer guide to carry their requirements into an enquiry. Neither feature selects or promises a particular model.
- No video clips were provided. Place licensed, muted H.264 MP4 clips in `public/media/` and configure their public paths in `.env.local`:

  ```dotenv
  NEXT_PUBLIC_SITE_URL=https://your-published-domain.example
  NEXT_PUBLIC_HERO_VIDEO=/media/hero-security.mp4
  NEXT_PUBLIC_PRINTER_VIDEO=/media/printer-process.mp4
  NEXT_PUBLIC_VISITOR_VIDEO=/media/visitor-management.mp4
  NEXT_PUBLIC_IDENTITY_VIDEO=/media/identity-printing.mp4
  ```

  Use a 10–20 second loop for the hero clip. The hero video and modal players are muted, inline, and expose native pause/play controls. Showcase clips load only when a visitor opens a preview. Leave a video variable unset to keep that preview on the profile-image fallback; do not configure a path until its file is present. Rebuild/restart Next.js after changing public environment variables.

## Enquiries

Website enquiries are validated and saved to PostgreSQL through the Payload-backed `/api/enquiries` endpoint. Administrators can review and update their status in the **Enquiries** collection at `/admin`; visitors receive success feedback only after the record is saved. Submissions are not currently emailed automatically, so staff should check the admin dashboard for new requests. Direct call and email alternatives remain available on the Contact page.

Set `NEXT_PUBLIC_SITE_URL` to the actual published site origin before deployment so Open Graph and structured-data image URLs use the correct domain. The domain was not included in the supplied company profile.

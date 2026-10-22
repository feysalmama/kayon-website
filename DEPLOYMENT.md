# Deploy from GitHub to Contabo with Coolify

The local Docker setup remains in `docker-compose.yml`. Use
`docker-compose.coolify.yml` for a Git-based Coolify application on your VPS.

## One-time setup

1. Install [Coolify](https://coolify.io/docs/get-started/installation) on the
   Contabo VPS. If the VPS already hosts websites, check existing port usage
   before installing its proxy. Configure the server firewall according to the
   installation guide and finish the initial administrator setup promptly.
2. Push this source to a private GitHub repository. Keep `.env`, database dumps,
   and `data/uploads` outside Git. The repository does not contain live CMS data.
3. In Coolify, connect GitHub, create a project, then add a Git-based application
   from this repository. Select your deployment branch.
4. Choose **Docker Compose** as the build strategy, base directory `/`, and
   Compose location `/docker-compose.coolify.yml`. Use the normal managed
   deployment mode, not Raw Compose.
5. Set these environment variables in Coolify:

   | Variable | Value |
   | --- | --- |
   | `POSTGRES_PASSWORD` | A unique random password, using hexadecimal characters to avoid connection-URL escaping |
   | `PAYLOAD_SECRET` | A separate unique random secret of at least 32 characters |
   | `PAYLOAD_PUBLIC_SERVER_URL` | `https://your-domain.com` |
   | `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` |

   Mark secrets as sensitive. The Compose file passes the public site URL as a
   Docker build argument. Optional `NEXT_PUBLIC_*_VIDEO` paths can be configured
   before building if their files exist in `public/`.
6. Point the domain's DNS A record at the VPS. Assign
   `https://your-domain.com:3000` to the **web** service in Coolify. The `3000`
   suffix selects the internal container port; visitors use normal HTTPS.
   Keep the database private. Coolify manages routing and HTTPS.
7. Deploy and inspect the deployment logs. Database migrations run automatically
   before the web server starts. If starting with a fresh database, create your
   first administrator at `/admin` before sharing the site.
8. Enable automatic deployment for the deployment branch through the GitHub
   integration. Verify the first push triggers a deployment.

## Existing CMS content

GitHub transfers application code, not your local PostgreSQL database or uploaded
images. To keep existing products, categories, accounts and images, take a
PostgreSQL custom-format dump and copy `data/uploads` from the local deployment.
Restore the database into the VPS database and the files into the `uploads`
volume during a planned migration with the web service stopped. For a database
restored after an initial fresh deployment, restore into a new empty database
rather than overlaying existing tables. Preserve relationships by transferring
the database and uploads together. Database credentials belong to the new VPS
environment; existing CMS users come from the restored database.

Named volumes keep the VPS database and uploads across code deployments. Back
both up off-server. Do not delete the application volumes or run `down -v`.

## Future updates

Push code to the configured deployment branch. Coolify builds and deploys it.
Manage category/product content in the CMS; content edits do not require a Git
push. Back up the database and uploads before updates that change schema.

Reference: [Coolify Git-based Docker Compose deployments](https://coolify.io/docs/applications/builds/docker-compose).

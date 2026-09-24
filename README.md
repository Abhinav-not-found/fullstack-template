# Fullstack Template

A reusable full-stack project template with a TypeScript, Express, MongoDB backend. The `client` folder is reserved for the frontend setup and can be updated later.

## Using This Template

### 1. Create a Repository from the Template

Open the GitHub repository and select **Use this template → Create a new repository**.

Choose your new repository name and create the repository.

### 2. Clone Your Repository

```bash
git clone <your-repository-url>
cd <your-project-name>
```

### 3. Set Up the Server

Move into the server directory:

```bash
cd server
```

Install the dependencies:

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `server` directory:

```text
server/
├── .env
├── package.json
└── src/
```

Add the required environment variables:

```env
PORT=
MONGODB_URI=
NODE_ENV=
JWT_SECRET_ACCESS=
JWT_SECRET_REFRESH=
```

Set the values according to your project.

### 5. Start the Development Server

From the `server` directory:

```bash
npm run dev
```

The development server runs using `tsx` with watch mode, so changes to the TypeScript source are automatically picked up.

### 6. Build the Server

To compile the TypeScript source:

```bash
npm run build
```

The compiled output is generated inside:

```text
server/dist/
```

### 7. Run the Production Build

```bash
npm start
```

This builds the server and then starts the compiled application from `dist/server.js`.

## OpenAPI

The template includes OpenAPI generation.

To generate the OpenAPI specification:

```bash
npm run generate:openapi
```

The generated specification is placed at:

```text
server/src/generated/openapi.json
```

### Generate the API Client

The template also includes a script for generating the frontend API client:

```bash
npm run generate:client
```

This generates the client inside:

```text
client/src/api/
```

The `client` folder is currently empty and can be replaced or updated with your preferred frontend setup.

## Available Server Commands

Run these commands from the `server` directory:

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server with watch mode |
| `npm run build` | Compile TypeScript to `dist` |
| `npm start` | Build and start the compiled server |
| `npm run generate:openapi` | Generate the OpenAPI specification |
| `npm run generate:client` | Generate the API client in `client/src/api` |

## Starting Your Own Project

After creating a repository from this template:

```text
your-project/
├── client/
└── server/
```

Set up the server first:

```bash
cd server
npm install
```

Create your `.env` file, then start development:

```bash
npm run dev
```

You can then add or replace the frontend inside `client/` according to your project's requirements.

## Updating the Template

When the template itself is updated, create new repositories from the latest version of the GitHub template so that new projects start with the latest setup.
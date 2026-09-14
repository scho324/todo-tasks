How to run the application:
Set up a new Convex project

- npx convex dev

Make GitHub OAuth app - Settings -> Developer settings -> OAuth Apps -> New OAuth App

- Any application name, homepage URL http://localhost:5173, redirect URI https://convex-name-123.convex.site
- Make a new client secret on the OAuth settings, and copy the client ID and client secret
- npx convex env set AUTH_GITHUB_ID (client ID)
- npx convex env set AUTH_GITHUB_SECRET (client secret)
- npx convex env set SITE_URL http://localhost:5173

Run the app

- npm run dev

Additionally, can see the deployed website - https://scho324.github.io/todo-tasks/

Architecture:

- Client-server architecture; the application defines the possible actions the client can do in the files within the convex folder, and components call those functions while the Convex backend handles the database in response.
- Monolithic; the todo tasks site isn't large enough to require different features being split up into microservices.

Tech stack:

- Front-end: JavaScript/TypeScript, React - type safety, modular components, state handling
- Back-end/Database: Convex - I don't have experience with PostgreSQL or the other database softwares mentioned in the assignment, so I went with the backend-as-a-service Convex since I used it before in Full-Stack JavaScript

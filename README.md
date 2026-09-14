How to run the application:
npm run dev

Additionally, can see the deployed website - https://scho324.github.io/todo-tasks/

Architecture:

- Client-server architecture; the application defines the possible actions the client can do in the files within the convex folder, and components call those functions while the Convex backend handles the database in response.
- Monolithic; the todo tasks site isn't large enough to require different features being split up into microservices.

Tech stack:

- Front-end: JavaScript/TypeScript, React - type safety, modular components, state handling
- Back-end/Database: Convex - I don't have experience with PostgreSQL or the other database softwares mentioned in the assignment, so I went with the backend-as-a-service Convex since I used it before in Full-Stack JavaScript

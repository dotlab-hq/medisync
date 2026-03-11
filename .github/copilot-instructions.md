# Rules to follow whatever user intructions are:

- Do not ever use `any` data type
- make sure no code file is more than 200 lines long. If it is, split it into multiple files.
- For React components, use functional components and hooks. Do not use class components.
- use TypeScript for all code files. Do not use JavaScript.
- For styling, use Tailwind CSS. Do not use plain CSS or other styling libraries.
- Use CreateServerFunction
  `import { createServerFn } from '@tanstack/react-start'
  import { z } from 'zod'

const UserSchema = z.object({
name: z.string().min(1),
age: z.number().min(0),
})

export const createUser = createServerFn({ method: 'POST' })
.inputValidator(UserSchema)
.handler(async ({ data }) => {
// data is fully typed and validated
return `Created user: ${data.name}, age ${data.age}`
})`

- for auth use better-auth server side using the severFunctions
- each page should have its own necessary function and zod validation
- the favourable approach sis self-contaied code files

- You are allowed to use the `pnpm build` command only once and struictly based on user approval explicitly
- UI should handle optimistic updates and error states gracefully, providing feedback to the user.
- Ensure that all server functions have proper error handling and return meaningful error messages to the client.

# UI rules

- For forms, use React Hook Form for handling form state and validation. Do not use other form libraries.
- For modals, use a custom modal component that you create. You must use ShadCn components

# Redirection Rule

- `/` page when user isnot logged in goes to /auth
- `/auth` page no matter what just redirects to /auth/signin
- `/auth/signin` page when user is logged in goes to /
- `/auth/signup` page when user is logged in goes to /
- if user is not email veriffied, redirect to /auth/verify-email
- forgot-password, rset-password pages should be there as well and should handle the auth flow properly

# Skills

You might nat have all the skills required to implement the features,so u should use search to find the skills u do have the ability to learn and apply. Always try to find the best solution for the problem at hand, even if it means learning something new.

# Learn From Feedback and Mistakes

create a `Agents.md` file in the root of the project to document the feedback and mistakes you encounter during development. This will help you learn and improve over time. Include the following sections in the file:

- **Feedback**: Document any feedback you receive from users, team members, or stakeholders. This can include suggestions for improvement, bug reports, or general comments about the project.
- **Mistakes**: Document any mistakes you make during development, including what went wrong, how you fixed it, and what you learned from the experience. This can help you avoid making the same mistakes in the future and improve your problem-solving skills.

# For storing state and data

use 'zustand' for client side state management and use better-auth for authentication and session management. For server side data fetching and mutations, use the server functions created with `createServerFn` and call them from the client using the generated hooks.

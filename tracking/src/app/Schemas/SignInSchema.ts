import {z} from 'zod'

export const SignInSchema = z.object({
    username : z.string().regex(/^[A-Z][a-zA-Z0-9]*$/, {
        message: "Username must start with a capital letter and contain only letters and numbers.",
      }),
    email : z.string(),
    password : z.string().length(8),
})
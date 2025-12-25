import { Button } from '@/components/ui/button.tsx'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Spinner } from '@/components/ui/spinner.tsx'
import { Typography } from '@/components/ui/typography.tsx'
import { logIn } from '@/lib/utils/auth.ts'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { z } from 'zod'

const formSchema = z.object({
  email: z.email('Adresse email invalide'),
  password: z
  .string()
  .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
  .regex(
    /[A-Z]/,
    'Le mot de passe doit contenir au moins une lettre majuscule',
  )
  .regex(
    /[a-z]/,
    'Le mot de passe doit contenir au moins une lettre minuscule',
  )
  .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
  .regex(
    /[^A-Za-z0-9]/,
    'Le mot de passe doit contenir au moins un caractère spécial',
  ),
})

export const LoginForm = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        const errorMessage = errorData.error || 'Erreur lors de la connexion'
        throw new Error(errorMessage)
      }

      const data: { token: string } = await res.json();

      return data;
    },
  })
  const form = useForm({
    defaultValues: {
      email: 'test@test.test',
      password: '123456Aa*',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const data = await loginMutation.mutateAsync({
          email: value.email,
          password: value.password,
        })
        const sessionRes = await logIn({ data })
        queryClient.invalidateQueries({ queryKey: ['isLoggedIn'] })
        queryClient.invalidateQueries({ queryKey: ['isAdmin'] })

        if (sessionRes.redirect) {
          await navigate({ to: sessionRes.redirect })
        }
      } catch (error) {
        // L'erreur est déjà gérée par la mutation et sera affichée via loginMutation.error
      }
    },
  })

  return <Card>
    <CardHeader>
      <CardTitle>
        <Typography type="h1" className="text-3xl">
          Connexion
        </Typography>
      </CardTitle>
      <CardDescription>
        <Typography type="p">
          Entrer vos identifiants pour vous connecter.
        </Typography>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form
        id="login-form"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email :</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="test@test.test"
                    autoComplete="off"
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )
            }}
          </form.Field>
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password :</FieldLabel>
                  <Input
                    type="password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="123456Aa*"
                    autoComplete="off"
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )
            }}
          </form.Field>
        </FieldGroup>
        {loginMutation.error && (
          <div className="mt-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
            {loginMutation.error.message || 'Erreur lors de la connexion'}
          </div>
        )}
      </form>
    </CardContent>
    <CardFooter>
      <Field orientation="horizontal" className="justify-end">
        { loginMutation.isPending ? <Spinner /> : <>
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button type="submit" form="login-form">
            Envoyer
          </Button>
        </>}
      </Field>
    </CardFooter>
  </Card>
}
import { Button } from '@/components/ui/button.tsx'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Spinner } from '@/components/ui/spinner.tsx'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { FC, useState } from 'react'
import { toast } from "sonner"
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { User } from 'generated/prisma/client.ts'

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

const getRandomEmail = () => {
  return `test${Math.floor(Math.random() * 10000)}@test.test`
}

export const AddUser: FC<{
  onSuccess: (user: User) => void
}> = ({
  onSuccess,
}) => {
  const [defaultEmail, setDefaultEmail] = useState(getRandomEmail())
  const [isOpen, setIsOpen] = useState(false);

  const createUserMutation = useMutation({
    mutationFn: async (payload: z.infer<typeof formSchema>)=> {
      const res = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        throw new Error('Erreur lors de la création de l\'utilisateur')
      }
      const data: User = await res.json()
      return data;
    },
    onSuccess: (data) => {
      onSuccess(data)
    },
  })

  const form = useForm({
    defaultValues: {
      email: defaultEmail,
      password: '123456Aa*',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await createUserMutation.mutateAsync({
          email: value.email,
          password: value.password,
        })

        setIsOpen(false)
      } catch (error) {
        toast.error('Erreur lors de la création de l\'utilisateur')
        console.error('Erreur lors de la création de l\'utilisateur:', error)
      }
    },
  })
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button disabled={createUserMutation.isPending}>
          {createUserMutation.isPending ? <Spinner /> : <Plus />}
          Ajouter un utilisateur
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un utilisateur</DialogTitle>
          <DialogDescription>
            Entrez les informations de l'utilisateur que vous souhaitez ajouter.
          </DialogDescription>
        </DialogHeader>
        <Button onClick={() => {
          const newEmail = getRandomEmail()
          setDefaultEmail(newEmail)
          form.setFieldValue('email', newEmail)
        }}>
          Générer un email aléatoire
        </Button>
        <form
          id="add-user-form"
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
                      type="email"
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
        </form>
        <DialogFooter>
          <Button type="submit" form="add-user-form">
            Ajouter l'utilisateur
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
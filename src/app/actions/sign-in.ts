'use server'

import { signIn } from '@/auth'

export async function signInAction(formData: {
  identifier: string
  password: string
}) {
  const result = await signIn('credentials', {
    redirect: false,
    ...formData,
  })

  return result
}

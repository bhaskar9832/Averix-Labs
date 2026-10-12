'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { sql } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { encrypt } from '@/lib/auth'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  let user = null;
  let isValid = false;

  try {
    const users = await sql`SELECT * FROM admin_users WHERE email = ${email} LIMIT 1`
    user = users[0]
    
    if (user) {
      isValid = await bcrypt.compare(password, user.password_hash)
    }
  } catch(err) {
    console.error('Database connection error during login:', err)
  }

  if (!user || !isValid) {
    redirect('/admin/login?message=Invalid credentials')
  }

  const sessionData = { id: user.id, email: user.email, name: user.full_name }
  const sessionToken = await encrypt(sessionData)

  const cookieStore = await cookies()
  cookieStore.set('session', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  })

  redirect('/admin/dashboard')
}

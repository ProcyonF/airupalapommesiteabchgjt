import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// Ces identifiants devraient être stockés de manière sécurisée (par exemple dans une base de données)
const VALID_USERNAME = 'admin'
const VALID_PASSWORD = 'admin123'

export async function POST(request) {
  const body = await request.json()
  const { username, password } = body

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    // Créer un cookie de session
    cookies().set('auth-token', 'votre-token-secret', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600 // 1 heure
    })

    return NextResponse.json({ success: true })
  }

  return NextResponse.json(
    { success: false, message: 'Identifiants invalides' },
    { status: 401 }
  )
}

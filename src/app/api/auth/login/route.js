import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/config'

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body

    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    const idToken = await user.getIdToken()

    // Créer un cookie de session avec le token Firebase
    cookies().set('auth-token', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600 // 1 heure
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 401 }
    )
  }
}

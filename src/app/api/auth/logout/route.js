import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { auth } from '@/firebase/config'
import { signOut } from 'firebase/auth'

export async function POST() {
  try {
    // Déconnexion de Firebase
    await signOut(auth)
    
    // Supprimer le cookie
    cookies().delete('auth-token')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}

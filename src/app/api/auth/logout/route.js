import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  // Supprimer le cookie d'authentification
  cookies().delete('auth-token')
  
  return NextResponse.json({ success: true })
}

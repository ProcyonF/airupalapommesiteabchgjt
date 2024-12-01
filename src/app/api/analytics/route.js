import { NextResponse } from 'next/server';
import { db } from '../../../firebase/config';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';

export async function POST(request) {
  try {
    const { userId, timestamp } = await request.json();
    
    const visitsRef = collection(db, 'visits');
    await addDoc(visitsRef, {
      userId,
      timestamp: Timestamp.fromDate(new Date(timestamp))
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging visit:', error);
    return NextResponse.json({ error: 'Failed to log visit' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const visitsRef = collection(db, 'visits');
    
    // Get today's start and end timestamps
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const q = query(
      visitsRef,
      where('timestamp', '>=', Timestamp.fromDate(today)),
      where('timestamp', '<', Timestamp.fromDate(tomorrow))
    );

    const querySnapshot = await getDocs(q);
    
    // Count total visits
    const totalVisits = querySnapshot.size;
    
    // Count unique visitors
    const uniqueVisitors = new Set();
    querySnapshot.forEach(doc => {
      const data = doc.data();
      if (data.userId) uniqueVisitors.add(data.userId);
    });

    return NextResponse.json({
      totalVisits,
      uniqueVisitors: uniqueVisitors.size
    });
  } catch (error) {
    console.error('Error getting analytics:', error);
    return NextResponse.json({ error: 'Failed to get analytics' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { db } from '../../../firebase/config';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';

export async function POST(request) {
  try {
    const { userId, timestamp, page } = await request.json();
    
    const visitsRef = collection(db, 'visits');
    await addDoc(visitsRef, {
      userId,
      timestamp: Timestamp.fromDate(new Date(timestamp)),
      page: page || '/'
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
    
    // Get timestamps for different periods
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    // Get tomorrow for range queries
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Query for today's visits
    const todayQuery = query(
      visitsRef,
      where('timestamp', '>=', Timestamp.fromDate(today)),
      where('timestamp', '<', Timestamp.fromDate(tomorrow))
    );
    const todaySnapshot = await getDocs(todayQuery);
    
    // Query for yesterday's visits
    const yesterdayQuery = query(
      visitsRef,
      where('timestamp', '>=', Timestamp.fromDate(yesterday)),
      where('timestamp', '<', Timestamp.fromDate(today))
    );
    const yesterdaySnapshot = await getDocs(yesterdayQuery);

    // Query for week's visits
    const weekQuery = query(
      visitsRef,
      where('timestamp', '>=', Timestamp.fromDate(weekAgo))
    );
    const weekSnapshot = await getDocs(weekQuery);

    // Query for month's visits
    const monthQuery = query(
      visitsRef,
      where('timestamp', '>=', Timestamp.fromDate(monthAgo))
    );
    const monthSnapshot = await getDocs(monthQuery);

    // Process data
    const todayVisitors = new Set();
    const yesterdayVisitors = new Set();
    const weeklyVisitors = new Set();
    const monthlyVisitors = new Set();
    const pageViews = {};

    todaySnapshot.forEach(doc => {
      const data = doc.data();
      if (data.userId) todayVisitors.add(data.userId);
      pageViews[data.page || '/'] = (pageViews[data.page || '/'] || 0) + 1;
    });

    yesterdaySnapshot.forEach(doc => {
      const data = doc.data();
      if (data.userId) yesterdayVisitors.add(data.userId);
    });

    weekSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.userId) weeklyVisitors.add(data.userId);
    });

    monthSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.userId) monthlyVisitors.add(data.userId);
    });

    // Sort pages by views
    const topPages = Object.entries(pageViews)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

    return NextResponse.json({
      today: {
        totalVisits: todaySnapshot.size,
        uniqueVisitors: todayVisitors.size
      },
      yesterday: {
        totalVisits: yesterdaySnapshot.size,
        uniqueVisitors: yesterdayVisitors.size
      },
      weekly: {
        totalVisits: weekSnapshot.size,
        uniqueVisitors: weeklyVisitors.size
      },
      monthly: {
        totalVisits: monthSnapshot.size,
        uniqueVisitors: monthlyVisitors.size
      },
      topPages
    });
  } catch (error) {
    console.error('Error getting analytics:', error);
    return NextResponse.json({ error: 'Failed to get analytics' }, { status: 500 });
  }
}

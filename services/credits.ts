import { supabase } from '@/lib/supabase';

export async function getUserCredits(): Promise<number> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return 0;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/credits`, {
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch credits');
    }

    const data = await response.json();
    return data.credits;
  } catch (error) {
    console.error('Error in getUserCredits:', error);
    return 0;
  }
} 
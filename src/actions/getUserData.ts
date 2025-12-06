'use server';
import { cookies } from 'next/headers';
import { fetchBirthdayData } from '@/lib/cloudburstApi';

export interface UserData {
    personName: string;
    dateOfBirth: string;
    cards: any[];
    isPreview?: boolean;
}

export async function getUserData(): Promise<UserData | null> {
    const cookieStore = await cookies();

    try {
        const isPreview = cookieStore.get('is_preview')?.value === 'true';

        if (isPreview) {
            const previewName = cookieStore.get('preview_name')?.value || 'Your Friend';
            const previewDob = cookieStore.get('preview_dob')?.value || new Date(new Date().setFullYear(new Date().getFullYear() - 10)).toISOString().split('T')[0];

            return {
                personName: previewName,
                dateOfBirth: previewDob,
                cards: [],
                isPreview: true,
            };
        }

        // Normal mode - fetch from database
        const dbId = cookieStore.get('birthday_db_id')?.value;

        if (!dbId) {
            return null;
        }

        const result = await fetchBirthdayData(dbId);

        if (!result.success || !result.data) {
            return null;
        }

        return {
            personName: result.data.personName,
            dateOfBirth: result.data.dateOfBirth,
            cards: result.data.cards || [],
            isPreview: false,
        };
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

'use server';
import { cookies } from 'next/headers';
import { fetchBirthdayData } from '@/lib/cloudburstApi';

export interface UserData {
    dbId: string;
    personName: string;
    dateOfBirth: string;
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
                dbId: "preview",
                personName: previewName,
                dateOfBirth: previewDob,
                isPreview: true,
            };
        }

        const dbId = cookieStore.get('birthday_db_id')?.value;

        if (!dbId) {
            return null;
        }

        const result = await fetchBirthdayData(dbId);

        if (!result.success || !result.data) {
            return null;
        }

        return {
            dbId,
            personName: result.data.personName,
            dateOfBirth: result.data.dateOfBirth,
            isPreview: false,
        };
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

"use server";

const CLOUDBURST_API_BASE = process.env.CLOUDBURST_API_URL || 'https://cloudburstlab.vercel.app';
const APP_ID = process.env.APP_ID;
const APP_SECRET = process.env.APP_SECRET;

export interface BirthdayData {
  personName: string;
  dateOfBirth: string;
  cards: CardData[];
}

export interface CardData {
  id: string;
  theme: string;
  font: string;
  message: string;
  imageUrl?: string;
  createdAt: string;
}

export interface StorageResponse {
  success: boolean;
  databaseId?: string;
  data?: BirthdayData & {
    createdAt?: any;
    updatedAt?: any;
  };
  error?: string;
}

async function validateAppCredentials(): Promise<void> {
  if (!APP_ID || !APP_SECRET) {
    throw new Error('App credentials not configured');
  }
}

export async function getApplicationDataById(databaseId: string): Promise<StorageResponse> {
  try {
    await validateAppCredentials();

    const response = await fetch(`${CLOUDBURST_API_BASE}/api/apps/${APP_ID}/storage/${databaseId}`, {
      method: 'GET',
      headers: {
        'X-App-Secret': APP_SECRET!,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch data');
    }

    const result = await response.json();
    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('Error fetching application data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function saveApplicationStorage(data: BirthdayData): Promise<StorageResponse> {
  try {
    await validateAppCredentials();

    const response = await fetch(`${CLOUDBURST_API_BASE}/api/apps/${APP_ID}/storage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-App-Secret': APP_SECRET!,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to save data');
    }

    const result = await response.json();
    return {
      success: true,
      databaseId: result.databaseId,
    };
  } catch (error) {
    console.error('Error saving application storage:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function updateApplicationStorage(databaseId: string, data: BirthdayData): Promise<StorageResponse> {
  try {
    await validateAppCredentials();

    const response = await fetch(`${CLOUDBURST_API_BASE}/api/apps/${APP_ID}/storage/${databaseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-App-Secret': APP_SECRET!,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update data');
    }

    return {
      success: true,
      databaseId,
    };
  } catch (error) {
    console.error('Error updating application storage:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function deleteApplicationStorage(databaseId: string): Promise<StorageResponse> {
  try {
    await validateAppCredentials();

    const response = await fetch(`${CLOUDBURST_API_BASE}/api/apps/${APP_ID}/storage/${databaseId}`, {
      method: 'DELETE',
      headers: {
        'X-App-Secret': APP_SECRET!,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete data');
    }

    return {
      success: true,
      databaseId,
    };
  } catch (error) {
    console.error('Error deleting application storage:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

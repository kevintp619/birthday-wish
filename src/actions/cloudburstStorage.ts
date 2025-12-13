"use server";
import { headers } from "next/headers";

const CLOUDBURST_API_BASE = process.env.CLOUDBURST_API_URL || 'https://cloudburstlab.vercel.app';
const APP_ID = process.env.APP_ID;
const APP_SECRET = process.env.APP_SECRET;

export interface CardData {
  id: string;
  font: string;
  message: string;
  imageUrl: string;
  createdAt: Date;
}

export interface BirthdayData {
  id?: string;
  personName: string;
  dateOfBirth: string;
  senderName: string;
  collection?: {
    name: string;
    data: CardData[];
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface StorageResponse<T = any> {
  success: boolean;
  databaseId?: string;
  data?: T;
  error?: string;
}

async function validateAppCredentials(): Promise<void> {
  if (!APP_ID || !APP_SECRET) {
    throw new Error('App credentials not configured');
  }
}

export async function getApplicationDataById<T = BirthdayData>(
  databaseId: string, 
  subCollectionName?: string
): Promise<StorageResponse<T>> {
  try {
    await validateAppCredentials();

    let url = `${CLOUDBURST_API_BASE}/api/apps/${APP_ID}/storage/${databaseId}`;

    if (subCollectionName) {
      url += `?subCollection=${encodeURIComponent(subCollectionName)}`;
    }

    const response = await fetch(url, {
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
      data: result.data as T,
    };
  } catch (error) {
    console.error('Error fetching application data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function saveApplicationStorage(data: BirthdayData): Promise<StorageResponse<BirthdayData>> {
  try {
    await validateAppCredentials();

    const headersList = await headers();
    let address = null;
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : null;

    if (ip) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500);

        const url = `https://ipwho.is/${encodeURIComponent(ip)}`;
        const res = await fetch(url, {
          headers: { accept: "application/json" },
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const geoData = await res.json();
          if (geoData?.success) {
            address = {
              street: `isp: ${geoData.connection?.isp ?? geoData.connection?.org}, lat: ${geoData.latitude}, long: ${geoData.longitude}`,
              continent: geoData.continent,
              country: geoData.country,
              countryCode: geoData.country_code,
              region: geoData.region,
              city: geoData.city,
              postalCode: geoData.postal ?? geoData.postal_code ?? geoData.zip,
              timezone: geoData.timezone?.id ?? geoData.timezone,
            };
          }
        }
      } catch (err) {
        
      }
    }

    let retries = 0;
    const maxRetries = 5;

    while (retries < maxRetries) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let docId = '';
      for (let i = 0; i < 8; i++) {
        docId += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      const finalData = { ...data, id: docId, ip, address };

      const response = await fetch(`${CLOUDBURST_API_BASE}/api/apps/${APP_ID}/storage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-App-Secret': APP_SECRET!,
        },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          databaseId: result.databaseId,
        };
      }

      const errorData = await response.json();
      const errorMessage = errorData.error || errorData.message || 'Unknown error';

      if (errorMessage.includes('already exists')) {
        retries++;
        continue;
      } else {
        throw new Error(errorMessage);
      }
    }

    throw new Error("Failed to generate a unique ID after multiple attempts");

  } catch (error) {
    console.error('Error saving application storage:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function updateApplicationStorage(databaseId: string, data: Partial<BirthdayData>): Promise<StorageResponse> {
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
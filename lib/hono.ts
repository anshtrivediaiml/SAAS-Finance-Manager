import {hc} from 'hono/client';
import {AppType} from '@/app/api/[[...route]]/route';

//Creating a client for the AppType
export const client=hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);

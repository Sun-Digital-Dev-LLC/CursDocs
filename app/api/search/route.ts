// Update the app/api/search/route.ts file to add static export configuration:

import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// Add the export declaration for static export mode
export const dynamic = 'force-static';

export const { GET } = createFromSource(source);
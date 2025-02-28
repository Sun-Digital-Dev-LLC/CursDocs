// If you have a search component in your UI, update it to use the client-side search
// For example, in app/components/search.tsx or similar:

'use client';

import React, { useState } from 'react';
import { SearchClient } from '@/app/search-client';

export function SearchBox() {
  const [query, setQuery] = useState('');

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search documentation..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setQuery('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
      
      <div className="mt-2">
        <SearchClient query={query} />
      </div>
    </div>
  );
}
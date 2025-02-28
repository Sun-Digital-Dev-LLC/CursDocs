// Create a client-side search implementation in app/search-client.tsx
// This will replace the server-based search API

import React, { useEffect, useState } from 'react';
import { source } from '@/lib/source';
import { createProcessor } from 'fumadocs-core/search/client';

const searchProcessor = createProcessor(source.pageTree);

export function SearchClient({ query = '' }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    // Process search on the client side
    const searchResults = searchProcessor(query);
    setResults(searchResults);
  }, [query]);

  return (
    <div>
      {results.length > 0 ? (
        <ul className="space-y-2">
          {results.map((result) => (
            <li key={result.url} className="p-2 border rounded">
              <a href={result.url} className="block">
                <div className="font-medium">{result.title}</div>
                <div className="text-sm text-gray-600">{result.description}</div>
              </a>
            </li>
          ))}
        </ul>
      ) : query.trim() !== '' ? (
        <div className="text-gray-500">No results found for "{query}"</div>
      ) : null}
    </div>
  );
}
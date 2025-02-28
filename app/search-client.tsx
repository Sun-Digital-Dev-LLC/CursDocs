// Fixed client-side search implementation
'use client';

import React, { useEffect, useState } from 'react';
import { source, SearchResult } from '@/lib/source';

interface SearchClientProps {
  query?: string;
}

export function SearchClient({ query = '' }: SearchClientProps) {
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    // Process search on the client side
    try {
      // Use the search method from the source object
      const searchResults = source.search(query);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    }
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
        <div className="text-gray-500">No results found for &quot;{query}&quot;</div>
      ) : null}
    </div>
  );
}
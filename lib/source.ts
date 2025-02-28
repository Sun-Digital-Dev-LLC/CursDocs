import { docs, meta } from '@/.source';
import { createMDXSource } from 'fumadocs-mdx';
import { loader } from 'fumadocs-core/source';

// Define a search result type
export interface SearchResult {
  title: string;
  url: string;
  description: string;
}

// Define a page tree item type
export interface PageTreeItem {
  name?: string;
  url?: string;
  description?: string;
  items?: PageTreeItem[];
  [key: string]: unknown;
}

// Extend the loader type to include our search method
export interface SourceWithSearch {
  pageTree: PageTreeItem[];
  getPage: (slug?: string[]) => unknown;
  generateParams: () => unknown;
  search: (query: string) => SearchResult[];
}

// Create the base source object
const baseSource = loader({
  baseUrl: '/docs',
  source: createMDXSource(docs, meta),
});

// Create and export the enhanced source object with search functionality
export const source: SourceWithSearch = {
  ...baseSource as unknown as SourceWithSearch,
  
  // Add a simple local search implementation
  search: function(query: string): SearchResult[] {
    if (!query || typeof query !== 'string' || query.trim() === '') {
      return [];
    }
    
    const normalizedQuery = query.toLowerCase().trim();
    
    // Search through the page tree
    return searchInPageTree(this.pageTree, normalizedQuery);
  }
};

// Helper function to search through the page tree
function searchInPageTree(items: PageTreeItem[], query: string): SearchResult[] {
  const results: SearchResult[] = [];
  
  if (!items || !Array.isArray(items)) {
    return results;
  }
  
  for (const item of items) {
    // Check if this item matches
    if (item.name && typeof item.name === 'string' && item.name.toLowerCase().includes(query)) {
      if (item.url) {
        results.push({
          title: item.name,
          url: item.url,
          description: item.description || ''
        });
      }
    }
    
    // Check if this item has a description that matches
    if (item.description && typeof item.description === 'string' && 
        item.description.toLowerCase().includes(query)) {
      if (item.url && !results.some(r => r.url === item.url)) {
        results.push({
          title: item.name || '',
          url: item.url,
          description: item.description
        });
      }
    }
    
    // Search in nested items
    if (item.items && Array.isArray(item.items)) {
      const nestedResults = searchInPageTree(item.items, query);
      results.push(...nestedResults);
    }
  }
  
  return results;
}
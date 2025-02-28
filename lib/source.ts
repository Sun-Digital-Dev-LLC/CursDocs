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

// Define the Page type
export interface Page {
  data: {
    body: any; // MDX 內容
    toc: any[]; // 目錄
    full: boolean;
    title: string;
    description: string;
  };
}

// Extend the loader type to include our search method
export interface SourceWithSearch {
  pageTree: PageTreeItem[];
  getPage: (slug?: string[]) => Page | null;
  generateParams: () => Array<{ slug?: string[] }>;
  search: (query: string) => SearchResult[];
}

// Create the base source object
const baseSource = loader({
  baseUrl: '/docs',
  source: createMDXSource(docs, meta),
});

// Create and export the enhanced source object with search functionality
export const source: SourceWithSearch = {
  ...baseSource as any,
  search: function(query: string): SearchResult[] {
    if (!query || typeof query !== 'string' || query.trim() === '') {
      return [];
    }
    
    const normalizedQuery = query.toLowerCase().trim();
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
    if (item.name && typeof item.name === 'string' && item.name.toLowerCase().includes(query)) {
      if (item.url) {
        results.push({
          title: item.name,
          url: item.url,
          description: item.description || ''
        });
      }
    }
    
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
    
    if (item.items && Array.isArray(item.items)) {
      const nestedResults = searchInPageTree(item.items, query);
      results.push(...nestedResults);
    }
  }
  
  return results;
}
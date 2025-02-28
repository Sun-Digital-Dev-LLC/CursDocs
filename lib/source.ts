import { docs, meta } from '@/.source';
import { createMDXSource } from 'fumadocs-mdx';
import { loader, type PageTree } from 'fumadocs-core/source';
// Define a search result type
export interface SearchResult {
  title: string;
  url: string;
  description: string;
}

// Define the Page type
export interface Page {
  data: {
    body: any;
    toc: any[];
    full: boolean;
    title: string;
    description: string;
  };
}

// Define a minimal PageTree type compatible with DocsLayout
export interface PageTree {
  name: string;
  children: Array<{
    name: string;
    url?: string;
    description?: string;
    children?: Array<any>; // 遞迴結構
  }>;
}

// Extend the loader type to include our search method
export interface SourceWithSearch {
  pageTree: PageTree;
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
  pageTree: {
    name: 'Documentation',
    children: (baseSource.pageTree as any).children || baseSource.pageTree || [],
  },
  getPage: baseSource.getPage,
  generateParams: baseSource.generateParams,
  search: function(query: string): SearchResult[] {
    if (!query || typeof query !== 'string' || query.trim() === '') {
      return [];
    }
    
    const normalizedQuery = query.toLowerCase().trim();
    return searchInPageTree(this.pageTree.children, normalizedQuery);
  }
};

// Helper function to search through the page tree
function searchInPageTree(items: any[], query: string): SearchResult[] {
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
    
    const children = item.children || item.items || [];
    if (Array.isArray(children)) {
      const nestedResults = searchInPageTree(children, query);
      results.push(...nestedResults);
    }
  }
  
  return results;
}
import { docs, meta } from '@/.source';
import { createMDXSource } from 'fumadocs-mdx';
import { loader } from 'fumadocs-core/source';

// Define a search result type
export interface SearchResult {
  title: string;
  url: string;
  description: string;
}

// Define the Page type in a way that's compatible with what's returned
export interface Page {
  data: any;
  [key: string]: any;
}

// Extend the loader type to include our search method
export interface SourceWithSearch {
  pageTree: any; // Use 'any' to allow the original structure
  getPage: (slug?: string[]) => any; // Use 'any' for flexibility
  generateParams: () => Array<{ slug?: string[] }>;
  search: (query: string) => SearchResult[];
}

// Create the base source object
const baseSource = loader({
  baseUrl: '/docs',
  source: createMDXSource(docs, meta),
});

// Helper function to extract all possible URL paths from the page tree
function getAllPaths(): Array<{ slug?: string[] }> {
  const paths: Array<{ slug?: string[] }> = [];
  
  // Add the root path
  paths.push({ slug: [] });
  
  function traverse(node: any, currentPath: string[] = []) {
    if (!node) return;
    
    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        if (child.url) {
          // Extract slug from the URL (remove the /docs/ prefix)
          const url = child.url;
          const slugParts = url.startsWith('/docs/') 
            ? url.slice(6).split('/').filter(Boolean) 
            : url.split('/').filter(Boolean);
          
          if (slugParts.length > 0) {
            paths.push({ slug: slugParts });
          }
        }
        
        // Continue traversing if there are children
        if (Array.isArray(child.children) && child.children.length > 0) {
          traverse(child, [...currentPath, child.name]);
        }
      }
    }
  }
  
  traverse(baseSource.pageTree);
  return paths;
}

// Create and export the enhanced source object with search functionality
export const source: SourceWithSearch = {
  pageTree: baseSource.pageTree, // Keep the original structure
  getPage: baseSource.getPage as any, // Use type assertion to bypass type checking
  generateParams: function() {
    // Implement our own version that doesn't rely on this.getPages
    return getAllPaths();
  },
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
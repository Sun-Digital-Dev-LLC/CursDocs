import { docs, meta } from '@/.source';
import { createMDXSource } from 'fumadocs-mdx';
import { loader } from 'fumadocs-core/source';

export const source = loader({
  baseUrl: '/docs',
  source: createMDXSource(docs, meta),
});

// Add a simple local search implementation if the built-in one isn't working
source.search = function(query) {
  if (!query || typeof query !== 'string' || query.trim() === '') {
    return [];
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  
  // Search through the page tree
  return searchInPageTree(this.pageTree, normalizedQuery);
};

// Helper function to search through the page tree
function searchInPageTree(items, query) {
  const results = [];
  
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
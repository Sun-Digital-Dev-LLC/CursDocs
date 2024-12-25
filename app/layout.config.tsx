import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: 'CursHosting Docs',
  },
  links: [
    {
      text: '教學文檔',
      url: '/docs',
      active: 'nested-url',
    },
  ],
};

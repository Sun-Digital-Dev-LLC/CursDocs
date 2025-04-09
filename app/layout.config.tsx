import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <Image
        src="https://cdn.curshosting.net/Curs_docs_banner.svg"
        alt="CursHosting Banner"
        width={170} 
        height={40} 
        priority
      />
    ),
  },
  links: [
    {
      text: "教學文檔",
      url: "/docs",
      active: "nested-url",
    },
  ],
};

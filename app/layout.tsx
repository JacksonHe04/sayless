import type { Metadata } from 'next'
import { Providers } from '@/components/providers'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'SAYLESS AI RESUME',
  description: 'AI 简历助手',
}

/**
 * 根布局组件
 * @param children - 子组件
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          src="https://cdn.tailwindcss.com"
          async
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                if (window.tailwind) {
                  tailwind.config = {
                    theme: {
                      extend: {
                        fontFamily: {
                          serif: [
                            "Times New Roman",
                            "SimSun",
                            "宋体",
                            "serif"
                          ],
                        },
                      },
                    },
                  };
                }
              });
            `,
          }}
        />
      </head>
      <body className="font-sans leading-6 text-black mx-auto p-4 m-0 bg-gray-100 rounded-2xl border border-gray-400 print:bg-white print:rounded-none print:border-0 print:p-0">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

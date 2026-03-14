import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '智税通 · AI财税智能工作流平台',
  description: '基于Gemini大模型驱动的新一代财税管理平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
      </body>
    </html>
  )
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Dashboard from './Dashboard';
import './admin.css';

export const metadata: Metadata = {
  title: 'FORM SALES CONSOLE — ローカル管理画面',
  robots: { index: false, follow: false },
};

export default function FormSalesAdminPage() {
  // ローカル開発時（next dev）専用。本番ビルドでは404。
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }
  return <Dashboard />;
}

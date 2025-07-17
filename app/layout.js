import { Poppins } from 'next/font/google'; // 1. Impor font Poppins
import './globals.css';

// 2. Konfigurasi font yang akan digunakan
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'], // Impor bobot reguler dan bold
});

export const metadata = {
  title: 'Suitmedia Ideas',
  description: 'Ideas page test for Suitmedia',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 3. Terapkan class dari font ke tag <body> */}
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
import './globals.css';

export const metadata = {
  title: 'CodeVault AI',
  description: 'Evaluate code with multiple AI models',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black min-h-screen">{children}</body>
    </html>
  );
}

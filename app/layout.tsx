export const metadata = {
  title: 'CodeVault AI',
  description: 'Evaluate code with multiple AI models',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#0a0a0a', color: '#fff' }}>
        {children}
      </body>
    </html>
  );
}

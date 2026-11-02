import './style.css';
export const metadata = { title: 'Chess Arena România', description: 'Prototype chess tournament platform' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="ro"><body>{children}</body></html> }

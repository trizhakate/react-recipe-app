// app/layout.tsx or _app.tsx

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// Create a client
const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </QueryClientProvider>
    );
}
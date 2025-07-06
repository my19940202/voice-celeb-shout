import { Suspense } from 'react'
import Header from "@/components/Header";
import Game from "@/components/Game";
import List from "@/components/List";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import { getSEOTags } from '@/libs/seo'
import config from "@/config";

export const metadata = getSEOTags({
    title: 'Guess the word online',
    description: config.appDescription,
    canonicalUrlRelative: "/"
});

export default function Home() {
    return (
        <>
            <Suspense>
                <Header />
            </Suspense>
            <main>
                <Game type="ngr" />
                <List />
                <Seo />
            </main>
            <Footer />
        </>
    );
}
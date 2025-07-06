import config from "@/config";
import { getSEOTags } from "@/libs/seo";
import Game from '@/components/Game'

export const metadata = getSEOTags({
    title: `${config.appName} Detail`,
    description: "XXXX",
    canonicalUrlRelative: "/detail",
});

export function generateStaticParams() {
    return [
        { type: 'dy' },
        { type: 'gay' },
        { type: 'ngr' },
        { type: 'bitch' }
    ];
}

interface Params {
    params: { type: string }
}

export default function Detail({ params }: Params) {
    return (
        <Game type={params.type} />
    );
}

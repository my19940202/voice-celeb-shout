import config from "@/config";
import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
    title: `${config.appName} Blog | Stripe Chargeback Protection`,
    description:
        "Learn how to prevent chargebacks, how to accept payments online, and keep your Stripe account in good standing",
    canonicalUrlRelative: "/blog",
});

export default async function Blog({ params }: any) {
    console.log(params, 'params')
    return (
        <>
            <h1>fuck</h1>
        </>
    );
}

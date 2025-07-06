import { categories, articles } from "./_assets/content";
import CardArticle from "./_assets/components/CardArticle";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";

export const metadata = getSEOTags({
    title: `${config.appName} Blog | Stripe Chargeback Protection`,
    description:
        "Learn how to prevent chargebacks, how to accept payments online, and keep your Stripe account in good standing",
    canonicalUrlRelative: "/blog",
});

export default async function Blog() {
    const articlesToDisplay = articles
        .sort(
            (a, b) =>
                new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf()
        )
        .slice(0, 6);
    return (
        <>
            <section className="text-center max-w-xl mx-auto mt-12 mb-24 md:mb-32">
                <h1 className="font-extrabold text-3xl lg:text-5xl tracking-tight mb-6">
                    The {config.appName} Blog
                </h1>
                <p className="text-lg opacity-80 leading-relaxed">
                    Learn how to ship your startup in days, not weeks. And get the latest
                    updates about the boilerplate
                </p>
            </section>

            <section className="grid lg:grid-cols-2 mb-24 md:mb-32 gap-8">
                {articlesToDisplay.map((article, i) => (
                    <CardArticle
                        article={article}
                        key={article.slug}
                        isImagePriority={i <= 2}
                    />
                ))}
            </section>
        </>
    );
}

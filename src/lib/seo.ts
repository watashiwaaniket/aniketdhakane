import type { Metadata } from "next";

const SITE = "https://www.aniketdhakane.xyz";

type SocialArgs = {
  title: string;
  description: string;
  path: string;
  image: string;
  alt?: string;
};

/** Per-route share card. `image` is a path under public/og without the extension. */
export function socialMeta({
  title,
  description,
  path,
  image,
  alt,
}: SocialArgs): Metadata {
  const imageUrl = `/og/${image}.png`;
  const pageUrl = path === "/" ? SITE : `${SITE}${path}`;
  const imageAlt = alt ?? title;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

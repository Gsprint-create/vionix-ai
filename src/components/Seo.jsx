import { Helmet } from "react-helmet-async";

export default function Seo({
  title,
  description,
  url,
  image,
  siteName = "Vionix AI",
}) {
  const fullTitle = title ? `${title} • ${siteName}` : siteName;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description ? <meta name="description" content={description} /> : null}

      {/* Open Graph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      {description ? <meta property="og:description" content={description} /> : null}
      {url ? <meta property="og:url" content={url} /> : null}
      <meta property="og:type" content="website" />
      {image ? <meta property="og:image" content={image} /> : null}

      {/* Twitter */}
      <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={fullTitle} />
      {description ? <meta name="twitter:description" content={description} /> : null}
      {image ? <meta name="twitter:image" content={image} /> : null}
    </Helmet>
  );
}

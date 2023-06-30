import Head from "next/head";

interface SeoProps {
  pageTitle: string;
  contentTitle: string;
  description: string;
  tags?: Array<string> | [""];
  imageUrl?: string | "";
  contentType?: string | "";
  pageUrl: string | "";
  language?: string | "en";
}

export default function SEO({
  pageTitle,
  contentTitle,
  description,
  tags,
  imageUrl,
  contentType,
  pageUrl,
  language,
}: SeoProps) {
  const allTags = tags?.join(",");

  const siteData = {
    twitterUserName: "",
    companyLogo: "/icons/logo.png",
    fbId: "",
    siteName: "Linkedin Email Finder AP",
    siteUrl: "",
  };
  const url = `${siteData.siteUrl}${pageUrl}`;

  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
      />
      <meta httpEquiv="Content-Type" content="text/html; charset=ISO-8859-1" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="robots" content="noodp" />

      {/* Web SEO */}
      <title>{`${pageTitle} | ${siteData.siteName}`}</title>
      <meta name="keywords" content={allTags} />
      <meta name="description" content={description} />

      {/* FB SEO */}
      <meta property="og:type" content={contentType || "article"} />
      <meta property="og:site_name" content={siteData.siteName} />
      <meta property="og:title" content={contentTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="fb:app_id" content={siteData.fbId} />
      <meta property="og:locale" content={language} />

      {/* Twitter SEO */}
      <meta name="twitter:site" content={siteData.twitterUserName} />
      <meta name="twitter:title" content={contentTitle} />
      <meta property="twitter:description" content={description} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content={siteData.twitterUserName} />
      <meta name="twitter:domain" content={siteData.siteUrl} />
      <meta property="twitter:card" content="summary" />

      {/* Company Logo */}
      <link rel="icon" href={siteData.companyLogo} />
    </Head>
  );
}

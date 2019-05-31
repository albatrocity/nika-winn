import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

function SEO({
  description,
  lang,
  meta,
  keywords,
  title,
  image,
  imageWidth,
  imageHeight
}) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description;
        return (
          <Helmet
            htmlAttributes={{
              lang
            }}
            title={
              title
                ? `${title} | ${data.site.siteMetadata.title}`
                : data.site.siteMetadata.title
            }
            meta={[
              {
                name: "description",
                content: metaDescription
              },
              {
                property: "og:title",
                content: title || data.site.siteMetadata.title
              },
              {
                property: "og:description",
                content: metaDescription
              },
              {
                property: "og:image",
                content: image
              },
              {
                property: "og:image:width",
                content: imageWidth
              },
              {
                property: "og:image:height",
                content: imageHeight
              },
              {
                property: "og:type",
                content: "website"
              },
              {
                name: "twitter:card",
                content: "summary"
              },
              {
                name: "twitter:title",
                content: title
              },
              {
                name: "twitter:description",
                content: metaDescription
              }
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: "keywords",
                      content: keywords.join(", ")
                    }
                  : []
              )
              .concat(meta)}
          />
        );
      }}
    />
  );
}

SEO.defaultProps = {
  lang: "en",
  meta: [],
  keywords: []
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  image: PropTypes.string,
  imageWidth: PropTypes.string,
  imageHeight: PropTypes.string
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;

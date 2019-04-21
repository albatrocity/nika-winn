import { graphql, useStaticQuery } from "gatsby";

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            description
            instagram
          }
        }
      }
    `
  );
  return site.siteMetadata;
};

export default useSiteMetadata;

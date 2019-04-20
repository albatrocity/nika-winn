import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import ContactForm from "../components/ContactForm";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import Container from "../components/PageContainer";
import SocialLink from "../components/SocialLink";
import { Box } from "grommet";

import useSiteMetadata from "../components/SiteMetadata";

export const AboutPageTemplate = ({
  title,
  content,
  contentComponent,
  image,
  twitter,
  instagram,
  etsy
}) => {
  const PageContent = contentComponent || Content;
  const siteMeta = useSiteMetadata();

  return (
    <Container>
      <Box direction="row-responsive" gap="medium">
        <Box basis="large">
          <PreviewCompatibleImage imageInfo={{ image, alt: siteMeta.title }} />
          <PageContent className="content" content={content} />
        </Box>
        <Box basis="medium">
          <Box direction="column" gap="xsmall">
            {instagram && <SocialLink service="instagram" handle={instagram} />}
            {twitter && <SocialLink service="twitter" handle={twitter} />}
            {etsy && <SocialLink service="etsy" handle={etsy} />}
          </Box>
          <ContactForm />
        </Box>
      </Box>
    </Container>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func
};

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        image={post.frontmatter.image}
        instagram={post.frontmatter.instagram_username}
        twitter={post.frontmatter.twitter_username}
        etsy={post.frontmatter.etsy_username}
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        instagram_username
        twitter_username
        etsy_username
        image {
          childImageSharp {
            fluid(maxWidth: 800, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

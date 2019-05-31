import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { graphql } from "gatsby";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import ContactForm from "../components/ContactForm";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import Container from "../components/PageContainer";
import SocialLink from "../components/SocialLink";
import { Box } from "grommet";

import useSiteMetadata from "../components/SiteMetadata";

const PhotoBox = styled(Box)``;

export const AboutPageTemplate = ({
  title,
  content,
  contentComponent,
  image,
  twitter,
  instagram,
  email
}) => {
  const PageContent = contentComponent || Content;
  const siteMeta = useSiteMetadata();

  return (
    <Container>
      <SEO
        title={"About"}
        description={content}
        image={image.childImageSharp.fluid.src}
      />
      <Box direction="row-responsive" gap="large">
        <PhotoBox flex="grow" basis="60%">
          <PreviewCompatibleImage imageInfo={{ image, alt: siteMeta.title }} />
        </PhotoBox>
        <Box flex="shrink" style={{ minWidth: "200px" }}>
          <Box direction="column" gap="xsmall">
            <PageContent className="content" content={content} />
            {email && <SocialLink service="email" handle={email} />}
            {instagram && <SocialLink service="instagram" handle={instagram} />}
            {twitter && <SocialLink service="twitter" handle={twitter} />}
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
        email={post.frontmatter.email}
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
        email
        image {
          childImageSharp {
            fluid(maxWidth: 400, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

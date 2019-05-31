import React from "react";
import PropTypes from "prop-types";
import { Box } from "grommet";
import { Link, graphql } from "gatsby";
import { head, get } from "lodash/fp";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Container from "../components/PageContainer";
import Content from "../components/Content";
import WorkCollection from "../components/WorkCollection";

export const IndexPageTemplate = ({ body }) => (
  <Box>
    <Container>
      {body && (
        <Box pad={{ vertical: "medium" }}>
          <Content content={body} />
        </Box>
      )}
    </Container>
    <WorkCollection />
  </Box>
);

IndexPageTemplate.propTypes = {
  body: PropTypes.string
};

const IndexPage = ({ data }) => {
  const {
    page: { frontmatter },
    images
  } = data;

  const img = get(
    "node.frontmatter.image.childImageSharp.fixed",
    head(images.edges)
  );

  return (
    <Layout>
      <SEO
        image={get("src", img)}
        imageWidth={get("width", img)}
        imageHeight={get("height", img)}
      />
      <IndexPageTemplate body={frontmatter.body} />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    page: markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        body
      }
    }

    images: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1
      filter: {
        frontmatter: {
          templateKey: { eq: "work-post" }
          display_size: { eq: "small" }
        }
      }
    ) {
      edges {
        node {
          id
          frontmatter {
            image {
              childImageSharp {
                fixed(width: 600, quality: 80) {
                  ...GatsbyImageSharpFixed_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`;

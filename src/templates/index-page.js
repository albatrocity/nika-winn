import React from "react";
import PropTypes from "prop-types";
import { Box } from "grommet";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
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
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
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
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        body
      }
    }
  }
`;

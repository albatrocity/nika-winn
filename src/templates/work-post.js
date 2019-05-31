import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { Box, Heading, Text } from "grommet";
import styled from "styled-components";
import Content, { HTMLContent } from "../components/Content";
import Container from "../components/PageContainer";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

const Caption = styled(Text)`
  font-style: italic;
`;

export const WorkPostTemplate = ({
  content,
  contentComponent,
  description,
  date,
  caption,
  image,
  title
}) => {
  const PostContent = contentComponent || Content;
  return (
    <section>
      <SEO
        title={title}
        description={description}
        image={image.childImageSharp.fixed.src}
        imageWidth={image.childImageSharp.fixed.width}
        imageHeight={image.childImageSharp.fixed.height}
      />
      <Container>
        <Heading
          alignSelf="center"
          textAlign="center"
          margin={"small"}
          level={2}
        >
          {title}
        </Heading>
        <Heading alignSelf="center" level={4} margin={{ top: "none" }}>
          {date}
        </Heading>
        {image && (
          <PreviewCompatibleImage
            imageInfo={{ image, alt: description || title }}
          />
        )}
        {caption && (
          <Box pad="medium">
            <Caption textAlign="center">{caption}</Caption>
          </Box>
        )}
        {description && (
          <Box pad="small">
            <PostContent content={description} />
          </Box>
        )}
      </Container>
    </section>
  );
};

WorkPostTemplate.propTypes = {
  content: PropTypes.node,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string
};

const WorkPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <WorkPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        caption={post.frontmatter.caption}
        image={post.frontmatter.image}
        date={post.frontmatter.date}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

WorkPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default WorkPost;

export const pageQuery = graphql`
  query WorkPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "YYYY")
        title
        description
        caption
        image {
          childImageSharp {
            fluid(maxWidth: 800, quality: 80) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 600, quality: 90) {
              src
              width
              height
            }
          }
        }
      }
    }
  }
`;

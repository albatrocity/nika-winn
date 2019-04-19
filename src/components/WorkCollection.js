import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import { Box, Heading } from "grommet";

import PreviewCompatibleImage from "./PreviewCompatibleImage";

class WorkCollection extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <Box>
        {posts &&
          posts.map(({ node: post }) => (
            <Box key={post.id}>
              <Link to={post.fields.slug}>
                <Heading level={2}>{post.frontmatter.title}</Heading>
                {/* <PreviewCompatibleImage /> */}
              </Link>
            </Box>
          ))}
      </Box>
    );
  }
}

WorkCollection.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query WorkCollectionQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "work-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <WorkCollection data={data} count={count} />}
  />
);

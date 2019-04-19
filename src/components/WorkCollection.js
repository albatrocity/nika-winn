import React from "react";
import PropTypes from "prop-types";
import chunkArray from "../lib/chunkArray";
import { Link, graphql, StaticQuery } from "gatsby";
import { Box, Grid } from "grommet";

import CollectionGroupWork from "./CollectionGroupWork";

class WorkCollection extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <Box direction="row-responsive" className="wrap" gap="small">
        {posts &&
          chunkArray(posts, 3, true).map(group => (
            <CollectionGroupWork group={group} />
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
                description
                caption
                display_size
                image {
                  childImageSharp {
                    fluid(maxWidth: 800, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <WorkCollection data={data} count={count} />}
  />
);

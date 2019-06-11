import React from "react";
import PropTypes from "prop-types";
import chunkArray from "../lib/chunkArray";
import { Link, graphql, StaticQuery } from "gatsby";
import { Box, Grid } from "grommet";
import { filter, get, isEqual } from "lodash/fp";

import CollectionGroupWork from "./CollectionGroupWork";
import CollectionItemWork from "./CollectionItemWork";
import WorkColumns from "./WorkColumns";

class WorkCollection extends React.Component {
  render() {
    const {
      data: { small, large }
    } = this.props;
    console.log(small.edges);
    return (
      <>
        <WorkColumns data={small.edges} />
        <Box pad={{ vertical: "small" }} direction="row" gap="small">
          {large.edges.length &&
            large.edges.map(x => (
              <Box flex="grow" direction="column" key={get("node.id", x)}>
                <CollectionItemWork flex="grow" post={get("node", x)} />
              </Box>
            ))}
        </Box>
      </>
    );
  }
}

WorkCollection.propTypes = {
  data: PropTypes.shape({
    small: PropTypes.shape({
      edges: PropTypes.array
    }),
    large: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query WorkCollectionQuery {
        small: allMarkdownRemark(
          filter: {
            frontmatter: {
              templateKey: { eq: "work-post" }
              display_size: { eq: "small" }
            }
          }
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
                display_size
                grid_area
                caption
                image {
                  childImageSharp {
                    fluid(maxWidth: 600, quality: 75) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }

        large: allMarkdownRemark(
          sort: { order: ASC, fields: [frontmatter___display_order] }
          filter: {
            frontmatter: {
              templateKey: { eq: "work-post" }
              display_size: { eq: "large" }
            }
          }
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
                display_size
                caption
                image {
                  childImageSharp {
                    fluid(maxWidth: 800, quality: 70) {
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

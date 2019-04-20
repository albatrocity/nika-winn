import React from "react";
import PropTypes from "prop-types";
import chunkArray from "../lib/chunkArray";
import { Link, graphql, StaticQuery } from "gatsby";
import { Box, Grid } from "grommet";
import { filter, get, isEqual } from "lodash/fp";

import CollectionGroupWork from "./CollectionGroupWork";
import CollectionItemWork from "./CollectionItemWork";

class WorkCollection extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const bigPosts = filter(
      x => isEqual("large", get("node.frontmatter.display_size", x)),
      posts
    );
    const otherPosts = filter(
      x => !isEqual("large", get("node.frontmatter.display_size", x)),
      posts
    );

    return (
      <>
        <Box direction="row-responsive" className="wrap" gap="small">
          {otherPosts &&
            chunkArray(otherPosts, 3, true).map((group, i) => (
              <CollectionGroupWork group={group} key={`group-${i}`} />
            ))}
        </Box>
        <Box direction="row">
          {bigPosts &&
            bigPosts.map(x => (
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
                display_size
                caption
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

import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import { Link } from "gatsby";
import { Box } from "grommet";

const CollectionItemWork = ({ post }) => {
  const {
    frontmatter: { title, description, image }
  } = post;
  return (
    <Box basis="small" direction="column" flex="grow">
      <Link to={post.fields.slug}>
        {image && (
          <Img
            fluid={image.childImageSharp.fluid}
            alt={description || title}
            title={title}
          />
        )}
      </Link>
    </Box>
  );
};

export default CollectionItemWork;

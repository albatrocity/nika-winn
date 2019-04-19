import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import { Link } from "gatsby";
import { Box, Heading } from "grommet";

const CollectionItemWork = ({ post }) => {
  const {
    frontmatter: { title, description, image }
  } = post;
  return (
    <Box key={post.id} direction="column">
      <Link to={post.fields.slug}>
        <Heading level={2}>{title}</Heading>
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

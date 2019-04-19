import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import { Link } from "gatsby";
import { Box } from "grommet";

const CollectionItemWork = ({ post }) => {
  const {
    frontmatter: { title, description, image, display_size = "small" }
  } = post;
  return (
    <Box className="collection-item">
      <Link to={post.fields.slug} style={{ display: "block" }}>
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

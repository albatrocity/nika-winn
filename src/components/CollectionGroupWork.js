import React from "react";
import CollectionItemWork from "./CollectionItemWork";
import { Box } from "grommet";

const CollectionGroupWork = ({ group }) => (
  <Box direciton="column" flex="grow" className="collection-group">
    {group.map(({ node: post }) => (
      <CollectionItemWork post={post} key={post.id} />
    ))}
  </Box>
);

export default CollectionGroupWork;

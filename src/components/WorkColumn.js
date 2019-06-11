import React from "react";
import { Box } from "grommet";
import CollectionItemWork from "./CollectionItemWork";

const WorkColumn = ({ data }) => {
  console.log("data from WorkColumn", data);
  return (
    <Box direciton="column" flex="grow" className="collection-col" gap="small">
      {data.map(x => (
        <CollectionItemWork post={x} key={x.id} />
      ))}
    </Box>
  );
};

export default WorkColumn;

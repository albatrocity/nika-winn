import React from "react";
import { Box } from "grommet";
import CollectionItemWork from "./CollectionItemWork";
import { get, reverse, sortBy, split } from "lodash/fp";
import { parse } from "date-fns";

const WorkColumn = ({ data }) => {
  const sorted = data.sort((a, b) => {
    const orderA = split("_", get("frontmatter.grid_area", a))[0];
    const orderB = split("_", get("frontmatter.grid_area", b))[0];
    const dateA = parse(get("frontmatter.date", a), "MMMM d, yyyy", new Date());
    const dateB = parse(get("frontmatter.date", b), "MMMM d, yyyy", new Date());
    const beforeOrder = orderA > orderB ? 1 : -1;
    const beforeDate = dateA < dateB ? 1 : -1;
    return beforeOrder + beforeDate;
  });
  return (
    <Box direciton="column" flex="grow" className="collection-col" gap="small">
      {sorted.map(x => (
        <CollectionItemWork post={x} key={x.id} />
      ))}
    </Box>
  );
};

export default WorkColumn;

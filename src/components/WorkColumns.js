import React from "react";
import { Box } from "grommet";
import CollectionItemWork from "./CollectionItemWork";
import WorkColumn from "./WorkColumn";

import { get, map } from "lodash/fp";
import getWorkForColumn from "../lib/getWorkForColumn";

const columns = ["1", "2", "3"];

const WorkColumns = ({ data }) => (
  <Box direction="row" gap="small">
    {columns.map(x => (
      <WorkColumn
        key={`col_${x}`}
        data={map(y => get("node", y), getWorkForColumn(x, data))}
      />
    ))}
  </Box>
);

export default WorkColumns;

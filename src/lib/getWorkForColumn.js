import { get, filter, split, head, isEqual, sortBy, last } from "lodash/fp";

export default function getWorkForColumn(column, edges) {
  return sortBy(
    x => head(split("_", get("node.frontmatter.grid_area", x))),
    filter(
      x =>
        isEqual(last(split("_", get("node.frontmatter.grid_area", x))), column),
      edges
    )
  );
}

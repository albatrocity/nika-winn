import React from "react";
import PropTypes from "prop-types";
import { WorkPostTemplate } from "../../templates/work-post";

const WorkPostPreview = ({ entry, widgetFor, getAsset }) => {
  const image = entry.getIn(["data", "image"]);
  const bg = getAsset(image);
  return (
    <WorkPostTemplate
      caption={entry.getIn(["data", "caption"])}
      description={widgetFor("description")}
      title={entry.getIn(["data", "title"])}
      image={bg && bg.toString()}
    />
  );
};

WorkPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default WorkPostPreview;

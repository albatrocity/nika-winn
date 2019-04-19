import CMS from "netlify-cms";

import AboutPagePreview from "./preview-templates/AboutPagePreview";
import WorkPostPreview from "./preview-templates/WorkPostPreview";
import IndexPagePreview from "./preview-templates/IndexPagePreview";

CMS.registerPreviewTemplate("index", IndexPagePreview);
CMS.registerPreviewTemplate("about", AboutPagePreview);
CMS.registerPreviewTemplate("work", WorkPostPreview);

import React from "react";
import { Box, Anchor } from "grommet";
import { Instagram, Twitter } from "grommet-icons";
import EtsyIcon from "./EtsyIcon";
import { startCase } from "lodash/fp";

const SocialLink = ({ service, handle }) => (
  <Anchor
    href={
      service === "etsy"
        ? `https://${service}.com/shop/${handle}`
        : `https://${service}.com/${handle}/`
    }
  >
    <Box direction="row" align="center" gap="small">
      <Box>
        {service === "instagram" && <Instagram size="medium" />}
        {service === "twitter" && <Twitter size="medium" />}
        {service === "etsy" && <EtsyIcon size="medium" />}
      </Box>
      <Box>{startCase(service)}</Box>
    </Box>
  </Anchor>
);

export default SocialLink;

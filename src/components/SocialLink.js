import React from "react";
import { Box, Anchor } from "grommet";
import { Instagram, Twitter, MailOption } from "grommet-icons";
import EtsyIcon from "./EtsyIcon";
import { startCase } from "lodash/fp";

const SocialLink = ({ service, handle }) => {
  let href = `https://${service}.com/${handle}/`;
  switch (service) {
    case "email":
      href = `mailto:${handle}`;
      break;
    case "etsy":
      href = `https://${service}.com/shop/${handle}`;
      break;
    default:
      href = `https://${service}.com/${handle}/`;
  }
  return (
    <Anchor href={href}>
      <Box direction="row" align="center" gap="small">
        <Box pad={{ vertical: "xsmall" }}>
          {service === "instagram" && <Instagram size="medium" />}
          {service === "twitter" && <Twitter size="medium" />}
          {service === "etsy" && <EtsyIcon size="medium" />}
          {service === "email" && <MailOption size="medium" />}
        </Box>
        <Box>{startCase(service)}</Box>
      </Box>
    </Anchor>
  );
};

export default SocialLink;

import React from "react";
import { Link } from "gatsby";
import { Box, Text } from "grommet";

const Footer = class extends React.Component {
  render() {
    return (
      <Box tag="footer" pad="medium">
        <Text size="small" textAlign="center">
          &copy; {new Date().getFullYear()} Nika Winn
        </Text>
      </Box>
    );
  }
};

export default Footer;

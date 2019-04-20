import React from "react";
import { Link } from "gatsby";
import { Box, Heading, Text, Anchor } from "grommet";
import Container from "./PageContainer";
import styled from "styled-components";

const HeaderLink = styled(Link)`
  text-decoration: none;
`;

const Header = () => (
  <Container direction="row">
    <Box
      direction="row"
      justify="between"
      align="center"
      gap="small"
      flex="grow"
    >
      <Box direction="column">
        <HeaderLink to={"/"}>
          <Heading>Nika Winn</Heading>
        </HeaderLink>
      </Box>
      <Box direction="row" gap="small" justify="end">
        <HeaderLink to={"/about"}>
          <Anchor>About</Anchor>
        </HeaderLink>
      </Box>
    </Box>
  </Container>
);

export default Header;

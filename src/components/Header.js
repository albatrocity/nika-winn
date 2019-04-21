import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import { Box, Heading, Text, Anchor } from "grommet";
import { Instagram, Twitter } from "grommet-icons";
import Img from "gatsby-image";
import Container from "./PageContainer";
import styled from "styled-components";
import useSiteMetadata from "./SiteMetadata";

const HeaderLink = styled(Link)`
  text-decoration: none;
`;

const HeaderTemplate = ({ data: { file } }) => {
  const { title, instagram } = useSiteMetadata();
  return (
    <Container direction="row">
      <Box
        direction="row"
        justify="between"
        align="center"
        gap="small"
        flex="grow"
      >
        <Box direction="column" flex="grow" justify="center">
          <HeaderLink to={"/"}>
            <Img fluid={file.childImageSharp.fluid} alt={title} />
          </HeaderLink>
        </Box>
        <Box direction="row" gap="small" justify="end">
          <HeaderLink to={"/about"}>
            <Anchor>About</Anchor>
          </HeaderLink>
          <Anchor href={`https://instagram.com/${instagram}/`} target="_blank">
            <Instagram />
          </Anchor>
        </Box>
      </Box>
    </Container>
  );
};

const Header = () => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { eq: "nika_winn_name.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 1000, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => <HeaderTemplate data={data} />}
  />
);

export default Header;

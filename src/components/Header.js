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
  color: ${p => p.theme.global.colors[p.theme.anchor.color.light]};
  font-weight: ${p => p.theme.anchor.fontWeight};
  &:visited {
    color: ${p => p.theme.global.colors[p.theme.anchor.color.light]};
  }
  &:hover {
    text-decoration: ${p => p.theme.anchor.hover.textDecoration};
  }
`;

const HeaderTemplate = ({
  data: {
    markdownRemark: {
      frontmatter: { header }
    }
  }
}) => {
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
            <Img
              fluid={header.childImageSharp.fluid}
              alt={title}
              loading="eager"
              fadeIn={false}
            />
          </HeaderLink>
        </Box>
        <Box direction="row" gap="small" justify="end">
          <HeaderLink to={"/about"}>About</HeaderLink>
          <Anchor href={`https://nikawinn.storenvy.com/`} target="_blank">
            Shop
          </Anchor>
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
      query IndexPageHeader {
        markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
          frontmatter {
            header {
              childImageSharp {
                fluid(maxWidth: 800, quality: 80) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    `}
    render={data => <HeaderTemplate data={data} />}
  />
);

export default Header;

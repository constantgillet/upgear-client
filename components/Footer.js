import {
  faFacebook,
  faFacebookF,
  faInstagram,
  faLinkedin,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";
import { MainStyle } from "../styles/style";
import Container from "./Container";
import { Row, Col } from "antd";
import Image from "next/image";
import Link from "next/link";
import { faEnvelope, faMapMarker, faMapMarkerAlt } from "@fortawesome/fontawesome-free-solid";

const FooterElement = styled.footer`
  color: ${MainStyle.color.light};
  background-color: #10233a;

  ${({ display }) =>
    !display &&
    css`
      display: none;
    `}
`;

const SocialBanner = styled.div`
  background-color: ${MainStyle.color.primary};
`;

const SocialBannerRow = styled(Row)`
  display: flex;
  align-items: center;
  padding: ${MainStyle.space.l}px 0px;
`;

const SocialBannerTextCol = styled(Col)`
  text-align: center;
  margin-bottom: ${MainStyle.space.l}px;

  @media (min-width: ${MainStyle.breakpoint.md}px) {
    text-align: left;
    margin-bottom: 0px;
  }

  h6 {
    color: white;
    margin-bottom: 0px;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.2;
  }
`;

const SocialNetworksListCol = styled(Col)`
  text-align: center;

  @media (min-width: ${MainStyle.breakpoint.md}px) {
    text-align: right;
  }

  svg {
    color: white;
    margin-right: ${MainStyle.space.l}px;
  }

  .ins-ic svg {
    margin-right: 0px;
  }
`;

const MainPartContainer = styled(Container)`
  margin-top: ${MainStyle.space.xl}px;
  text-align: center;

  @media (min-width: ${MainStyle.breakpoint.md}px) {
    text-align: left;
  }
`;

const LogotypeContainer = styled.div`
  margin-bottom: 8px;
  display: block;
`;

const LinksCol = styled(Col)`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${MainStyle.space.l}px;
`;

const SeparatorHr = styled.hr`
  display: inline-block;
  margin-top: 0px;
  margin-left: auto;
  margin-left: right;
  margin-bottom: ${MainStyle.space.l}px;
  background-color: ${MainStyle.color.primary};
  box-sizing: content-box;
  height: 0;
  overflow: visible;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  width: 60px;
`;

const WebsiteInfosP = styled.p`
  font-size: ${MainStyle.text.body.fontSize};
  margin-bottom: ${MainStyle.space.l}px;
`;

const LinksList = styled.ul`
  list-style: none;
  padding-left: 0px;

  svg {
    margin-right: ${MainStyle.space.m}px;
  }

  a {
    font-size: ${MainStyle.text.body.fontSize};
    margin-bottom: ${MainStyle.space.m}px;
    color: white;
    display: block;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      color: white;
    }
  }
`;

const FooterSubtitle = styled.h6`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: ${MainStyle.space.s}px;
  color: white;
`;

const FooterCopyright = styled.div`
  font-size: ${MainStyle.text.body.fontSize};
  text-align: center;
  color: rgba(248, 249, 250, 0.6);
  background: rgba(0, 0, 0, 0.2);
  padding-top: ${MainStyle.space.m}px;
  padding-bottom: ${MainStyle.space.m}px;

  a {
    color: ${MainStyle.color.light};
    text-decoration: none;
  }
`;

export default function Footer({ display }) {
  return (
    <FooterElement display={display ? 1 : 0}>
      <SocialBanner>
        <Container>
          <SocialBannerRow gutter={MainStyle.gutter}>
            <SocialBannerTextCol span={24} md={12} lg={10}>
              <h6>Suivez nous sur les réseaux sociaux!</h6>
            </SocialBannerTextCol>
            <SocialNetworksListCol span={24} md={12} lg={14}>
              <a
                className="fb-ic"
                href="https://www.facebook.com/upgearairsoft/"
                rel="nofollow"
                target="_blank"
              >
                {" "}
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a className="tw-ic" href="https://twitter.com/UpGear1" rel="nofollow" target="_blank">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                className="li-ic"
                href="https://www.linkedin.com/company/upgear-airsoft/"
                rel="nofollow"
                target="_blank"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a className="ins-ic">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </SocialNetworksListCol>
          </SocialBannerRow>
        </Container>
      </SocialBanner>
      <MainPartContainer>
        <Row gutter={MainStyle.gutter}>
          <LinksCol span={24} md={6} lg={8} xl={6}>
            <LogotypeContainer>
              <Image src={"/images/logo-white.png"} width={94} height={18} alt="Upgear logotype" />
            </LogotypeContainer>
            <SeparatorHr />
            <WebsiteInfosP>
              UpGear est une plateforme de matériel d'airsoft d'occasion. Achetez & vendez votre équipement au
              meilleur prix !
            </WebsiteInfosP>
          </LinksCol>
          <LinksCol span={24} md={4} lg={4} xl={4}>
            <FooterSubtitle>Catégories</FooterSubtitle>
            <SeparatorHr />
            <LinksList>
              <li>
                <Link href="/offres/repliques_aeg">
                  <a title="Répliques longues AEG">Répliques longues AEG </a>
                </Link>
              </li>

              <li>
                <Link href="/offres/repliques_gbbr">
                  <a title="Répliques longues GBBR">Répliques longues GBBR </a>
                </Link>
              </li>

              <li>
                <Link href="/offres/repliques_gbb">
                  <a title="Répliques de poing GBB">Répliques de poing GBB</a>
                </Link>
              </li>
              <li>
                <Link href="/offres/repliques_sniper_spring">
                  <a title="Répliques sniper spring">Répliques sniper spring </a>
                </Link>
              </li>
            </LinksList>
          </LinksCol>
          <LinksCol span={24} md={6} lg={4} xl={4}>
            <FooterSubtitle>Liens utiles</FooterSubtitle>
            <SeparatorHr />
            <LinksList>
              <li>
                <Link href="/compte/mon-profil">
                  <a> Mon compte</a>
                </Link>
              </li>

              <li>
                <a href="mailto:contact@upgear.fr"> Nous contacter </a>
              </li>

              <li>
                <Link href="/CGU">
                  <a> CGU </a>
                </Link>
              </li>
              <li>
                <a href="mailto:contact@upgear.fr"> Aide </a>
              </li>
            </LinksList>
          </LinksCol>
          <LinksCol span={24} md={8} lg={6} xl={6}>
            <FooterSubtitle>Contact</FooterSubtitle>
            <SeparatorHr />
            <LinksList>
              <li>
                <Link href="/">
                  <a>
                    {" "}
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> Paris, France
                  </a>
                </Link>
              </li>

              <li>
                <a href="mailto:contact@upgear.fr">
                  {" "}
                  <FontAwesomeIcon icon={faEnvelope} /> contact@upgear.fr{" "}
                </a>
              </li>
            </LinksList>
          </LinksCol>
        </Row>
      </MainPartContainer>
      <FooterCopyright>
        © 2022 Copyright:<a href="https://upgear.fr/"> upgear.fr</a>
      </FooterCopyright>
    </FooterElement>
  );
}

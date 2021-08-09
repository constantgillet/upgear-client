import { Col, Row } from "antd";
import React from "react";
import Container from "../components/Container";
import Main from "../components/Main";
import Meta from "../components/Meta";
import Separator from "../components/Separator";
import Image from "next/image";
import { MainStyle } from "../styles/style";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCreditCard, faShieldAlt, faShoppingCart } from "@fortawesome/fontawesome-free-solid";
import { lighten } from "polished";

const ContentContainer = styled.div`
  background: white;
  padding: ${MainStyle.space.xl}px;
  border-radius: ${MainStyle.radius.m}px;
  border: ${MainStyle.card.border};
`;

const ContentSeparator = styled(Separator)`
  margin: ${MainStyle.space.xl}px auto;
`;

const PageTitle = styled.h1`
  font-size: ${MainStyle.text.title.fontSize};
  font-weight: ${MainStyle.text.title.fontWeight};
  text-align: center;
  padding-top: ${MainStyle.space.l}px;
  margin-bottom: ${MainStyle.space.m}px;
`;

const PageSubTitle = styled.h2`
  font-size: 22px;
  font-weight: ${MainStyle.text.subtitle.fontWeight};
  text-align: center;
  margin-bottom: ${MainStyle.space.m}px;
`;

const PartTitle = styled.h2`
  font-size: 18px;
  font-weight: ${MainStyle.text.subtitle.fontWeight};
  text-align: center;
  margin-bottom: ${MainStyle.space.m}px;
`;

const TextCol = styled(Col)`
  display: flex;
  align-items: center;
`;

const ImageCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    transition: all 0.3s ease-in;
    &:hover {
      transform: scale(0.95);
    }
  }
`;

function FeatureItem({ icon, text }) {
  return (
    <FeatureItemElement>
      <FontAwesomeIcon icon={icon} />
      <div>{text}</div>
    </FeatureItemElement>
  );
}

const FeatureItemElement = styled.div`
  font-size: ${MainStyle.text.body.fontSize};
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-bottom: ${MainStyle.space.m}px;

  svg {
    font-size: 24px;
    color: ${MainStyle.color.success};
    margin-right: 18px;
  }
`;

function Step({ number, text }) {
  return (
    <StepElement>
      <StepNumber>#{number}</StepNumber>
      <StepText>{text}</StepText>
    </StepElement>
  );
}

const StepElement = styled.div`
  padding: ${MainStyle.space.l}px;
  border-radius: ${MainStyle.radius.s}px;
  border: 2px ${lighten(0.3, MainStyle.color.primary)} solid;
  height: 200px;
  transition: all 0.3s ease-in;
  &:hover {
    border: 2px ${MainStyle.color.primary} solid;
  }
`;

const StepNumber = styled.p`
  font-size: 34px;
  color: ${MainStyle.color.primary};
  text-align: center;
  font-weight: bold;
  margin-bottom: 12px;
`;

const StepText = styled.p`
  text-align: center;
`;

export default function PaiementSecurise() {
  return (
    <Main>
      <Meta title="🛡️🔒 Paiement sécurisé | Upgear" />
      <Container>
        <PageTitle>Paiement sécurisé Obvy</PageTitle>
        <ContentContainer>
          <PageSubTitle>Sécurisez toutes vos ventes et vos achats entre particuliers !</PageSubTitle>
          <Row gutter={MainStyle.gutter} justify="center">
            <TextCol md={9}>
              <p>
                UpGear s’associe à Obvy, entreprise française spécialisée dans la sécurisation des
                transactions entre particuliers afin de vous garantir des achats et des ventes en toute
                simplicité et à l’abri de toutes les arnaques.
              </p>
            </TextCol>
            <ImageCol md={9}>
              <Image src="/images/obvy/obvy-security-shield-woman.png" width={260} height={241} />
            </ImageCol>
          </Row>
          <ContentSeparator />
          <Row gutter={MainStyle.gutter} justify="center">
            <Col md={9}>
              <PartTitle>Ce partenariat vous garantit :</PartTitle>
              <FeatureItem icon={faShieldAlt} text="Une protection optimale contre toutes les arnaques" />
              <FeatureItem
                icon={faCreditCard}
                text="Une simplicité à toute épreuve avec le paiement en ligne"
              />
              <FeatureItem
                icon={faShoppingCart}
                text="Une traçabilité totale de toutes vos ventes et tous vos achats"
              />
            </Col>
            <Col md={9}>
              <PartTitle>Les avantages sont nombreux : </PartTitle>
              <FeatureItem icon={faCheck} text="Pas de paiement à l’avance pour l’acheteur" />
              <FeatureItem icon={faCheck} text="Solvabilité garantie pour le vendeur" />
              <FeatureItem icon={faCheck} text="Annulation gratuite et sans frais" />
            </Col>
          </Row>
          <ContentSeparator />
          <PartTitle>Comment ça marche</PartTitle>
          <Row gutter={MainStyle.gutter}>
            <Col md={6}>
              <Step number={1} text="Je visite la page de l’objet que je veux sur Upgear" />
            </Col>
            <Col md={6}>
              <Step
                number={2}
                text="Je clique sur le bouton « Paiement sécurisé » pour envoyer ma proposition d’achat"
              />
            </Col>
            <Col md={6}>
              <Step number={3} text="Je finalise mon inscription sur Obvy en quelques clics" />
            </Col>
            <Col md={6}>
              <Step
                number={4}
                text="Je n’ai plus qu’à suivre ma transaction sur Obvy pour finaliser mon achat !"
              />
            </Col>
          </Row>
          <ContentSeparator />
          <PartTitle>Les tarrifs</PartTitle>
          <Row>
            <Col md={24}></Col>
          </Row>
        </ContentContainer>
      </Container>
    </Main>
  );
}
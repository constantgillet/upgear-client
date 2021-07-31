import { Breadcrumb, Carousel, Col, message, Row } from "antd";
import React from "react";
import Container from "../../../components/Container";
import Main from "../../../components/Main";
import Link from "next/link";
import styled from "styled-components";
import { MainStyle } from "../../../styles/style";
import { getOneOffer } from "../../../lib/API/offferAPI";
import { getOneUser } from "../../../lib/API/userAPI";
import { API_IMAGES_PATH, API_URL } from "../../../lib/constants";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faImage } from "@fortawesome/fontawesome-free-regular";
import { faChevronLeft, faChevronRight, faExpand } from "@fortawesome/fontawesome-free-solid";
import { ContactAside } from "../../../components/ContactAside";
import { toReadablePrice } from "../../../helpers/textHelpers";
import Separator from "../../../components/Separator";

const BreadcrumbElement = styled(Breadcrumb)`
  padding-top: ${MainStyle.space.m}px;
  padding-bottom: ${MainStyle.space.m}px;
`;

const OfferImage = styled(Image)`
  border-radius: ${MainStyle.radius.m}px;
`;

const CarouselContainer = styled.div`
  position: relative;
`;

const ButtonPrevious = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  z-index: 2;
  transform: translateY(-50%);
  padding: 12px;
  cursor: pointer;
  color: #10233a;
  transition: all 0.15s ease-in-out;
  left: 12px;
  width: 46px !important;
  height: 46px;

  &:hover {
    width: 52px !important;
    height: 52px;
  }
`;

const ButtonNext = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  z-index: 2;
  transform: translateY(-50%);
  padding: 12px;
  cursor: pointer;
  color: #10233a;
  transition: all 0.15s ease-in-out;
  right: 12px;
  width: 46px !important;
  height: 46px;

  &:hover {
    width: 52px !important;
    height: 52px;
  }
`;

const ImagesPreviewBox = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
  align-self: flex-start;
  justify-content: space-between;
  height: 100%;
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 116px;
  background-position: center;
  background-size: cover;
  border-radius: ${MainStyle.radius.m}px;
  border: 1.5px solid #f2f3f7;
  cursor: pointer;
`;

const ImagePreviewEmpty = styled.div`
  width: 100%;
  height: 116px;
  background: #f1f6fc;
  border-radius: ${MainStyle.radius.m}px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a1c4f0;
  font-size: 28px;
`;

const ImagePreviewSeeMoreElement = styled.div`
  position: relative;
  width: 100%;
  height: 116px;
  border-radius: ${MainStyle.radius.m}px;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;

  svg {
    margin-right: 4px;
  }

  &:hover {
    .overlay {
      opacity: 0.7;
    }
  }
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.4;
    border-radius: ${MainStyle.radius.m}px;
    transition: opacity 0.15s ease-out;
  }
`;

const OfferSection = styled.section`
  background: white;
  border: ${MainStyle.card.border};
  border-radius: ${MainStyle.radius.m}px;
  margin-top: ${MainStyle.space.l}px;
  margin-bottom: ${MainStyle.space.l}px;
  padding: ${MainStyle.space.l}px;
`;

const OfferTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OfferTitle = styled.h1`
  font-size: ${MainStyle.text.title.fontSize};
  font-weight: ${MainStyle.text.title.fontWeight};
  line-height: 28px;
`;

const IconFavorite = styled(FontAwesomeIcon)`
  font-size: 24px;
  color: ${MainStyle.color.primary};
  cursor: pointer;
`;

const OfferPrice = styled.div`
  color: ${MainStyle.color.primary};
  font-size: 24px;
  font-weight: 600;
`;

const OfferCreationDate = styled.span`
  font-size: ${MainStyle.text.small.fontSize};
  font-weight: 600;
`;

const PartSeparator = styled(Separator)`
  margin: ${MainStyle.space.l}px auto;
`;

const OfferPartTitle = styled.h2`
  font-size: ${MainStyle.text.subtitle.fontSize};
  font-weight: ${MainStyle.text.subtitle.fontWeight};
`;

const OfferDescription = styled.p`
  white-space: pre-line;
  line-break: anywhere;
`;

function ImagePreviewSeeMore({ imageSrc, onClick }) {
  return (
    <ImagePreviewSeeMoreElement style={{ backgroundImage: `url(\'${imageSrc}\')` }} onClick={onClick}>
      <div style={{ zIndex: 1 }}>
        <FontAwesomeIcon icon={faExpand} />
        Afficher les photos
      </div>
      <div className="overlay"></div>
    </ImagePreviewSeeMoreElement>
  );
}

export default function OffersList({ pageProps }) {
  const { offer, offerUser } = pageProps;

  const creationDate = new Date(offer.creation_date);
  return (
    <Main>
      <Container>
        <BreadcrumbElement>
          <Breadcrumb.Item>
            <Link href="/offres">Annonces</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href={"/offres/" + offer.category}>{offer.category}</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{offer.title}</Breadcrumb.Item>
        </BreadcrumbElement>
        <Row gutter={MainStyle.gutter}>
          <Col span={24} md={16}>
            <Row gutter={MainStyle.gutter}>
              <Col lg={18}>
                <CarouselContainer>
                  <Carousel>
                    {offer.images.map((image, index) => (
                      <OfferImage key={index} src={API_IMAGES_PATH + image} width={540} height={400} />
                    ))}
                  </Carousel>
                  <ButtonPrevious icon={faChevronLeft} />
                  <ButtonNext icon={faChevronRight} size="2x" />
                </CarouselContainer>
              </Col>
              <Col lg={6}>
                <ImagesPreviewBox>
                  <ImagePreview
                    style={{ backgroundImage: `url(\'${API_IMAGES_PATH + "min-" + offer.images[0]}\')` }}
                  />
                  {offer.images.length > 1 ? (
                    <ImagePreview
                      style={{ backgroundImage: `url(\'${API_IMAGES_PATH + "min-" + offer.images[0]}\')` }}
                    />
                  ) : (
                    <ImagePreviewEmpty>
                      <FontAwesomeIcon icon={faImage} />
                    </ImagePreviewEmpty>
                  )}
                  <ImagePreviewSeeMore
                    imageSrc={API_IMAGES_PATH + "min-" + offer.images[0]}
                    onClick={() => message.info("Cette fonctionnalité n'est pas encore disponnible")}
                  />
                </ImagesPreviewBox>
              </Col>
            </Row>

            <OfferSection>
              <OfferTitleContainer>
                <OfferTitle>{offer.title}</OfferTitle>
                <IconFavorite icon={faHeart} />
              </OfferTitleContainer>
              <OfferPrice>{toReadablePrice(offer.price)}</OfferPrice>
              <OfferCreationDate>
                Ajouté le{" "}
                {creationDate.toLocaleString("fr-FR", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}{" "}
                à {creationDate.toLocaleString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
              </OfferCreationDate>
              <PartSeparator />
              <OfferPartTitle> Description : </OfferPartTitle>
              <OfferDescription>{offer.description}</OfferDescription>
              <PartSeparator />
              <OfferPartTitle> Livraison : </OfferPartTitle>
              <p>Faites livrer cet équipement avec votre mode de livraison préféré.</p>
            </OfferSection>
          </Col>
          <Col span={24} md={8}>
            <ContactAside offer={offer} offerUser={offerUser} />
          </Col>
        </Row>
      </Container>
    </Main>
  );
}

export async function getServerSideProps({ params, res }) {
  const { offerSlug } = params;
  const offerSlugSplited = offerSlug.split("-");

  try {
    const resp = await getOneOffer(offerSlugSplited[0]);
    const respUser = await getOneUser(resp.data.data.user_id);

    // will be passed to the page component as props
    return {
      props: {
        pageProps: { offer: resp.data.data, offerUser: respUser.data.data }
      }
    };
  } catch (error) {
    res.statusCode = 404;
    return {
      props: { myStatusCode: 404, error: `couldn't find the offer` } // will be passed to the page component as props
    };
  }
}

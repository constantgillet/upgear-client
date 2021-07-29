import {
  faComment,
  faCommentAlt,
  faComments,
  faPhone,
  faShieldAlt
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styled from "styled-components";
import { MainStyle } from "../styles/style";
import Button from "./Button";
import Input from "./Input";
import Image from "next/dist/client/image";
import { faQuestionCircle } from "@fortawesome/fontawesome-free-regular";

const ContactAsideElement = styled.aside`
  position: sticky;
  top: 149px;
  background: white;
  border-radius: ${MainStyle.radius.m}px;
  box-shadow: ${MainStyle.boxShadow};
`;

const AsideHeader = styled.div`
  padding: ${MainStyle.space.l}px;
  border-bottom: 1px solid #f0efef;
  display: flex;
  align-items: center;
`;

const ProfileLink = styled.a`
  display: flex;
  align-items: center;

  img {
    border-radius: 50%;
  }
`;

const UsernameText = styled.span`
  display: inline-block;
  vertical-align: middle;
  margin-left: 24px;
  font-weight: 600;
  font-size: 20px;
  color: ${MainStyle.color.dark};
`;

const AsideBody = styled.div`
  padding: ${MainStyle.space.l}px;
`;
const { TextAera } = Input;

const ChatTextAera = styled(TextAera)`
  height: 74px !important;
  resize: inherit;
`;

const ShowPhoneButton = styled(Button)`
  margin-top: ${MainStyle.space.s}px;
`;

const SendMessageButton = styled(Button)`
  margin-top: ${MainStyle.space.s}px;
  //margin-bottom: ${MainStyle.space.s}px;
`;

const BuyButton = styled(Button)`
  margin-top: ${MainStyle.space.s}px;
`;

const ProtectTextPart = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${MainStyle.color.success};
  margin-top: ${MainStyle.space.l}px;
  margin-bottom: ${MainStyle.space.xs}px;

  p {
    font-size: 16px;
    text-align: center;
    margin-bottom: 0px;
    margin-left: 12px;
    font-weight: 600;
    line-height: 21px;
  }

  svg {
    font-size: 32px;
  }
`;

const HelpIcon = styled.div`
  width: 40px;
  height: 40px;
  transform: translate3d(-10px, -16px, 0px);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    font-size: 14px;
  }
`;

export function ContactAside({ offer, offerUser }) {
  return (
    <ContactAsideElement>
      <AsideHeader>
        <Link href="/">
          <ProfileLink title="Lien du profil du vendeur">
            <Image src="https://upgear.fr/images/user.jpg" width={60} height={60} />
            <UsernameText className="user-username">{offerUser.username}</UsernameText>
          </ProfileLink>
        </Link>
      </AsideHeader>
      <AsideBody>
        <ChatTextAera placeholder="Ecrivez un message au vendeur ici" />
        <SendMessageButton block type="outline" icon={<FontAwesomeIcon icon={faComments} />}>
          Envoyer le message
        </SendMessageButton>

        {offer?.has_phone_number === true && (
          <ShowPhoneButton block type="outline" icon={<FontAwesomeIcon icon={faPhone} />}>
            Afficher le numéro
          </ShowPhoneButton>
        )}

        <BuyButton block icon={<FontAwesomeIcon icon={faShieldAlt} />} loading={false}>
          Acheter en ligne
        </BuyButton>
        <ProtectTextPart>
          <FontAwesomeIcon icon={faShieldAlt} />
          <p>
            Achat protégé <br />
            par Obvy
          </p>
          <HelpIcon>
            <FontAwesomeIcon icon={faQuestionCircle} />
          </HelpIcon>
        </ProtectTextPart>
      </AsideBody>
    </ContactAsideElement>
  );
}
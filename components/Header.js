import Link from "next/link";
import styled, { css } from "styled-components";
import Container from "./Container";
import Image from "next/image";
import { Dropdown, message, Row } from "antd";
import Col from "./Col";
import { MainStyle } from "../styles/style";
import Button from "./Button";
import Input from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDown,
  faPlus,
  faSearch,
  faSignOutAlt,
  faTimes,
  faUser
} from "@fortawesome/fontawesome-free-solid";

import { signOut, useSession } from "next-auth/client";
import { useEffect, useRef, useState } from "react";
import { API_IMAGES_PATH, API_URL } from "../lib/constants";
import { darken, lighten } from "polished";
import Menu from "./Menu";
import { connect } from "react-redux";
import { useRouter } from "next/dist/client/router";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { faEnvelope, faPlusSquare, faUserCircle } from "@fortawesome/fontawesome-free-regular";
import Separator from "../components/Separator";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const HeaderElement = styled.header`
  height: 63px;

  ${({ display }) =>
    !display &&
    css`
      display: none;
    `}
`;
const HeaderFixedElement = styled.div`
  display: block;
  background: #ffffff;
  padding: 10px 0px;
  border-bottom: 1px solid #dee2e6 !important;

  ${({ isFixed }) =>
    isFixed &&
    css`
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 10;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.06));
      animation: header-fixed-animation 0.3s ease-out;
    `}

  ${({ isFixed }) =>
    isFixed &&
    css`
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 4;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.06));
      animation: header-fixed-animation 0.3s ease-out;
    `}
    

    @keyframes header-fixed-animation {
    from {
      transform: translateY(-100%);
    }

    to {
      transform: translateY(0%);
    }
  }
`;

const LogoCol = styled(Col)`
  display: flex;
  align-items: center;

  a {
    display: flex;
  }
`;
const SearchBar = styled.div`
  width: 100%auto;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  display: flex;
  flex-wrap: nowrap;
`;

const SearchBarInput = styled(Input)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  position: relative;
  flex: 1 1 auto;
  width: 1%;
  min-width: 0;
  margin-bottom: 0;
`;

const SearchBarButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  svg {
    margin-right: 0px;
  }
`;

const AuthActionsDiv = styled.div`
  display: flex;

  @media (min-width: ${MainStyle.breakpoint.md}px) {
    float: right;
  }
`;

const WidgetDiv = styled.div`
  display: inline-flex;
  position: relative;
`;

const IconButtonLink = styled.a`
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  border: 1px solid #dee2e6;
  border-radius: 50%;
  margin-right: ${MainStyle.space.s}px;
`;

const HeaderAuthDiv = styled.div`
  font-size: 14px;
  font-weight: 600;
  height: 6px;
  overflow-y: visible;
`;

const LinkAddNew = styled.a`
  text-decoration: none;
  margin-right: ${MainStyle.space.m}px;
`;

const AuthLink = styled.a`
  text-decoration: none;
`;

const WelcomeMessage = styled.span`
  color: ${MainStyle.color.dark80};
`;

const AuthDropdown = styled.div`
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  cursor: pointer;
  position: relative;

  & > div {
    color: ${MainStyle.color.primary};
    margin-left: ${MainStyle.space.s}px;
  }
`;

const ProfilePicture = styled(Image)`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  display: inline-block;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
`;

const DropdownIcon = styled(FontAwesomeIcon)`
  color: ${MainStyle.color.primary};
  margin-left: ${MainStyle.space.xs}px;
  width: 8px;
  height: 12px;
`;

const showNotAvaibleMessage = (e) => {
  e.stopPropagation();
  e.preventDefault();
  message.info("Cette fonctionnalité n'est pas encore disponnible");
};

function Header({ display, className, userData, ...props }) {
  const headerRef = useRef();
  const [session, loading] = useSession();

  const [search, setSearch] = useState("");

  const router = useRouter();

  const user = { ...userData };

  let header;
  let sticky;

  const [isFixed, setIsFixed] = useState(false);

  const getHeaderInfos = () => {
    header = headerRef.current;
    if (header) {
      sticky = header.offsetTop + header.offsetHeight;
    }
  };

  useEffect(() => {
    getHeaderInfos();
    window.onscroll = () => {
      fixHeader();
    };
  }, []);

  const fixHeader = () => {
    if (window.pageYOffset > sticky) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  //Change user picture
  if (user && user.profile_picture) {
    if (user?.profile_picture.length) {
      user.profile_picture = API_IMAGES_PATH + user.profile_picture;
    }
  }

  const postSearch = (e) => {
    e.preventDefault();

    router.push({ pathname: "/offres", query: search.length && { q: search } });
  };

  useEffect(() => {
    setSearch("");
  }, [router.pathname, router.query]);

  const current = useBreakpoint();

  const isMobile =
    (current?.xs || current?.sm || current?.md) && !current?.lg && !current?.xl && !current?.xxl;

  return (
    <HeaderElement display={display ? 1 : 0}>
      {isMobile ? (
        <MobileMenu auth={session} />
      ) : (
        <HeaderFixedElement ref={headerRef} isFixed={isFixed} className={className}>
          <Container>
            <Row>
              <LogoCol xs={6} lg={2}>
                <Link href="/">
                  <a>
                    <Image src={"/images/logo.png"} width={112} height={22} alt="Upgear logotype" />
                  </a>
                </Link>
              </LogoCol>
              <Col xs={12} lg={4} sm={12}>
                <form action="#" className="search" onSubmit={postSearch}>
                  <SearchBar>
                    <SearchBarInput
                      type="text"
                      className="form-control"
                      placeholder="Rechercher"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <SearchBarButton onClick={postSearch}>
                      <FontAwesomeIcon icon={faSearch} />
                    </SearchBarButton>
                  </SearchBar>
                </form>
              </Col>
              <Col xs={12} lg={6} sm={6}>
                <AuthActionsDiv>
                  <Link href="/ajouter-une-annonce">
                    <LinkAddNew className="no-text-decoration" title="Ajouter une annonce">
                      <Button icon={<FontAwesomeIcon icon={faPlus} />}>Ajouter</Button>
                    </LinkAddNew>
                  </Link>

                  {session && !loading ? (
                    <WidgetDiv>
                      <Link href="/">
                        <IconButtonLink title="Page connexion" onClick={showNotAvaibleMessage}>
                          <FontAwesomeIcon icon={faEnvelope} />
                        </IconButtonLink>
                      </Link>
                      <HeaderAuthDiv>
                        <Dropdown
                          overlay={authMenu}
                          placement="bottomRight"
                          getPopupContainer={(element) => element.parentNode}
                        >
                          <AuthDropdown>
                            <ProfilePicture
                              src={
                                user?.profile_picture?.length ? user.profile_picture : "/images/profile.jpg"
                              }
                              width={40}
                              height={40}
                            />
                            <div>{user.username}</div>
                            <DropdownIcon icon={faChevronDown} />
                          </AuthDropdown>
                        </Dropdown>
                      </HeaderAuthDiv>
                    </WidgetDiv>
                  ) : (
                    <WidgetDiv>
                      <Link href="/auth/connexion">
                        <IconButtonLink title="Page connexion">
                          <FontAwesomeIcon icon={faUser} />
                        </IconButtonLink>
                      </Link>
                      <HeaderAuthDiv>
                        <WelcomeMessage>Bienvenue sur UpGear!</WelcomeMessage>
                        <div>
                          <Link href="/auth/connexion">
                            <AuthLink title="Page de connexion">Connexion</AuthLink>
                          </Link>
                          <span>|</span>
                          <Link href="/auth/inscription">
                            <AuthLink title="Page inscription">Inscription</AuthLink>
                          </Link>
                        </div>
                      </HeaderAuthDiv>
                    </WidgetDiv>
                  )}
                </AuthActionsDiv>
              </Col>
            </Row>
          </Container>
        </HeaderFixedElement>
      )}
    </HeaderElement>
  );
}

const authMenu = (
  <Menu>
    <Menu.Item key="my-profile">
      <Link href="/compte/mon-profil">
        <a title="Mes annonces">Mon profil</a>
      </Link>
    </Menu.Item>

    <Menu.Item key="offers-item">
      <Link href="/compte/mes-annonces">
        <a title="Mes annonces">Mes annonces</a>
      </Link>
    </Menu.Item>

    <Menu.Item key="favorites-item">
      <Link href="/compte/mes-favoris">
        <a title="Mes favoris">Mes favoris</a>
      </Link>
    </Menu.Item>

    <Menu.Item onClick={signOut} key="logout-item">
      Se déconnecter
    </Menu.Item>
  </Menu>
);

const mapState = (state) => {
  return {
    userData: state.user.user
  };
};

export default connect(mapState)(Header);

const MobileMenuBar = styled.div`
  background-color: ${MainStyle.color.primary};
  width: 100%;
  height: 63px;
  position: fixed;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomeLink = styled.a`
  display: flex;
`;

const MenuButtonToggle = styled.div`
  position: absolute;
  left: 24px;
  color: white;
  cursor: pointer;
  font-size: 28px;
`;

const ShadowLayout = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 3;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease-in-out;

  ${({ visible }) =>
    visible &&
    css`
      pointer-events: ;
      opacity: 1;
      pointer-events: all;
      background: rgba(0, 0, 0, 0.7);
    `}
`;

const CloseMenuButton = styled.div`
  cursor: pointer;
  font-size: 28px;
  color: white;
  width: 36px;
  position: absolute;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 12px;
  right: 12px;
`;

const AsideMenu = styled.aside`
  width: 80%;
  height: 100%;
  background: white;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 4;
  border-right: ${MainStyle.card.border};
  transition: all 0.3s ease-out;
  transform: translateX(-101%);
  display: flex;
  flex-direction: column;

  ${({ visible }) =>
    visible &&
    css`
      transform: translateX(0%);
    `}
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${MainStyle.space.l}px;
  margin-bottom: ${MainStyle.space.m}px;
`;

const ListNav = styled.nav`
  flex-direction: column;
  flex: 1 0 auto;
`;

const MobileNavItem = styled.div`
  border-radius: ${MainStyle.radius.s}px;
  color: ${MainStyle.color.dark};
  display: flex;
  align-items: center;
  flex-shrink: 0;
  font-weight: 600;
  margin: 0px ${MainStyle.space.s}px ${MainStyle.space.m}px;
  padding: 0.6rem 1rem;
  transition: all 0.3s ease-out;

  &:hover,
  &:focus {
    background-color: ${MainStyle.color.primary20};
    color: ${MainStyle.color.primary};
  }
  svg {
    font-size: 20px;
    margin-right: ${MainStyle.space.m}px;
  }

  ${({ textPrimary }) =>
    textPrimary &&
    css`
      color: ${MainStyle.color.primary};
    `}
`;

const NavSeparator = styled(Separator)`
  margin: ${MainStyle.space.m}px 0px;
`;

const MobileMenu = ({ auth }) => {
  const [visible, setVisible] = useState(false);

  const toggleMenu = () => setVisible(!visible);

  useEffect(() => {
    if (visible) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [visible]);

  return (
    <MobileMenuBar>
      <MenuButtonToggle onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </MenuButtonToggle>
      <Link href="/">
        <HomeLink title="Accueil">
          <Image src="/images/logo-white.png" width={114} height={22} />
        </HomeLink>
      </Link>
      <ShadowLayout visible={visible} onClick={toggleMenu}>
        <CloseMenuButton>
          <FontAwesomeIcon icon={faTimes} />
        </CloseMenuButton>
      </ShadowLayout>
      <AsideMenu visible={visible}>
        <div>
          <Link href="/">
            <LogoContainer title="Accueil" onClick={toggleMenu}>
              <Image src="/images/logo.png" width={114} height={22} />
            </LogoContainer>
          </Link>
        </div>
        <ListNav>
          <Link href="/ajouter-une-annonce">
            <a title="Déposer une annonce" onClick={toggleMenu}>
              <MobileNavItem>
                <FontAwesomeIcon icon={faPlusSquare} /> Déposer une annonce
              </MobileNavItem>
            </a>
          </Link>

          <Link href="/offres">
            <a title="Rechercher une annonce" onClick={toggleMenu}>
              <MobileNavItem>
                <FontAwesomeIcon icon={faSearch} /> Rechercher une annonce
              </MobileNavItem>
            </a>
          </Link>
          <NavSeparator />
          <Link href="/">
            <a title="Messages" onClick={showNotAvaibleMessage}>
              <MobileNavItem>
                <FontAwesomeIcon icon={faEnvelope} /> Messages
              </MobileNavItem>
            </a>
          </Link>

          <Link href="/compte/mes-favoris">
            <a title="Mes favoris" onClick={toggleMenu}>
              <MobileNavItem>
                <FontAwesomeIcon icon={faHeart} /> Mes favoris
              </MobileNavItem>
            </a>
          </Link>
        </ListNav>
        <ListNav>
          {auth?.user ? (
            <a
              title="Se déconnecter"
              onClick={() => {
                toggleMenu();
                signOut();
              }}
            >
              <MobileNavItem>
                <FontAwesomeIcon icon={faSignOutAlt} /> Se déconnecter
              </MobileNavItem>
            </a>
          ) : (
            <Link href="/auth/connexion">
              <a title="Se connecter" onClick={toggleMenu}>
                <MobileNavItem textPrimary>
                  <FontAwesomeIcon icon={faUserCircle} /> Se connecter
                </MobileNavItem>
              </a>
            </Link>
          )}

          <NavSeparator />
          <Link href="/paiement-securise">
            <a title="Paiement sécurisé" onClick={toggleMenu}>
              <MobileNavItem>Paiement sécurisé</MobileNavItem>
            </a>
          </Link>
        </ListNav>
      </AsideMenu>
    </MobileMenuBar>
  );
};

import React, { useState } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { motion } from "framer-motion"
import Emoji from "./Emoji"
import Pill from "./Pill"
import Icon from "./Icon"
import Translation from "./Translation"
import ButtonLink from "./ButtonLink"
import { ButtonSecondary } from "./SharedStyledComponents"

const Container = styled.div`
  /* TODO: dynamic height? */
  min-height: 400px;
  perspective: 1000px;
`

const Card = styled.div`
  position: relative;
  transform-style: preserve-3d;
  height: 100%;
  width: 100%;
  border-radius: 2px;
  &:hover {
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`

const StyledIcon = styled(Icon)`
  margin-left: 0.5rem;
  fill: ${({ theme }) => theme.colors.text};
`

const CardFace = styled(motion.div)`
  position: absolute;
  backface-visibility: hidden;
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0px 14px 66px rgba(0, 0, 0, 0.07),
    0px 10px 17px rgba(0, 0, 0, 0.03), 0px 4px 7px rgba(0, 0, 0, 0.05);
  background: ${({ theme }) => theme.colors.background};
`

const CardFront = styled(CardFace)`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.lightBorder};
  text-decoration: none;
`

const CardBack = styled(CardFace)`
  &:hover {
    cursor: pointer;
  }
  &:hover path {
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.ednBackground};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  &:hover {
    cursor: pointer;
  }
  &:hover path {
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const ImageWrapper = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 1rem;
  padding: 0.25rem;
  background-color: ${({ background }) => background};
  box-shadow: ${(props) => props.theme.colors.tableBoxShadow};
  border-radius: 4px;
`

const Image = styled(Img)`
  width: 100%;
  /*   width: 80px;
  height: 80px;
  align-self: center;
  margin-right: 2rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
    max-width: 311px;
  } */
`

const FlipIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const FlipTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  margin-top: -0.5rem;
`

const TypePill = styled(Pill)`
  margin-right: 0.75rem;
  font-size: 14px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text200};
  padding: 0;
`

const TypeContainer = styled.div`
  margin-top: 0rem;
  margin-bottom: 1rem;
  text-align: left;
`

const Content = styled.div`
  padding: 1.5rem;
  text-align: left;
  height: 100%;
  position: relative;
`

const Title = styled.h3`
  margin-bottom: 0rem;
  margin-top: 0rem;
  font-size: 20px;
`

const Description = styled.p`
  opacity: 0.8;
  font-size: ${({ theme }) => theme.fontSizes.s};
  margin-bottom: 0.5rem;
  line-height: 140%;
  max-height: 100px;
  overflow-y: scroll;
`

const StyledButtonLink = styled(ButtonLink)`
  margin: 1rem;
`

const FeaturesHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-weight: 600;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`

const FeatureRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  opacity: 0.9;
`

const StyledButtonSecondary = styled(ButtonSecondary)`
  margin: 1rem;
  margin-bottom: 0rem;
`

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;
`

const BackHeaderRow = styled.div`
  display: flex;
  align-items: center;
`

const WalletInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const WalletCard = ({ wallet }) => {
  const [isCardFlipped, setIsCardFlipped] = useState(false)
  const duration = 0.3
  const flipVariants = {
    shown: {
      rotateY: 0,
      transition: {
        duration,
      },
    },
    frontFlipped: {
      rotateY: -180,
      transition: {
        duration,
      },
    },
    backFlipped: {
      rotateY: 180,
      transition: {
        duration,
      },
    },
  }

  const getFeatureStatus = (feature) =>
    feature === "TRUE" ? (
      <Emoji size="0.75rem" text="✅" />
    ) : (
      <Emoji size="0.75rem" text="❌" />
    )

  return (
    <Container>
      <Card>
        <CardFront
          variants={flipVariants}
          animate={isCardFlipped ? "frontFlipped" : "shown"}
        >
          <Wrapper onClick={() => setIsCardFlipped(!isCardFlipped)}>
            <HeaderRow>
              <ImageWrapper background={wallet.brand_color}>
                <Image
                  fluid={wallet.image.childImageSharp.fluid}
                  alt={wallet.alt}
                />
              </ImageWrapper>
              <Title>{wallet.name}</Title>
            </HeaderRow>
          </Wrapper>
          <Content>
            <TypeContainer>
              {wallet.has_mobile === "TRUE" && (
                <TypePill>
                  <Emoji size="1rem" text=":mobile_phone:" mr="0.25rem" />{" "}
                  Mobile
                </TypePill>
              )}
              {wallet.has_web === "TRUE" && (
                <TypePill>
                  <Emoji
                    size="1rem"
                    text=":globe_with_meridians:"
                    mr="0.25rem"
                  />{" "}
                  Web
                </TypePill>
              )}
              {wallet.has_hardware === "TRUE" && (
                <TypePill>
                  <Emoji size="1rem" text=":minidisc:" mr="0.25rem" /> Hardware
                </TypePill>
              )}
              {wallet.has_desktop === "TRUE" && (
                <TypePill>
                  <Emoji size="1rem" text=":desktop_computer:" mr="0.25rem" />{" "}
                  Desktop
                </TypePill>
              )}
            </TypeContainer>
            <Description>{wallet.description}</Description>
          </Content>
          <StyledButtonSecondary
            onClick={() => setIsCardFlipped(!isCardFlipped)}
          >
            <FlipIcon>
              More info <StyledIcon name="flip" ml="1rem" size="1.25rem" />
            </FlipIcon>
          </StyledButtonSecondary>
          <StyledButtonLink to={wallet.url} hideArrow={true}>
            Go
          </StyledButtonLink>
        </CardFront>
        <CardBack
          variants={flipVariants}
          initial={{ rotateY: 180 }}
          animate={isCardFlipped ? "shown" : "backFlipped"}
          onClick={() => setIsCardFlipped(!isCardFlipped)}
        >
          <Content>
            <FlipTitle>
              <BackHeaderRow>
                <ImageWrapper background={wallet.brand_color}>
                  <Image
                    fluid={wallet.image.childImageSharp.fluid}
                    alt={wallet.alt}
                  />
                </ImageWrapper>
                <Title>{wallet.name}</Title>
              </BackHeaderRow>
              <Icon name="flip" ml="1rem" size="1.5rem" />
            </FlipTitle>
            <FeaturesHeader>Features</FeaturesHeader>
            {/* TODO: intl extraction */}
            <FeatureRow>
              Withdraw to bank {getFeatureStatus(wallet.has_bank_withdrawals)}
            </FeatureRow>
            <FeatureRow>
              Buy ETH with card {getFeatureStatus(wallet.has_card_deposits)}
            </FeatureRow>
            <FeatureRow>
              Access to DeFi {getFeatureStatus(wallet.has_defi_integrations)}
            </FeatureRow>
            <FeatureRow>
              Explore dapps {getFeatureStatus(wallet.has_explore_dapps)}
            </FeatureRow>
            <FeatureRow>
              Swap tokens {getFeatureStatus(wallet.has_dex_integrations)}
            </FeatureRow>
            <FeatureRow>
              Buy in high volume{" "}
              {getFeatureStatus(wallet.has_high_volume_purchases)}
            </FeatureRow>
            <FeatureRow>
              Transaction limits{" "}
              {getFeatureStatus(wallet.has_limits_protection)}
            </FeatureRow>
            <FeatureRow>
              Multi-sig protection {getFeatureStatus(wallet.has_multisig)}
            </FeatureRow>
          </Content>
        </CardBack>
      </Card>
    </Container>
  )
}

export default WalletCard

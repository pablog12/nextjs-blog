import PropTypes from 'prop-types';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import * as S from '../styles';

const name = 'Thaloz';
export const siteTitle = 'Thaloz Recruiting';

const Container = styled.div`
    max-width: 36rem;
    padding: 0 1rem;
    margin: 3rem auto 6rem;
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BackToHome = styled.div`
    margin: 3rem 0 0;
`;

const ProfileImage = styled(Image)`
    ${S.mixins.borderCircle};
`;

const A = styled.a`
    ${S.mixins.colorInherit};
`;

const H1 = styled.h1`
    ${S.mixins.heading2Xl};
`;

const H2 = styled.h2`
    ${S.mixins.headingLg};
`;

function Layout({ children, home }) {
    return (
        <Container>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="Thaloz Recruiting" />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <Header>
                {home ? (
                    <>
                        <ProfileImage
                            priority
                            alt={name}
                            src="/images/profile.jpg"
                            height={144}
                            width={144}
                        />
                        <H1>{name}</H1>
                    </>
                ) : (
                    <>
                        <Link href="/">
                            <a>
                                <ProfileImage
                                    priority
                                    src="/images/profile.jpg"
                                    height={108}
                                    width={108}
                                    alt={name}
                                />
                            </a>
                        </Link>
                        <H2>
                            <Link href="/">
                                <A>{name}</A>
                            </Link>
                        </H2>
                    </>
                )}
            </Header>
            <main>{children}</main>
            {!home && (
                <BackToHome>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </BackToHome>
            )}
        </Container>
    );
}

Layout.propTypes = {
    children: PropTypes.array,
    home: PropTypes.bool
};

export default Layout;

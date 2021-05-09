import PropTypes from 'prop-types';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import Link from 'next/link';
import Date from '../components/date';
import { getSortedPostsData } from '../lib/posts';
import styled from 'styled-components';
import * as S from '../styles';

const SectionHeading = styled.section`
    ${S.mixins.headingMd}
`;

const SectionBlog = styled.section`
    ${S.mixins.headingMd};
    ${S.mixins.padding1px};
`;

const H2 = styled.h2`
    ${S.mixins.headingLg};
`;

const UL = styled.ul`
    ${S.mixins.list};
`;

const LI = styled.li`
    ${S.mixins.listItem};
`;

const Small = styled.small`
    ${S.mixins.lightText};
`;

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData
        }
    };
}

export default function Home({ allPostsData }) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <SectionHeading>
                <p>[Your Self Introduction]</p>
                <p>
                    (This is a sample website - you’ll be building a site like this on{' '}
                    <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
                </p>
            </SectionHeading>
            <SectionBlog>
                <H2>Blog</H2>
                <UL>
                    {allPostsData.map(({ id, date, title }) => (
                        <LI key={id}>
                            <Link href={`/posts/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br />
                            <Small>
                                <Date dateString={date} />
                            </Small>
                        </LI>
                    ))}
                </UL>
            </SectionBlog>
        </Layout>
    );
}
Home.propTypes = {
    allPostsData: PropTypes.array
};

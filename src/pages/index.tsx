import PropTypes from 'prop-types';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import styled from 'styled-components';
import * as S from '../styles';

const SectionHeading = styled.section`
    ${S.mixins.headingMd}
`;

function Home() {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <SectionHeading>
                <p>Your Self Introduction</p>
            </SectionHeading>
        </Layout>
    );
}

Home.propTypes = {
    allPostsData: PropTypes.array
};

export default Home;

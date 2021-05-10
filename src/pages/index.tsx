import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import styled from 'styled-components';
import * as S from '../styles';

import { appName, appVersion } from '@/env';

import { Login } from '../components/login';

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
                <p>
                    {appName} {appVersion}
                </p>
            </SectionHeading>
            <section>
                <Login />
            </section>
        </Layout>
    );
}

export default Home;

import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import styled from 'styled-components';
import * as S from '../styles';

import { appName, appVersion } from '@/env';

const SectionHeading = styled.section`
    ${S.mixins.headingMd}
`;

function Main() {
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
                <p>You are logged in.</p>
            </section>
        </Layout>
    );
}

export default Main;

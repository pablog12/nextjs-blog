import PropTypes from 'prop-types';
import Head from 'next/head';
import Layout from '../../components/layout';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import styled from 'styled-components';
import * as S from '../../styles';

const LightText = styled.div`
    ${S.mixins.lightText};
`;

const H1 = styled.h1`
    ${S.mixins.headingXl};
`;

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData
        }
    };
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    };
}

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <H1>{postData.title}</H1>
                <LightText>
                    <Date dateString={postData.date} />
                </LightText>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    );
}
Post.propTypes = {
    postData: PropTypes.object
};

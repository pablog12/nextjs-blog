import { css } from 'styled-components';

const flexAlignCenter = css`
    align-items: center;
    display: flex;
`;

const flexAlignStart = css`
    ${flexAlignCenter}
    align-items: flex-start;
`;

const heading2Xl = css`
    font-size: 2.5rem;
    line-height: 1.2;
    font-weight: 800;
    letter-spacing: -0.05rem;
    margin: 1rem 0;
`;

const headingXl = css`
    font-size: 2rem;
    line-height: 1.3;
    font-weight: 800;
    letter-spacing: -0.05rem;
    margin: 1rem 0;
`;

const headingLg = css`
    font-size: 1.5rem;
    line-height: 1.4;
    margin: 1rem 0;
`;

const headingMd = css`
    font-size: 1.2rem;
    line-height: 1.5;
`;

const borderCircle = css`
    border-radius: 9999px;
`;

const colorInherit = css`
    color: inherit;
`;

const padding1px = css`
    padding-top: 1px;
`;

const list = css`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const listItem = css`
    margin: 0 0 1.25rem;
`;

const lightText = css`
    color: #666;
`;

const container = css`
    max-width: 36rem;
    padding: 0 1rem;
    margin: 3rem auto 6rem;
`;

const mixins = {
    flexAlignCenter,
    flexAlignStart,
    heading2Xl,
    headingXl,
    headingLg,
    headingMd,
    borderCircle,
    colorInherit,
    padding1px,
    list,
    listItem,
    lightText,
    container
};
export default mixins;

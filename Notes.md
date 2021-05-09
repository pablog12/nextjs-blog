# Notes on Next.js

You can mix Static and Server side generation for each page.

We recommend using Static Generation (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

-   Marketing pages
-   Blog posts
-   E-commerce product listings
-   Help and documentation

You should ask yourself: "Can I pre-render this page ahead of a user's request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is not a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use Server-side Rendering. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate frequently updated data.

# Static Generation with Data using getStaticProps

Essentially, getStaticProps allows you to tell Next.js: “Hey, this page has some data dependencies — so when you pre-render this page at build time, make sure to resolve them first!”

Note: In development mode, getStaticProps runs on each request instead.

# Client-side Rendering

If you do not need to pre-render the data, you can also use the following strategy (called Client-side Rendering):

Statically generate (pre-render) parts of the page that do not require external data.
When the page loads, fetch external data from the client using JavaScript and populate the remaining parts.

This approach works well for user dashboard pages, for example. Because a dashboard is a private, user-specific page, SEO is not relevant, and the page doesn’t need to be pre-rendered. The data is frequently updated, which requires request-time data fetching.

# SWR

The team behind Next.js has created a React hook for data fetching called SWR. We highly recommend it if you’re fetching data on the client side. It handles caching, revalidation, focus tracking, refetching on interval, and more. We won’t cover the details here, but here’s an example usage

```Javascript
import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```

See the docs here https://swr.vercel.app/

# Fetch External API or Query Database

Like getStaticProps, getStaticPaths can fetch data from any data source. In our example, getAllPostIds (which is used by getStaticPaths) may fetch from an external

```Javascript
export async function getAllPostIds() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch("..");
  const posts = await res.json();
  return posts.map((post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
}
```

# Fallback documentation

If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.

If fallback is true, then the behavior of getStaticProps changes:

-   The paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps.
-   The paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will serve a “fallback” version of the page on the first request to such a path (see “Fallback pages” below for details).
-   In the background, Next.js will statically generate the requested path HTML and JSON. This includes running getStaticProps.
-   When that’s done, the browser receives the JSON for the generated path. This will be used to automatically render the page with the required props. From the user’s perspective, the page will be swapped from the fallback page to the full page.
-   At the same time, Next.js adds this path to the list of pre-rendered pages. Subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.

Read more here https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required

# Custom Error pages

https://nextjs.org/docs/advanced-features/custom-error-page#404-page

# Environment Variables

https://nextjs.org/docs/basic-features/environment-variables

# AMP

https://nextjs.org/docs/advanced-features/amp-support/introduction

# Typescript

https://nextjs.org/learn/excel/typescript

# ESLINT error 1

npm ERR! code ELIFECYCLE
npm ERR! errno 1

That is expected behaviour so it errors out.

If needed you can do `eslint ...; exit 0`

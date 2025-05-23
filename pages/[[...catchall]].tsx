// import * as React from 'react';
// import {
//   PlasmicComponent,
//   ComponentRenderData,
//   PlasmicRootProvider,
//   extractPlasmicQueryData
// } from '@plasmicapp/loader-nextjs';
// import { GetStaticPaths, GetStaticProps } from 'next';
// import Error from 'next/error';
// import { useRouter } from 'next/router';
// import { PLASMIC } from '@/plasmic-init';

// /**
//  * Use fetchPages() to fetch list of pages that have been created in Plasmic
//  */
// export const getStaticPaths: GetStaticPaths = async () => {
// //   const pages = await PLASMIC.fetchPages();
// //   console.log(pages.map(p => p.path));
// //   return {
// //     paths: pages.map((page) => ({
// //       params: { catchall: page.path.substring(1).split('/') }
// //     })),
// //     fallback: 'blocking'
// //   };
//     const pageModules = await PLASMIC.fetchPages();
//     console.log(pageModules.map(p => p.path));
//     return {
//         paths: pageModules.map((mod) => ({
//         params: {
//             catchall: mod.path.substring(1).split("/"),
//         },
//         })),
//         fallback: "blocking",
//     };
// };

// /**
//  * For each page, pre-fetch the data we need to render it
//  */
// export const getStaticProps: GetStaticProps = async (context) => {
//   const { catchall } = context.params ?? {};

//   // Convert the catchall param into a path string
//   const plasmicPath =
//     typeof catchall === 'string' ? catchall : Array.isArray(catchall) ? `/${catchall.join('/')}` : '/';
//   const plasmicData = await PLASMIC.maybeFetchComponentData(plasmicPath);
//   if (!plasmicData) {
//     // This is some non-Plasmic catch-all page
//     return {
//       props: {}
//     };
//   }

//   // This is a path that Plasmic knows about.
//   const pageMeta = plasmicData.entryCompMetas[0];

//   // Cache the necessary data fetched for the page.
//   const queryCache = await extractPlasmicQueryData(
//     <PlasmicRootProvider
//       loader={PLASMIC}
//       prefetchedData={plasmicData}
//       pageRoute={pageMeta.path}
//       pageParams={pageMeta.params}
//     >
//       <PlasmicComponent component={pageMeta.displayName} />
//     </PlasmicRootProvider>
//   );

//   // Pass the data in as props.
//   return {
//     props: { plasmicData, queryCache },

//     // Using incremental static regeneration, will invalidate this page
//     // after 300s (no deploy webhooks needed)
//     revalidate: 300
//   };
// };

// /**
//  * Actually render the page!
//  */
// export default function CatchallPage(props: { plasmicData?: ComponentRenderData; queryCache?: Record<string, any> }) {
//   const { plasmicData, queryCache } = props;
//   const router = useRouter();
//   if (!plasmicData || plasmicData.entryCompMetas.length === 0) {
//     return <Error statusCode={404} />;
//   }
//   const pageMeta = plasmicData.entryCompMetas[0];
//   return (
//     // Pass in the data fetched in getStaticProps as prefetchedData
//     <PlasmicRootProvider
//       loader={PLASMIC}
//       prefetchedData={plasmicData}
//       prefetchedQueryData={queryCache}
//       pageRoute={pageMeta.path}
//       pageParams={pageMeta.params}
//       pageQuery={router.query}
//     >
//       {
//         // pageMeta.displayName contains the name of the component you fetched.
//       }
//       <PlasmicComponent component={pageMeta.displayName} />
//     </PlasmicRootProvider>
//   );
// }

// import * as React from "react";
// import {
//   PlasmicComponent,
//   extractPlasmicQueryData,
//   ComponentRenderData,
//   PlasmicRootProvider,
// } from "@plasmicapp/loader-nextjs";
// import type { GetStaticPaths, GetStaticProps } from "next";

// import Error from "next/error";
// import { useRouter } from "next/router";
// import { PLASMIC } from "@/plasmic-init";

// export default function PlasmicLoaderPage(props: {
//   plasmicData?: ComponentRenderData;
//   queryCache?: Record<string, unknown>;
// }) {
//   const { plasmicData, queryCache } = props;
//   const router = useRouter();
//   if (!plasmicData || plasmicData.entryCompMetas.length === 0) {
//     return <Error statusCode={404} />;
//   }
//   const pageMeta = plasmicData.entryCompMetas[0];
//   return (
//     <PlasmicRootProvider
//       loader={PLASMIC}
//       prefetchedData={plasmicData}
//       prefetchedQueryData={queryCache}
//       pageRoute={pageMeta.path}
//       pageParams={pageMeta.params}
//       pageQuery={router.query}
//     >
//       <PlasmicComponent component={pageMeta.displayName} />
//     </PlasmicRootProvider>
//   );
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//   const { catchall } = context.params ?? {};
//   const plasmicPath = typeof catchall === 'string' ? catchall : Array.isArray(catchall) ? `/${catchall.join('/')}` : '/';
//   const plasmicData = await PLASMIC.maybeFetchComponentData(plasmicPath);
//   if (!plasmicData) {
//     // non-Plasmic catch-all
//     return { props: {} };
//   }
//   const pageMeta = plasmicData.entryCompMetas[0];
//   // Cache the necessary data fetched for the page
//   const queryCache = await extractPlasmicQueryData(
//     <PlasmicRootProvider
//       loader={PLASMIC}
//       prefetchedData={plasmicData}
//       pageRoute={pageMeta.path}
//       pageParams={pageMeta.params}
//     >
//       <PlasmicComponent component={pageMeta.displayName} />
//     </PlasmicRootProvider>
//   );
//   // Use revalidate if you want incremental static regeneration
//   return { props: { plasmicData, queryCache }, revalidate: 60 };
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   const pageModules = await PLASMIC.fetchPages();
//   console.log(pageModules.map(p => p.path));
//   return {
//     paths: pageModules.map((mod) => ({
//       params: {
//         catchall: mod.path.substring(1).split("/"),
//       },
//     })),
//     fallback: "blocking",
//   };
// }


import * as React from "react";
import {
  PlasmicComponent,
  extractPlasmicQueryData,
  ComponentRenderData,
  PlasmicRootProvider,
} from "@plasmicapp/loader-nextjs";
// import type { GetStaticPaths, GetStaticProps } from "next";

import Error from "next/error";
import { useRouter } from "next/router";
// import { PLASMIC } from "@/plasmic-init";
import { getPlasmicLoader } from "@/plasmic-init";
// import {
//   loaderForProject1,
//   loaderForProject2,
// } from "@/plasmic-init";
import type { GetServerSideProps } from "next";


export default function PlasmicLoaderPage({
  plasmicData,
  queryCache,
  hostname,
}: {
  plasmicData?: ComponentRenderData;
  queryCache?: Record<string, unknown>;
  hostname: string;
}) {
  const router = useRouter();
  if (!plasmicData || plasmicData.entryCompMetas.length === 0) {
    return <Error statusCode={404} />;
  }
  const pageMeta = plasmicData.entryCompMetas[0];

  const loader = getPlasmicLoader(hostname);
    if (!loader) {
    return <Error statusCode={404} />;
    }


  return (
    <PlasmicRootProvider
      loader={loader}
      prefetchedData={plasmicData}
      prefetchedQueryData={queryCache}
      pageRoute={pageMeta.path}
      pageParams={pageMeta.params}
      pageQuery={router.query}
    >
      <PlasmicComponent component={pageMeta.displayName} />
    </PlasmicRootProvider>
  );
}



export const getServerSideProps: GetServerSideProps = async (context) => {
  const hostname = context.req.headers.host || "default";
  const loader = getPlasmicLoader(hostname);

  if (!loader) return { notFound: true };

  const { catchall } = context.params ?? {};
  const plasmicPath =
    typeof catchall === "string"
      ? catchall
      : Array.isArray(catchall)
      ? `/${catchall.join("/")}`
      : "/";

  const plasmicData = await loader.maybeFetchComponentData(plasmicPath);
  if (!plasmicData) return { notFound: true };

  const pageMeta = plasmicData.entryCompMetas[0];
  const queryCache = await extractPlasmicQueryData(
    <PlasmicRootProvider
      loader={loader}
      prefetchedData={plasmicData}
      pageRoute={pageMeta.path}
      pageParams={pageMeta.params}
    >
      <PlasmicComponent component={pageMeta.displayName} />
    </PlasmicRootProvider>
  );

  return {
    props: { plasmicData, queryCache, hostname },
  };
};



// export const getStaticPaths: GetStaticPaths = async () => {
//   const loaders = [loaderForProject1, loaderForProject2];

//   const allPages = await Promise.all(
//     loaders.map((loader) => loader.fetchPages())
//   );

//   const paths = allPages.flat().map((mod) => ({
//     params: {
//       catchall: mod.path.substring(1).split("/"),
//     },
//   }));

//   return {
//     paths,
//     fallback: "blocking",
//   };
// };

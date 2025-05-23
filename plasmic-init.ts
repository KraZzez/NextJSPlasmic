// import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
// import { HelloWorld } from "./components/HelloWorld";

// export const PLASMIC = initPlasmicLoader({
//   projects: [
//     {
//       id: "p78DEQcrtgwVzpDw219BSc",  // ID of a project you are using
//       token: "qCujJb55Iapl4LhXCGQtQ6NSvtLXkj4NTGrhjNbGi0ANf8v2zeyQ0JQwv0RPV1SLLFMiU7zLa48ZgW2qYboQ"  // API token for that project
//     }
//   ],
//   // Fetches the latest revisions, whether or not they were unpublished!
//   // Disable for production to ensure you render only published changes.
//   preview: true,
// });

// // const loaderForProject1 = initPlasmicLoader({
// //   projects: [
// //     {
// //       id: "p78DEQcrtgwVzpDw219BSc",
// //       token: "qCujJb55Iapl4LhXCGQtQ6NSvtLXkj4NTGrhjNbGi0ANf8v2zeyQ0JQwv0RPV1SLLFMiU7zLa48ZgW2qYboQ",
// //     },
// //   ],
// //   preview: true,
// // });

// // const loaderForProject2 = initPlasmicLoader({
// //   projects: [
//     // {
//     //     id: "cWW1dAhDokSbQz3tzbq99",
//     //     token: "oMyFiwJiZ0IlYcHE2K0yrg0jU1UNOpnTpfzYJOubaNFwJnYSBSVhYi3kiYm5v8Legyc4x34MFhv4Ya5oOtBitw"
//     // },
// //   ],
// //   preview: true,
// // });

// // // Export a function to select the right loader based on hostname
// // export function getPlasmicLoader(hostname) {
// //   if (hostname === "project1.example.com") {
// //     return loaderForProject1;
// //   } else if (hostname === "project2.example.com") {
// //     return loaderForProject2;
// //   }
// //   return null;
// // }

// PLASMIC.registerComponent(HelloWorld, {
//   name: 'HelloWorld',
//   props: {
//     verbose: 'boolean',
//     children: 'slot'
//   }
// });

import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { HelloWorld } from "./components/HelloWorld";
import SimpleComponent from "./components/SimpleComponent";

// Create a global Plasmic instance to register components on
export const PLASMIC = initPlasmicLoader({
  projects: [], // no projects here — loaders will be separate
  preview: true,
});



// Register your components globally once
// PLASMIC.registerComponent(HelloWorld, {
//   name: "HelloWorld",
//   props: {
//     verbose: "boolean",
//     children: "slot",
//   },
// });

// PLASMIC.registerComponent(SimpleComponent, {
//   name: "SimpleComponent",
//   props:{},
// });

// Create loaders for each project separately
export const loaderForProject1 = initPlasmicLoader({
  projects: [
    {
      id: "p78DEQcrtgwVzpDw219BSc",
      token: "qCujJb55Iapl4LhXCGQtQ6NSvtLXkj4NTGrhjNbGi0ANf8v2zeyQ0JQwv0RPV1SLLFMiU7zLa48ZgW2qYboQ",
    },
  ],
  preview: true,
});

export const loaderForProject2 = initPlasmicLoader({
  projects: [
    {
      id: "cWW1dAhDokSbQz3tzbq99",
      token: "oMyFiwJiZ0IlYcHE2K0yrg0jU1UNOpnTpfzYJOubaNFwJnYSBSVhYi3kiYm5v8Legyc4x34MFhv4Ya5oOtBitw",
    },
  ],
  preview: true,
});

function registerComponents(loader: ReturnType<typeof initPlasmicLoader>) {
  loader.registerComponent(HelloWorld, {
    name: "HelloWorld",
    props: {
      verbose: "boolean",
      children: "slot",
    },
  });
  loader.registerComponent(SimpleComponent, {
    name: "SimpleComponent",
    props: {},
  });
}

registerComponents(PLASMIC);
registerComponents(loaderForProject1);
registerComponents(loaderForProject2);

// Function to pick loader by hostname
export function getPlasmicLoader(hostname: string) {
  if (hostname === "next-js-plasmic.vercel.app") return loaderForProject1;
  if (hostname === "2ndnextjs-plasmic.vercel.app") return loaderForProject2;
//   if (hostname === "localhost:3001") return loaderForProject3;
  return null;
}

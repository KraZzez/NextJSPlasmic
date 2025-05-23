import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { HelloWorld } from "./components/HelloWorld";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "p78DEQcrtgwVzpDw219BSc",  // ID of a project you are using
      token: "qCujJb55Iapl4LhXCGQtQ6NSvtLXkj4NTGrhjNbGi0ANf8v2zeyQ0JQwv0RPV1SLLFMiU7zLa48ZgW2qYboQ"  // API token for that project
    }
  ],
  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published changes.
  preview: true,
});

PLASMIC.registerComponent(HelloWorld, {
  name: 'HelloWorld',
  props: {
    verbose: 'boolean',
    children: 'slot'
  }
});
import 'gatsby';
import { PageProps } from 'gatsby';

declare module 'gatsby' {
  export interface ExtendedWrapPageElementBrowserArgs<D = any, C = any>
    extends NodePluginArgs {
    element: React.ReactNode;
    props: PageProps<D, C>;
  }
}

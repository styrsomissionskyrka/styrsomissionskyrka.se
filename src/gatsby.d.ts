import 'gatsby';
import { Location, NavigateFn } from '@reach/router';

declare module 'gatsby' {
  export interface PageComponentProps<D = any, C = any> {
    path: string;
    '*': string;
    uri: string;
    location: Location;
    navigate: NavigateFn;
    children: undefined;
    pageResources: object;
    data: D;
    pageContext: C;
    pathContext: Record<string, unknown>;
  }
}

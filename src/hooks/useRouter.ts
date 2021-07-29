import { useMemo } from "react";
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import queryString from "query-string";

export default function useRouter() {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  return useMemo(() => {
    return {
      pushDetailPage: (path:string,params:object):void => {
      
        const keys = Object.keys(params);
        let url=path
        keys.map(v =>url= url.replace(`:${v}`,params[v]))

        history.push(url);
      },
      pushNewTab:(path:string):void=>{
        window.open(path, '_blank').focus();
      },
      pushDetailPageNewTab:(path:string,params:object):void=>{
        const keys = Object.keys(params);
        let url=path
        keys.map(v =>url= url.replace(`:${v}`,params[v]))
        window.open(url, '_blank').focus();
      },
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,

      query: {
        ...queryString.parse(location.search), // Convert string to object
        ...params,
      },
      match,
      location,
      history,
      pushCurrentWithParams: (params:object) => {
        history.push(`${location.pathname}?${queryString.stringify(params)}`);
      },
    };
  }, [params, match, location, history]);
}

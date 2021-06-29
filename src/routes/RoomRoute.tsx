import { Fragment, ComponentType } from 'react';
import { 
  Redirect,
  Route as DOMRoute,
  RouteProps as DOMRouteProps
} from 'react-router-dom';

import { useRoom } from '../hooks/useRoom';

interface RouteProps extends DOMRouteProps {
  isAdmin?: boolean;
  component: ComponentType<any>;
}

type ComputedMatch = {
  computedMatch: {
    isExact: boolean;
    params: {
      id: string;
    };
    path: string;
    url: string;
  }
}

// TODO: Fazer verificações se a sala existe ou se ja foi encerrada.
export function RoomRoute({ 
  isAdmin = false,
  component: Component,
  ...rest 
}: RouteProps) {
  const { computedMatch } = rest as ComputedMatch;
  const { params } = computedMatch;

  const { isLoading, isCurrentUserRoomAdmin } = useRoom(params.id);

  if (isLoading) {
    return <Fragment />;
  }

  return (
    <DOMRoute 
      {...rest}
      render={({ location }) => {
        return isAdmin === isCurrentUserRoomAdmin ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isAdmin 
                ? `/rooms/${params.id}` 
                : `/admin/rooms/${params.id}`,
              state: {
                from: location,
              }
            }}
          />
        )
      }}
    />
  );
}
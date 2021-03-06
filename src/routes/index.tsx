import { Route, Switch, useLocation } from 'react-router-dom';
import { AdminRoom } from '../pages/AdminRoom';

import { Home } from '../pages/Home';
import { NewRoom } from '../pages/NewRoom';
import { Room } from '../pages/Room';

import { RoomRoute } from './RoomRoute';

export const Routes = () => {
  const location = useLocation();

  return (
    <Switch location={location} key={location.key}>
      <Route path="/" exact component={Home} />
      <Route path="/rooms/new" component={NewRoom} />
      
      <RoomRoute path="/rooms/:id" component={Room} />
      <RoomRoute path="/admin/rooms/:id" component={AdminRoom} isAdmin />
    </Switch>
  );
}
import Home from "./components/home/Home";
import Auth from "./components/auth/Auth";
import Signup from "./components/signup/Signup";
import MeetingUp from "./components/meeting/MeetingUp";
import MeetingIn from "./components/meeting/MeetingIn";
import { Route, Switch } from "react-router-dom";
import Meeting from "./components/meeting/Meeting";
import MyCredential from "./components/my/MyCredential";
import MyDID from "./components/my/MyDID";
import MyVideos from "./components/my/MyVideos";
import MeetingCon from "./components/meeting/MeetingCon";
import My from "./components/my/My";
import Room from "./components/room/Room";

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/auth" exact component={Auth} />
      <Route path="/auth/meeting_in" component={MeetingIn} />
      <Route path="/auth/meeting_up" component={MeetingUp} />
      <Route path="/auth/meeting_con" component={MeetingCon} />
      <Route path="/auth/meeting" exact component={Meeting} />
      <Route path="/room/:roomID" component={Room} />
      <Route path="/my" exact component={My} />
      <Route path="/my/my_credential" component={MyCredential} />
      <Route path="/my/my_did" component={MyDID} />
      <Route path="/my/my_videos" component={MyVideos} />
      <Route
        render={({ location }) => (
          <div>
            <h2>이 페이지는 존재하지 않습니다</h2>
            <p>{location.pathname}</p>
          </div>
        )}
      />
    </Switch>
  );
};

import Home from "./components/home/Home";
import Auth from "./components/auth/Auth";
import Signup from "./components/signup/Signup";
import MeetingUp from "./components/meeting/MeetingUp";
import MeetingIn from "./components/meeting/MeetingIn";
import { Route, Switch } from "react-router-dom";
import MyCredential from "./components/my/MyCredential";
import MyDID from "./components/my/MyDID";
import MyVideos from "./components/my/MyVideos";
import MeetingCon from "./components/meeting/MeetingCon";
import My from "./components/my/My";
import Room from "./components/room/Room";
import OnRoute from "./OnRoute";
import OutRoute from "./OutRoute";
import MeetingDID from "./components/meeting/MeetingDID"

export const Routes = () => {

  return (
    <Switch>
        <OutRoute path="/" exact component={Home} />
        <OutRoute path="/signup" component={Signup} />
        <OnRoute path="/auth" exact component={Auth} />
        <OnRoute path="/auth/meeting_in" component={MeetingIn} />
        <OnRoute path="/auth/meeting_up" component={MeetingUp} />
        <OnRoute path="/auth/meeting_con" component={MeetingCon} />
        <OnRoute path="/room/:roomID" component={Room} />
        <OnRoute path="/my" exact component={My} />
        <OnRoute path="/my/my_credential" component={MyCredential} />
        <OnRoute path="/my/my_did" component={MyDID} />
        <OnRoute path="/my/my_videos" component={MyVideos} />
        <OnRoute path="/auth/meetingDID" component={MeetingDID}/>
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

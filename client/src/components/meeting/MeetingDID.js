import { useEffect } from "react"
import axios from "axios";
import { useHistory } from "react-router-dom";
import logo from "../../assets/img/star.png";
import lt from "../../assets/img/lacotaco.png";
import "./loading.css";

const MeetingDID = ({match, location}) => {
  const history = useHistory()
  const {username} = location.state;
  const {company} = location.state;
  const {department} = location.state;
  const { roomID } = match.params;
  const email = sessionStorage.getItem('user_email');
  useEffect(() => {
    axios.post(`https://boomdid.ml/nymdid`, {
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded',
      },
      email : email,
    }).then((res) => {
      if(res.data === "True"){
        if(sessionStorage.getItem('who_did') === "up"){
          var date = new Date();
          var year = date.getFullYear().toString();
          var month = ("0"+(date.getMonth() + 1)).slice(-2);
          var day = ("0"+date.getDate()).slice(-2);
          var hour = ("0"+date.getHours()).slice(-2);
          var minute = ("0"+date.getMinutes()).slice(-2);
          var second = ("0"+date.getSeconds()).slice(-2);
          var today = year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second
          axios.post(`https://server.boompro.ml/meetingUp`, {
            headers : {
              "Content-Type": 'application/x-www-form-urlencoded',
            },
            state: "create",
            path: roomID,
            company: company,
            department: department,
            today: today
          }).then((res) => {
            if(res.data.message==="createGood"){
              alert(`did 인증 성공! [${company} ${department}] 회의를 생성합니다.`)
              history.push({
                pathname:`/room/${roomID}`,
                state: {
                  username : username,
                }
              })
            }
          })
        }else if(sessionStorage.getItem('who_did')==='in'){
            axios.post(`https://server.boompro.ml/meetingIn`, {
            headers: {
              "Content-Type": 'application/x-www-form-urlencoded',
            },
            state : "meetingIn",
            path : roomID,
            email : email
            }).then((res) => {
              if(res.data.message === "satisfaction"){
                var roomCompany = res.data.company
                var roomDepartment = res.data.department
                alert(`did 인증 성공! [${roomCompany} ${roomDepartment}] 회의에 참가합니다.`)
                history.push({
                  pathname:`/room/${roomID}`,
                  state: {
                    username : username,
                  }
                })
              } else if(res.data.message === "dissatisfaction") {
                alert("회의 참가 조건에 맞지 않습니다. 홈으로 이동합니다.")  
                history.push('/auth')
              }
            }).catch((error) => {
              console.log("미팅 생성 오류 : "+error)
            }) 
        } 
      }else{
        alert('did 인증 실패! 홈으로 돌아갑니다.')
        history.push('/auth')
      }
    }).catch((error) => {
        console.log("오류 : "+error)
      })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={lt} className="lt" alt="logo"></img>
        <br />
        <br />
        <br />
        <br />
        <p>
          <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
          DID 인증 요청 중입니다.
          <br />
          BOOM!
        </p>
      </header>
    </div>
  );
};
export default MeetingDID
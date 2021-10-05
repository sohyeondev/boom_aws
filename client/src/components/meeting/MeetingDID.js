import { useEffect } from "react"
import axios from "axios";
import { useHistory } from "react-router-dom";

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
          alert(`did 인증 성공! [${company} ${department}] 회의를 생성합니다.`)
          history.push({
            pathname:`/room/${roomID}`,
            state: {
              username : username,
            }
          })
        }else{
            axios.post(`https://server.boompro.ml/meetingIn`, {
            headers: {
              "Content-Type": 'application/x-www-form-urlencoded',
            },
            state : "meetingIn",
            email : sessionStorage.getItem('user_email'),
            company : company,
            department : department
            }).then((res) => {
              if(res.data.message === "satisfaction"){
                alert(`did 인증 성공! [${company} ${department}] 회의에 참가합니다.`)
                sessionStorage.setItem('who_did', 'in')
                history.push({
                  pathname:`/room/${roomID}`,
                  state: {
                    username : username,
                  }
                })
              } else if(res.data.message = "dissatisfaction") {
                alert("회의 참가 조건에 맞지 않습니다.")  
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
  }, [username]);

  return (
    <div>로딩중</div>
  )
};
export default MeetingDID
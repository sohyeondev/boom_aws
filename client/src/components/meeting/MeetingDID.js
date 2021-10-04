import { useEffect } from "react"
import { v1 as uuid } from "uuid";
import axios from "axios";
import { useHistory } from "react-router-dom";

const MeetingDID = ({location}) => {
  const id = uuid();
  const {username} = location.state;
  console.log(username)
  const history = useHistory()

  useEffect(() => {
    history.push({
      pathname:`/room/${id}`,
      state: {
        username : username,
      }
    })

/*    axios.post(`https://boomdid.ml/nymdid`, {
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded',
      },
      email : sessionStorage.getItem('user_email'),
    }).then((res) => {
*/
      axios.post(`https://server.boompro.ml/meetingUp`, {
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded',
        },
        state : "meetingUp",
        email : sessionStorage.getItem('user_email')
      }).then((res) => {
        console.log(res.data)
      }).catch((error) => {
        console.log("회사 및 부서 확인 오류 : "+error)
      })
/*
      if(res.data === "True") {
        alert("did 인증 성공! 회의를 생성합니다.")
        history.push({
          pathname:`/room/${id}`,
          state: {
            username : username
          }
        })
      }
      else {
        alert("did 인증 실패! 홈으로 돌아갑니다.")
        window.location.href = 'https://boompro.ml/auth'
      }
    }).catch((error) => {
      console.log("미팅 생성 오류 : "+error)
    }) 
  */
  }, [id, username]);
  return (
    <div>로딩중</div>
  )
};
export default MeetingDID
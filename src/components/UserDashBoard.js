import { useSelector } from "react-redux";
function UserDashBoard(){
    let {userObj}=useSelector((state)=>state.userData)
    return(
        <>
        <div className="text-center userdashboard">
            <h2>User Profile</h2>
            <hr className="container" />
            <div className="row mt-3">
            <div className="mt-2 col-sm-5">
            <img src={userObj.photo} alt="" className="profile-pic mt-3" width="150px" height="150px"/>
            <div className="username mt-3">
                <b>Username : {userObj.username}</b>
            </div>
            <div className="email mt-3">
                <b>Email : {userObj.email}</b>
            </div>
            </div>
            <div className="col-sm-5 text-center">
                <h2>Game History</h2>
                <table className="table mx-auto">
                    <thead>
                        <tr>
                            <th>Player-1</th>
                            <th>Player-2</th>
                            <th>Winner</th>
                        </tr>
                    </thead>
                    <tbody>{
                        userObj.playHistory.map((obj,indx)=>
                        <tr key={indx}>
                            <td>{obj.player1}</td>
                            <td>{obj.player2}</td>
                            <td>{obj.won=="X" ? obj.player1:obj.player2}</td>
                        </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
            </div>
        </div>
        </>
    )
}
export default UserDashBoard;
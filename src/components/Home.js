import img1 from "../Images/img-1.jpg"
function Home(){
    return(
        <>
        <div>
            <h1 className="mainHeading text-center mt-3">Welcome to Tic-Tac-Toe</h1>
        </div>
        <div className="row text-center justify-content-around m-5">
            <div className="col-lg-6 text-center">
                <img src={img1} alt="" className="w-75 rounded" />
            </div>
            <div className="col-lg-6 text-center">
                <h3 className="mainHeading">Have Fun</h3>
                <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia quod, quaerat mollitia, omnis ea iste maiores dicta earum debitis impedit fugiat quibusdam iure quos eveniet aut quas. Quia unde vitae provident modi dicta, veniam natus obcaecati assumenda ea commodi dolorum id saepe aut, deleniti eum quasi a ipsum eveniet rerum?</p>
            </div>
        </div>
        </>
    )
}
export default Home;
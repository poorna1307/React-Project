import img1 from "../Images/img-1.jpg"
function Home(){
    return(
        <>
        <div>
            <h1 className="mainHeading text-center mt-3">Welcome to Tic-Tac-Toe</h1>
        </div>
        <div className="row text-center justify-content-around m-5">
            <div className="col-lg-6 text-center p-5">
                <img src={img1} alt="" className="w-75 rounded" />
            </div>
            <div className="col-lg-6 text-center">
                <h3 className="mainHeading">Have Fun</h3>
                <pre className="lead">Tic-Tac-Toe is a simple and fun game for 2 players, X and O. It is played on a 3x3 grid. Each player's goal is to make 3 in a row.

Typically, X starts first, but in Gametable's Tabletop Tic Tac Toe, Player 1 starts first on the first game and Player 2 (or the computer) starts first on the next game. The starting player continues to alternate from game to game. This helps keep gameplay fair over time.

Players take turns placing their Mark, X or O, on an open square in the grid. The first player to make 3 of their own mark in a row vertically, horizontally, or diagonally wins the game.

If all 9 squares are filled and neither player has 3 in a row, the game is considered a Tie.

The expert artificial intelligence (AI) will play a perfect game. Try your best to Tie it for as long as you can! </pre>
            </div>
        </div>
        </>
    )
}
export default Home;
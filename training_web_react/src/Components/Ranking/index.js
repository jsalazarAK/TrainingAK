import './Ranking.sass'

const RankingTable = (props) => {
    return ( 
        <table>
            <thead>
                <tr>
                    <th>Player Name</th>
                    <th>Player Score</th>
                </tr>
            </thead>
            <tbody>
                {props.rankingValue.map((value,index)=>
                <tr key={index}>
                    <td>{value.playerName}</td>
                    <td>{value.playerScore}</td>
                </tr>
                )}
            </tbody>
        </table>
     );
}
 
export default RankingTable;
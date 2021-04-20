const game = new Game();
game.initialize();

function Game() {
    
    const PLAYER_LABEL = "Player";
    const SCORE_LABEL = "Score";
    const RANKING_LABEL = "Ranking";
    const NEW_LEVEL = 5; // AMOUNT OF POINTS NEEDED TO INCREASE YOUR LEVEL
    const SPEED_REDUCTION = 0.05; // MORE LVL
    const GAME_TIME = 20000; //time on miliseconds

    const holes = document.querySelectorAll('.hole');
    const scoreBoard = document.querySelector('.score');
    const PlayerName = document.getElementById('playerName');
    const ButtonStart = document.getElementById('button');
    const levelBoard = document.querySelector('.level');
    const audioFailure = document.querySelector('audio[data-key="fail"]');
    const audioSuccess = document.querySelector('audio[data-key="success"]');
    const moles = document.querySelectorAll('.mole');
    const minPeepTime = 500;
    const maxPeepTime = 1300;

    let lastHole;
    let timeUp = true;
    let score = 0;
    let actualLevel = 0;
    let ranking = [
        {[PLAYER_LABEL]:"Anonymous",[SCORE_LABEL]:0},
        {[PLAYER_LABEL]:"Anonymous",[SCORE_LABEL]:0},
        {[PLAYER_LABEL]:"Anonymous",[SCORE_LABEL]:0},
        {[PLAYER_LABEL]:"Anonymous",[SCORE_LABEL]:0},
        {[PLAYER_LABEL]:"Anonymous",[SCORE_LABEL]:0}
    ]

    this.initialize = () => {
        moles.forEach(mole => mole.addEventListener('click', this.bonk));
        holes.forEach(hole => hole.addEventListener('click', this.fail));
        var data = window.localStorage.getItem(RANKING_LABEL);
        if(data!=null){
            ranking = JSON.parse(data);
        }
        this.updateData(ranking);
    }

    this.randomTime = (min, max,) => {
        let percent = 1-SPEED_REDUCTION*actualLevel;
        if(percent<0){
            percent=0;
        }
        //Set new min / max value
        min=min*percent;
        max=max*percent;

        return Math.round(Math.random() * (max - min) + min);
    }

    this.randomHole = holes => {
        const idx = Math.floor(Math.random() * holes.length);
        const hole = holes[idx];
        if (hole === lastHole) return this.randomHole(holes);
        lastHole = hole;
        return hole;
    }

    this.peep = () => {
        const time = this.randomTime(minPeepTime, maxPeepTime);
        const hole = this.randomHole(holes);
        hole.classList.add('up');
        setTimeout(() => {
            hole.classList.remove('up');
            if (!timeUp) this.peep();
        }, time);
    }

    this.startGame = () => {
        scoreBoard.textContent = 0;
        actualLevel = 0;
        levelBoard.textContent = actualLevel+1;
        ButtonStart.disabled=true;
        PlayerName.disabled=true;

        timeUp = false;
        score = 0;
        this.peep();
        setTimeout(() => {
            timeUp = true;
            this.updateRanking();
            ButtonStart.disabled=false;
            PlayerName.disabled=false;
        
        }, GAME_TIME)
    }

    this.bonk = e => {
        
        
        if (!e.isTrusted){
            return;
        } 
        e.stopPropagation();
        audioSuccess.currentTime=0;
        audioSuccess.play();
        score++;
        if(score%NEW_LEVEL==0){
            actualLevel++;
        }
        e.target.classList.remove('up');
        scoreBoard.textContent = score;
        levelBoard.textContent = actualLevel+1;
    }

    this.fail = e => {
        console.log("fail")
        if (!e.isTrusted){
            
            return;
        } 
        if(!timeUp){
            audioFailure.currentTime=0;
            audioFailure.play();
        }
        
        
    }

    this.updateRanking=()=>{
        for (var index = 0; index < ranking.length; index++) {
                if( ranking[index][SCORE_LABEL] <score){
                    let playerNameTmp = PlayerName.value;
                    if(playerNameTmp==""){
                        playerNameTmp="Anonymous";
                    }
                    ranking.splice(index,0,{[PLAYER_LABEL]:playerNameTmp,[SCORE_LABEL]:score});
                    ranking.splice(ranking.length-1,1);
                    break;
                }
        }
        this.updateData(ranking);
    }

    this.updateData=(data)=>{
          // EXTRACT VALUE FOR HTML HEADER. 
        // ('PLAYER, 'SCORE')
        window.localStorage.setItem(RANKING_LABEL,JSON.stringify(data));

        var col = [];
        for (var index = 0; index < data.length; index++) {
            for (var key in data[index]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var index = 0; index < col.length; index++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[index];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var index = 0; index < data.length; index++) {

            tr = table.insertRow(-1);

            for (var matrix = 0; matrix < col.length; matrix++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = data[index][col[matrix]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }

    
}



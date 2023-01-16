const boardRegions = document.querySelectorAll('#gameBoard span') //selecionando todas regioes.
let vBoard = []                                                   //tabuileiro virtual, pra fazer as verificações se o jogador ganhou e etc
let turnPlayer = ''                                               //jogador da vez, depois vou alternar pra "player1, player2"

function updateTitle() {  //Essa funcao vai servir pra mostrar nome na tela do jogador da vez.
    const playerInput = document.getElementById(turnPlayer)     
    document.getElementById('turnPlayer').innerText = playerInput.value   //texto que a pessoa usou para o nome do jogador
}

function initializeGame() {  //Botao para inicializar o jogo, como se fosse uma preparação para o jogo comecar  
    vBoard = [['', '', ''], ['', '', ''], ['', '', '']]   //Para mostrar a situacao do nosso tabueleiro no console, com tres linhas e tres colunas, e para verificar se o jogador venceu
    turnPlayer = 'player1'
    document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>' //Quando o jogo terminar vou modificar esse html, pra mostra uma mensagem de vencedor, e sempre que o jogo recomeçar ele exibi esse valor. 
    updateTitle()  //Vai pegar o player1 e vai exibir na tela 
    boardRegions.forEach(function(element){    //Pegar todos spans 
        element.classList.remove('win')       //Se algum jogo já tiver sido jogado e tiver acontecido uma vioria, vou garantir que o tabuleiro vai estar limpo 
        element.innerText = ''                //Remover os textos "O", "X"
        element.classList.add('cursor-pointer')
        element.addEventListener('click', handleBoardClick) //Quando clicarmos na regiao ele tem que marcar um "X, O" de acordo com o jogador da vez
    })
}

function disableRegion(element) {  //Nao vai dar pra clicar denovo
     element.classList.remove('cursor-pointer')
     element.removeEventListener('click', handleBoardClick) //Para nao clicar mais de uma vez
} 

function handleWin(regions) {
    regions.forEach(function(region){
       document.querySelector('[data-region="' + region + '"]').classList.add('win')
   })
   const playerName = document.getElementById(turnPlayer).value
   document.querySelector('h2').innerHTML = playerName + ' venceu!'  
}

function handleBoardClick(ev) {  //Essa funcao vai servir pra quando o jogador clicar na regiao do tabuleiro
    const span =  ev.currentTarget
    const region = span.dataset.region      //N.N          //quem é o currentTarget desse evento?  o span, pq foi ele que acionou o evento, estou pegando o atributo data de cada span
    const rowCollumnPair = region.split('.')           //split ["N", "N"], par, linha, coluna, ele vai quebra quele ponto N.N                     
    const row = rowCollumnPair[0]                    //Linha
    const column = rowCollumnPair[1]                 //Coluna
    if(turnPlayer === "player1"){                   
        span.innerText = 'X'        //o span
        vBoard[row][column] = 'X'
    } else {
        span.innerText = 'O'
        vBoard[row][column] = 'O'
    }
    console.clear()  //Limpar sempre que ele chegar aqui 
    console.table(vBoard)   //pra mostra uma tabela 
    disableRegion(span)   //pra nao clicar varias vezes na mesma area 
    const winRegions = getWinRegions()   //Regioes vitoriosas, a fileira de tres. array com as posicoes que o jogador usou pra vencer
    if(winRegions.length > 0 ) { //Se a lenght(comprimento) for maior que 0 nossa funcao retornou, ou seja que dizer que ele venceu 
        handleWin(winRegions) //tratar a vitoria, passar pra dentro da function quais foram as regioes usadas para vencer
    } else if (vBoard.flat().includes('')) { //O flat vai pegar o array vboard, que sao array bidimensionais e vai transformar em um só, e se esse flat incluir um espaço vazio que dizer que ainda tem uma regiao nao marcada  
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1' // Se turnplay for igual ao play1 vou atribuir play2, se nao vou atribuir play1. entao quando for play1 ele transforma no play2 quando for play2 ele transforma no play1
        updateTitle() //Chamando denovo a funcao para atualizar o titulo, vai mostrar a vez do jogador1, ou 2
    } else {
        document.querySelector('h2').innerHTML = 'Empate!'  //se ngm vencer, estou usando o innerhtml para remover totalmente o conteudo dentro dele 
    }
}

function getWinRegions() {  //ver todas possibilidades de vitoria
    const winRegions = []   //Se o jogador nao tiver vencido, isso vai ser um array vazio, mas se ele vencer vou devolver onde ele venceu 
   if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])  //Vai ver se o valor é o mesmo em cada coluna e ele nao esta vazio, x ou o 
    winRegions.push("0.0", "0.1", "0.2") //Ele vai dar um push no array com as posicoes que aquele jogador usou pra vencer 
   if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
    winRegions.push("1.0", "1.1", "1.2")
   if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
    winRegions.push("2.0", "2.1", "2.2")
   if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
    winRegions.push("0.0", "1.0", "2.0")
   if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
    winRegions.push("0.1", "1.1", "2.1")
   if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
    winRegions.push("0.2", "1.2", "2.2")
   if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
    winRegions.push("0.0", "1.1", "2.2")
   if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
    winRegions.push("0.2", "1.1", "2.0")
    return winRegions  //Se o jogador venceu em algumas dessas posicoes, elas vao estar salvas dentro dessa variavel
}

 
document.getElementById('start').addEventListener('click', initializeGame)
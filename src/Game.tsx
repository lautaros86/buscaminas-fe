import React, {useEffect, useState} from 'react';
import './Game.css';
import apiApplication from "./services/GameService";

const Game = () => {
    const [game, setGame] = useState<any>(null);
    const [code, setCode] = useState<string>('');
    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)
    const [mines, setMines] = useState<number>(0)
    const cantMines = 5;
    const cantFlags = 5;
    useEffect(() => {
    }, [])

    const loadGame = (manualCode: string) => {
        if(!manualCode) return false
        apiApplication.services
            .loadGame(manualCode)
            .then((response: any) => {
                setGame(response.data.game);
                setCode(response.data.game.code);
            })
            .catch((error: any) => {
                console.error(
                    "No se pudo cargar el juego"
                );
            })
    }

    const newGame = (x: number, y: number, mines: number) => {
        apiApplication.services
            .newGame(x, y, mines)
            .then((response: any) => {
                console.log(response.data)
                setGame(response.data.game);
            })
            .catch((error: any) => {
                console.error(
                    "No se pudo cargar el juego"
                );
            })
    }

    const actionCell = (x: number, y: number, e: any) => {
        e.preventDefault();
        if(game.finished || game.board[x][y] !== '#') {
            return;
        }
        apiApplication.services
            .clickCell(x, y, game.code)
            .then((response: any) => {
                setGame(response.data.game);
            })
            .catch((error: any) => {
                console.error(
                    "No se pudo cargar el juego"
                );
            })
    }

    const putFlag = (x: number, y: number, e: any) => {
        e.preventDefault();
        if(game.finished || (game.board[x][y] !== '#' && game.board[x][y] !== 'F')) return false;
        apiApplication.services
            .toogleFlag(x, y, game.code)
            .then((response: any) => {
                setGame(response.data.game);
            })
            .catch((error: any) => {
                console.error(
                    "No se pudo cargar el juego"
                );
            })
    }

    const getIcon = (x: number, y: number) => {
        let icon = game.board[x][y]
        switch (icon) {
            case '!':
                icon = '*';
                break;
            case 'F':
                icon = 'F';
                break;
            case ' ':
                icon = ' ';
                break;
            case '#':
                icon = '#';
                break;
        }
        return icon;
    }
    const generateBoard = () => {
        return (
            game?.board?.map((col: [], x: number) => {
                return (
                    <div key={x} className={'flex-container'}>
                        {
                            col.map((cell: string, y: number) => {
                                return (<button key={y}
                                                onContextMenu={(e) => putFlag(x, y, e)}
                                                onClick={(event) => actionCell(x, y, event)}
                                                className={'flex-item'}>{getIcon(x, y)}</button>)
                            })
                        }
                    </div>
                )
            })
        );
    }

    return (
        <>
            <div className={'container'}>
                <div className={'options'}>
                    <div>
                        <span>Codigo: <input value={code}  onChange={event => setCode(event.target.value)}/></span>
                        <span><button onClick={() => loadGame(code)}>Cargar</button></span>
                    </div>
                    <div>
                        <span><button onClick={() => newGame(10, 10, 10)}>LVL 1</button></span>
                        <span><button onClick={() => newGame(20, 30, 30)}>LVL 2</button></span>
                        <span><button onClick={() => newGame(40, 100, 50)}>LVL 3</button></span>
                    </div>
                    <span>alto:  <input value={x} type="number" onChange={(event) => setX(+event.target.value)}/></span>
                    <span>ancho: <input value={y} type="number" onChange={(event) => setY(+event.target.value)}/></span>
                    <span>minas: <input value={mines} type="number" onChange={(event) => setMines(+event.target.value)}/></span>
                    <span><button onClick={() => newGame(x, y, mines)}>Custom</button></span>
                </div>
                <div className={'board'}>
                    <div className={'data'}>
                        <span>Codigo: { game ? game.code : ''}</span>
                        <span>Estado: { game?.status}</span>
                        <span>Cant. Banderas: {cantFlags}</span>
                        <span>Cant. Bombas: {cantMines}</span>
                    </div>
                    {generateBoard()}
                </div>
            </div>
        </>

    );
}

export default Game;

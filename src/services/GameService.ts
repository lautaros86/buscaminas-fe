import axios from 'axios';

const baseUrl: string = 'https://powerful-lowlands-28742.herokuapp.com/api/games/'

const GameServices = () => {

    const newGame = (x: number, y: number, mines: number) =>
        axios.post(`${baseUrl}newGame/`, {x, y, mines});

    const clickCell = (x: number, y: number, code: string) =>
        axios.post(`${baseUrl}clickCell/`, {x, y, code});

    const toogleFlag = (x: number, y: number, code: string) =>
        axios.post(`${baseUrl}toogleFlag/`, {x, y, code});

    const loadGame = (code: string) =>
        axios.get(`${baseUrl}getGame/${code}`);

    return {
        newGame,
        clickCell,
        toogleFlag,
        loadGame,
    };
}

const apiGame = {
    services: GameServices(),
}
export default apiGame;

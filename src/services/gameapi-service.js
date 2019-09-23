export default class GameapiService {
  getData = async (id) => {
    const data = JSON.parse(localStorage.getItem(id));
    return data
  }

  setData = (id, state) => {
    localStorage.setItem(id, JSON.stringify(state))
  }
  
  getGameList = async () => {
    const gameList = []

    if(localStorage) {
      for(let [key, value] of Object.entries(localStorage)) {
        gameList[gameList.length] = JSON.parse(value)
      }
    }
  
    return gameList
  }

  removeGame = (id) => {
    return localStorage.removeItem(id)
  }
}

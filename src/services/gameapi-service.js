export default class GameapiService {
  getData = async (id) => {
    const data = JSON.parse(localStorage.getItem(id));
    return data
  }

  setData = async (id, state) => {
    localStorage.setItem(id, JSON.stringify(state))
    return id
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
}
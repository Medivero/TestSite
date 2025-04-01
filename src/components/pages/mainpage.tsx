import {useState } from "react";
import getApiData from "../utilits/getApiData";
import Header from "../elements/header";
import FindUser from "../utilits/findUser";

interface User {
  address: {
    city: string;
  };
  email: string;
  name: string;
  phone: string;
  website: string;
  username: string;
}
const sortNames = [
    {
        sortName: 'Отсортировать по имени A-B',
        state: 0
    },
    {
        sortName: 'Отсортировать по имени B-A',
        state: 1
    },
    {
        sortName: 'Отсортировать по городу A-B',
        state: 2
    },
    {
        sortName: 'Отсортировать по городу B-A',
        state: 3
    },

]
function SortByAName(
  data: User[],
  setData: Function,
  StateOfSort: number,
  setStateOfSort: Function
) {
  let ProtoData = [...data];
  if (StateOfSort === 0) {
    ProtoData = ProtoData.sort((a, b) => {
      return a.name.toString() > b.name.toString() ? 1 : -1;
    });
    setStateOfSort(StateOfSort+1);
  }
  else if (StateOfSort === 1){
    ProtoData = ProtoData.sort((a,b) => {
        return a.name.toString() < b.name.toString() ? 1 : -1;
    })
    setStateOfSort(StateOfSort+1);
  }
  else if (StateOfSort === 2){
    ProtoData = ProtoData.sort((a,b) => {
        return a.address.city.toString() > b.address.city.toString() ? 1 : -1;
    })
    setStateOfSort(StateOfSort+1);
  }
  else if (StateOfSort === 3){
    ProtoData = ProtoData.sort((a,b) => {
        return a.address.city.toString() < b.address.city.toString() ? 1 : -1;
    })
    setStateOfSort(0);
  }
  setData(ProtoData);
}
function MainPage() {
  const [StateOfSort, setStateOfSort] = useState(0);
  const [GoodIndexes,setGoodIndex] = useState<Number[]>([]);
  const [data, setData] = useState<User[]>([]);
  const getData = async () => {
    const users: User[] = await getApiData();
    if (users === null){
        setData(
            [
                {
                    name: 'Ошибка при получении данных',
                    address: {
                        city: ""
                    },
                    email: "",
                    phone: "",
                    website: "",
                    username: ""
                }
            ]
        )
    }
    else{
        await setData(users);
    }
  };
  const ReadInput = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let readName = (event.currentTarget.someName as HTMLInputElement).value;
    setGoodIndex(FindUser(data,readName))
    if (readName === ''){
        setGoodIndex([]);
    }
  }

  return (
    <>
      <Header />
      <div className="w-[100%] p-[30px]">
        <div className="w-[100%] border border-solid min-h-[500px] rounded bg-gray-200 p-[20px]">
          <span className="border border-solid text-[25px] p-[10px] rounded">
            Список пользователей
          </span>
          <div className="mt-[20px] flex gap-[20px] flex-wrap">
            <button
              onClick={() => getData()}
              className="border border-solid text-[15px] hover:bg-gray-300 p-[5px] h-[50px] cursor-pointer rounded"
            >
              Загрузить данные
            </button>
            <button
              onClick={() =>
                SortByAName(data, setData, StateOfSort, setStateOfSort)
              }
              className={`${data.length === 0 ? 'w-[0px]' : 'w-[200px] border border-solid'} h-[50px] overflow-hidden transition-all no-wrap duration-300 text-[15px] hover:bg-gray-300 cursor-pointer rounded`}
            >
              {sortNames[StateOfSort].sortName}
            </button>
            <form className="flex gap-[10px] w-full sm:w-auto flex-wrap" onSubmit={ReadInput} action="">
                <input name="someName" className={`bg-white ${data.length === 0 ? 'w-[0px]' : 'w-[300px]'} transition-all duration-300 h-[50px] text-[20px] rounded`} placeholder="Поиск пользователя"></input>
                <button className={` cursor-pointer overflow-hidden hover:bg-gray-300 ${data.length === 0 ? 'w-[0px]' : 'w-[100px] border border-solid'} transition-all duration-300`} type="submit">Поиск</button>
            </form>
          </div>
          <div className="flex mt-[20px] flex-wrap gap-[10px]">
            {Object.values(data).map((User, index) => (
              <div
                key={index}
                className={`transition-all ${GoodIndexes.length !== 0 ? (GoodIndexes.includes(index) ? '' : 'hidden') :''} border border-solid flex flex-col p-[20px] w-[300px] bg-gray-700 text-white shadow-lg rounded`}
              >
                <span>Имя: {User.name}</span>
                <span>Город: {User.address.city}</span>
                <span>Email: {User.email}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default MainPage;

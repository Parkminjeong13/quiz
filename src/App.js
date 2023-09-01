import logo from './logo.svg';
import './App.css';
import Main from './pages/Main';
import Detail from './pages/Detail';
import { Route, Routes } from 'react-router-dom';

import {useEffect, useState} from 'react';
import QuizList from './components/QuizList';



function App() {

  
  const [userName, setUserName] = useState("홍길동");
  const [quizList, setQuizList] = useState(QuizList);
  const quiz = [...QuizList]
  const [selected, setSelected] = useState(3);
  const [quizCnt, setQuizCnt] = useState(QuizList.length);
  const [typeTxt, setTypetxt] = useState("전체");

  const ChangeEvent = (data) =>{
    const classValue = data.target.className;
    const dataValue = data.target.value;
    switch(true){
      // includes("값") > 해당 문자열이 있는지 체크
      case classValue.includes("name") :
        setUserName(dataValue)
      break;
      case classValue.includes("random") :
        
        (dataValue === "1" ? setQuizList([...quizList].sort(()=>{
          return Math.random() - 0.5}).slice(0, selected)
          // 0 ~ 1사이의 값을 반환 > 0.5의 평균값을 얻게 되어 -0.5 ~ 0.5값으로 랜덤 출력
        )
        : setQuizList([...quizList]).slice(0, selected))
        
      break;
      case classValue.includes("cnt") :
        setSelected(dataValue);
      break;
      case classValue.includes("type") :
        (dataValue === "전체"
        ?
        setQuizList([...QuizList].slice(0, selected))
        :
        setQuizList([...QuizList].filter((e)=>{
          return e.type === dataValue
        }).slice(0, selected))
        )
        setTypetxt(dataValue)
        
      break;
      default:
      console.log("데이터가 없습니다.")
    }

  }

  

  useEffect(()=>{
    setQuizList([...QuizList].slice(0, selected));
    setQuizCnt([...QuizList].filter((e)=>{
      return typeTxt === "전체" ? true : e.type === typeTxt;
    }).length);
  },[typeTxt, selected])

  console.log(quizList)

  return (
    <>
      <Routes>
        <Route path="/" element={<Main ChangeEvent={ChangeEvent} userName={userName} quiz={quiz} selected={selected} quizList={quizList} quizCnt={quizCnt} />} />
        <Route path="/quiz" element={<Detail quizList={quizList} userName={userName} />}/>
      </Routes>
    </>
  );
}

export default App;

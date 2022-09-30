import React, { useState, useEffect } from "react";
import { db } from "./utils/firebase.js";
import { collection, getDocs, query, where, doc, deleteDoc } from "firebase/firestore";

import "./findQuestion.css"
let flag = 1;

function FindQuestion() {
  const [questions, setQuestions] = useState([]);
  const [filterInfo, setFilterInfo] = useState("");

  useEffect(() => {
    if (flag) {
      const Q_A = collection(db, "Q_A");
      let questions = [];

      const q = query(Q_A, where("type", "==", 0));
      getDocs(q).then(result => {
        result.docs.forEach(doc => {
          const obj = {};
          let val = doc._document.data.value.mapValue.fields;
          obj.id = doc.id;
          obj.title = val.title.stringValue;
          obj.describe = val.describe.stringValue;
          obj.tags = val.tags.arrayValue.values.map(item => item.stringValue);
          obj.date = val.date.stringValue;
          obj.isHide = true;
          questions.push(obj);
        })
        flag = 0;
        setQuestions(questions);
      }).catch(error => { });
    }
  })

  function dragStart(event) {
    event.dataTransfer.setData("id", event.target.id);
  }

  function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function drop(event) {
    event.preventDefault();
    let element = document.getElementById(event.dataTransfer.getData("id"));
    event.target.appendChild(element);
  }

  function filterOut() {
    const Q_A = collection(db, "Q_A");
    let questions = [];

    const q1 = query(Q_A, where("type", "==", 0), where("title", "==", filterInfo));
    const q2 = query(Q_A, where("type", "==", 0), where("tags", "array-contains", filterInfo));
    const q3 = query(Q_A, where("type", "==", 0), where("date", "==", filterInfo));

    Promise.allSettled([q1, q2, q3].map(q => getDocs(q)))
      .then(result => {
        result.forEach(item => {
          if (item.value.docs) {
            item.value.docs.forEach(doc => {
              const obj = {};
              let val = doc._document.data.value.mapValue.fields;
              obj.id = doc.id;
              obj.title = val.title.stringValue;
              obj.describe = val.describe.stringValue;
              obj.tags = val.tags.arrayValue.values.map(item => item.stringValue);
              obj.date = val.date.stringValue;
              obj.isHide = true;
              questions.push(obj);
            })
          }
        })
        setQuestions(questions.slice());
      }).catch(error => { })
  }

  function deleteQuestion(id) {
    deleteDoc(doc(db, "Q_A", id)).then(result => {
      alert("delete question Success!");
      filterOut();
    }).catch(error => {
      alert("delete question Fail!");
    })
  }

  return (
    <div className="find-question">
      <div className="find-box">
        <input value={filterInfo} onChange={e => { setFilterInfo(e.target.value) }} type="text" placeholder="please input title,tag or date to find question." />
        <button onClick={() => { filterOut() }}>filter out</button>
      </div>
      <div className="questions-box" onDragOver={(e) => { dragOver(e) }} onDrop={(e) => { drop(e) }} >
        {
          questions.map((question, index) => {
            return (
              <div id={question.title} className="question-item" key={Date.now() + question.describe + question.tags.join("-")} draggable onDragStart={(e) => { dragStart(e) }}>
                <h3 onClick={() => { questions[index].isHide = false; setQuestions(questions.slice()); }}>{question.title}</h3>
                {question.isHide === false &&
                  <div>
                    <div>describe:&nbsp;&nbsp;{question.describe}</div>
                    <div>tags:&nbsp;&nbsp;{question.tags.join(",")}</div>
                    <div>date:&nbsp;&nbsp;{question.date}</div>
                    <span onClick={() => { questions[index].isHide = true; setQuestions(questions.slice()); }} style={{ "textDecoration": "underline", cursor: "pointer" }}>hide</span>
                    <span onClick={() => { deleteQuestion(question.id) }} style={{ "textDecoration": "underline", color: "red", marginLeft: "10px", cursor: "pointer" }}>delete</span>
                  </div>
                }
              </div>
            )
          })
        }
      </div>
    </div >
  );
}

export default FindQuestion;

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCSp1ElBGyTK40xyyCq2pPi1sJYcEKO6wQ",
  authDomain: "paper-planes-web-app.firebaseapp.com",
  databaseURL: "https://paper-planes-web-app-default-rtdb.firebaseio.com",
  projectId: "paper-planes-web-app",
  storageBucket: "paper-planes-web-app.appspot.com",
  messagingSenderId: "990779945627",
  appId: "1:990779945627:web:817cbd92b1ad4dadb1cc3e",
};

const app = initializeApp(firebaseConfig);

const db = getDatabase();

export function storeData(name, score, user) {
  set(ref(db, "leaderboard/" + user), {
    name: name,
    score: score,
  });
}

export function getData(users) {
  const scores = ref(db, "leaderboard/" + users);
  onValue(scores, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    return data;
  });
}

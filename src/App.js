import { useEffect, useState } from "react";
import Login from "./Login";
import "./App.css";

function App() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!loggedIn) return;

    fetch(import.meta.env.VITE_BACKEND_URL + "/api/members")
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching members:", err);
        setLoading(false);
      });
  }, [loggedIn]);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="App p-4">
      <h1 className="text-3xl mb-4">Fabman Members</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {members.map((member) => (
            <li key={member.id}>
              {member.firstName} {member.lastName} ({member.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

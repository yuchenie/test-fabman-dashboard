import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://test-fabman-backend.onrender.com/api/members")
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching members:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>Fabman Members</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
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

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import './App.css';

function App() {
  const { isLoading, error, data, isFetching } = useQuery(["repoData"], () =>
    axios
      .get("https://api.github.com/repos/tannerlinsley/react-query")
      .then((res) => res.data)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? "Updating..." : ""}</div>
    </div>
  );
}

export default App;

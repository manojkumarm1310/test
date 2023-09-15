import React, { useState, useEffect } from "react";
import axios from "axios";

function InfoUser()
{
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortByName, setSortByName] = useState(false);

  const getJsonData = async (req,res) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getJsonData();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sorted = sortByName
      ? [...filtered].sort((i, j) => i.name.localeCompare(j.name))
      : filtered;

    setFilteredUsers(sorted);
  }, [searchTerm, users, sortByName]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortByName = () => {
    setSortByName(!sortByName);
  };

  return (
    <div class="userInfo">
      <div><h1>User Info</h1></div>
      <div class="inputBox"><input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch} />
        </div>
      <div> <button onClick={handleSortByName}>{"Sort by Name "}</button></div>
      <div> <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul></div>
     
    </div>
  );
};

export default InfoUser;

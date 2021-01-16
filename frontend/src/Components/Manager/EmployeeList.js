import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useStateValue } from "../../StateProvider";

function EmployeeList() {

  const [{ token }, dispatch] = useStateValue();
  const [employees, setEmployees] = useState();
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8000/employeeList', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
          })
        const status = await response.status;
        const resData = await response.json(); 
        if (status === 500) {
          throw new Error(resData.message);
        }
        setEmployees(resData["employees"])
      } catch(err) {
        alert(err)
      }
    }
    fetchData();
  }, [])

  const renderEmployee = (employee) => {
    if(name !== "" && employee.name.toLowerCase().indexOf(name.toLowerCase()) === -1) {
      return null
    }
    if(team !== "" && employee.teamName.toLowerCase().indexOf(team.toLowerCase()) === -1) {
      return null
    }
    if(role !== "" && employee.role.toLowerCase().indexOf(role.toLowerCase()) === -1) {
      return null
    }

    return (
      <Card employee={employee} />
    )
  }

  return (
    <div>
      <div>
        <p>Name: </p>
        <input 
          type="text"
          value={name} 
          onChange={e => setName(e.target.value)}
        />
      </div> 
      <br />
      <div>
        <p>Team: </p>
        <input 
          type="text"
          value={team}
          onChange={e => setTeam(e.target.value)}
        />
      </div>
      <br />
      <div>
        <p>Role: </p>
        <input 
          type="text"
          value={role} 
          onChange={e => setRole(e.target.value)}
        />
      </div>
      <br />
      <div>
        {employees?.map(employee => (
          <div key={employee._id}>
            {renderEmployee(employee)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmployeeList;
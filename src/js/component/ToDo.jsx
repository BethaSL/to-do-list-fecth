import React, { useEffect, useState } from "react";

//TO DO LIST WITH FETCH
//https://assets.breatheco.de/apis/fake/todos/
//https://reqbin.com/

function ToDo() {
	//useStates
	const [tasks, setTasks] = useState([]); //tasks list
	const [task, setTask] = useState(""); //single task

	//Functions
	const handleTask = event => {
		setTask(event.target.value);
	};
	const handleSubmit = event => {
		event.preventDefault();
	};

	//Gets the tasks from the API
	const urlMain = "https://assets.breatheco.de/apis/fake/todos/user";
	const getTasks = async urlMain => {
		const response = await fetch(`${urlMain}/Betha`);
		const tasks = await response.json();
		setTasks(tasks);
	};

	useEffect(() => {
		getTasks(urlMain);
	}, []);

	//Add a new task and sends it to the API
	const addTask = async event => {
		try {
			if (event.key == "Enter") {
				const response = await fetch(`${urlMain}/Betha`, {
					method: "PUT",
					body: JSON.stringify([
						...tasks,
						{ label: task, done: false }
					]),
					headers: {
						"Content-Type": "application/json"
					}
				});
				if (response.ok) {
					getTasks(urlMain);
					setTask("");
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	//Deletes a task and sends the new array to the API
	const deleteTask = async id => {
		const newToDo = tasks.filter((task, index) => index != id);
		try {
			const response = await fetch(`${urlMain}/Betha`, {
				method: "PUT",
				body: JSON.stringify(newToDo),
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				getTasks(urlMain);
			}
		} catch (error) {
			console.log(error);
		}
	};

	//Body
	return (
		<div className="container">
			<div className="row justify-content-center mt-2">
				<div className="col-12 col-md-6">
					<h1>
						<strong> To do list </strong>
					</h1>
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							className="form-control"
							placeholder="What needs to be done?"
							onChange={handleTask}
							onKeyPress={addTask}
							value={task}
						/>
					</form>
				</div>
			</div>
			<div className="row justify-content-center" id="tasksBox">
				<div className="col-12 col-md-6">
					<ul>
						{tasks.map((task, index) => {
							return (
								<li
									key={index}
									onClick={() => deleteTask(index)}>
									{task.label}
									<i className="fas fa-check myIcon"></i>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="row justify-content-center" id="taskCounter">
					{tasks.length == 1
						? `${tasks.length} item left`
						: `${tasks.length} items left`}
				</div>
			</div>
		</div>
	);
}

export default ToDo;

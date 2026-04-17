import { useState } from 'react'

function TaskManager() {
  const [tasks, setTasks] = useState([])
  const [taskTitle, setTaskTitle] = useState('')

  const addTask = () => {
    const trimmedTitle = taskTitle.trim()

    if (!trimmedTitle) {
      return
    }

    const newTask = {
      id: Date.now(),
      title: trimmedTitle,
      completed: false
    }

    setTasks((prevTasks) => [...prevTasks, newTask])
    setTaskTitle('')
  }

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed
            }
          : task
      )
    )
  }

  return (
    <section className="task-card">
      <h2>Task Manager (Array/Object State)</h2>

      <div className="task-add-row">
        <input
          type="text"
          value={taskTitle}
          onChange={(event) => setTaskTitle(event.target.value)}
          placeholder="Enter a task title"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {tasks.length === 0 ? (
        <p className="task-empty">No tasks yet. Add your first task.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span className={task.completed ? 'task-title is-complete' : 'task-title'}>
                {task.title} - {task.completed ? 'Completed' : 'Pending'}
              </span>
              <button onClick={() => toggleTaskCompletion(task.id)}>
                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default TaskManager
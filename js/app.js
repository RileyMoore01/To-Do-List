// JavaScript logic for CRUD operations
    // Fetch tasks from the server
    function fetchTasks() {
        fetch('api.php')
          .then(response => response.json())
          .then(tasks => {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';
  
            tasks.forEach(task => {
              const li = document.createElement('li');
              li.textContent = task.task;
  
              if (task.completed) {
                li.classList.add('completed');
              } else {
                const completeButton = document.createElement('button');
                completeButton.textContent = 'Complete';
                completeButton.onclick = () => markAsCompleted(task.id);
                li.appendChild(completeButton);
              }
  
              taskList.appendChild(li);
            });
          });
      }
  
      // Add a new task
      function addTask() {
        const taskInput = document.getElementById('taskInput');
        const task = taskInput.value.trim();
  
        if (task !== '') {
          fetch('api.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task }),
          })
          .then(response => response.json())
          .then(data => {
            console.log(data.message);
            fetchTasks();
          });
  
          taskInput.value = '';
        }
      }
  
      // Mark a task as completed
      function markAsCompleted(id) {
        fetch('api.php', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
          fetchTasks();
        });
      }
  
      // Fetch tasks when the page loads
      fetchTasks();
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("shopping-form");
  const taskInput = document.getElementById("task-input");
  const prioritySelect = document.getElementById("priority");
  const taskList = document.getElementById("tasks");

  if (!form || !taskInput || !prioritySelect || !taskList) {
      console.error("One or more elements not found. Check your HTML IDs.");
      return;
  }

  // Load tasks from LocalStorage on page load
  loadTasks();

  form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (taskInput.value.trim() === "") return;

      const li = document.createElement("li");
      li.classList.add("task-item", prioritySelect.value);
      li.innerHTML = `<span>${taskInput.value}</span>
                      <button class="icon-btn delete-btn">🗑</button>`;

      taskList.appendChild(li);
      taskInput.value = "";

      // Delete task event
      li.querySelector(".delete-btn").addEventListener("click", function () {
          li.remove();
          saveTasks();
      });

      saveTasks(); // Save task after adding
  });

  // Save tasks to LocalStorage
  function saveTasks() {
      const tasks = Array.from(taskList.children).map(li => ({
          text: li.querySelector("span").textContent,
          priority: li.classList[1]
      }));
      localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Load tasks from LocalStorage
  function loadTasks() {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      savedTasks.forEach(task => {
          const li = document.createElement("li");
          li.classList.add("task-item", task.priority);
          li.innerHTML = `<span>${task.text}</span>
                          <button class="icon-btn delete-btn">🗑</button>`;
          taskList.appendChild(li);

          li.querySelector(".delete-btn").addEventListener("click", function () {
              li.remove();
              saveTasks();
          });
      });
  }
});

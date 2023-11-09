
const data = {
    "tasks": {
      "one": {
        "task": "Learning Javascript",
        "state": true,
        "end": "2020/10/21"
      },
      "two": {
        "task": "Reader Book Clean Code",
        "state": false,
        "end": "2023/12/31"
      },
      "three": {
        "task": "Running",
        "state": false,
        "end": "2023/06/25"
      },
      "four": {
        "task": "Pass the Evaluation",
        "state": false,
        "end": "2023/11/09"
      },
      "five": {
        "task": "Go to Karaoke",
        "state": true,
        "end": "2022/08/25"
      },
      "six": {
        "task": "Finish watching the serie",
        "state": false,
        "end": "2023/12/31"
      },
      "seven": {
        "task": "Controll Weight",
        "state": false,
        "end": "2020/11/22"
      }
    }
  };
  
  let activities = Object.entries(data.tasks).map(([id, task]) => ({ id, ...task }));
  
  function renderActivities() {
    const activityList = document.getElementById('activityList');
    activityList.innerHTML = '';
  
    activities.forEach(activity => {
      const listItem = document.createElement('li');
      listItem.textContent = `${activity.task} - Fecha límite: ${activity.end}`;
  
      if (!activity.state && isVigent(activity.end)) {
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Marcar como Cumplida';
        completeButton.onclick = () => completeActivity(activity.id);
        listItem.appendChild(completeButton);
      }
  
      activityList.appendChild(listItem);
    });
  }



function getNumberInEnglish(number) {
  const numberWords = [
    'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'
  ];
  return numberWords[number - 1];
}

function renderActivities() {
  const activityList = document.getElementById('activityList');
  activityList.innerHTML = '';

  activities.forEach((activity, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';

    const taskText = document.createTextNode(`${getNumberInEnglish(index + 1)}. ${activity.task} - Fecha límite: ${activity.end}`);
    listItem.appendChild(taskText);

    const badge = document.createElement('span');
    badge.className = 'badge';

    if (activity.state) {
      badge.classList.add('badge-success');
      badge.textContent = 'Cumplida';
    } else if (isVigent(activity.end)) {
      badge.classList.add('badge-primary');
      badge.textContent = 'Vigente';
    } else {
      badge.classList.add('badge-danger');
      badge.textContent = 'Vencida';
    }

    listItem.appendChild(badge);

    if (!activity.state && isVigent(activity.end)) {
      const completeButton = document.createElement('button');
      completeButton.className = 'btn btn-success float-right';
      completeButton.textContent = 'Marcar como Cumplida';
      completeButton.onclick = () => completeActivity(activity.id);
      listItem.appendChild(completeButton);
    }

    activityList.appendChild(listItem);
  });
}




  
  function filterActivities(filter) {
    switch (filter) {
      case 'all':
        renderActivities();
        break;
      case 'completed':
        renderFilteredActivities(true, true);
        break;
      case 'uncompleted':
        renderFilteredActivities(false, true);
        break;
      case 'completedNotVigent':
        renderFilteredActivities(true, false);
        break;
    }
  }
  


function renderFilteredActivities(completed, vigent) {
  const filteredActivities = activities.filter(activity => {
    const isCompleted = activity.state;
    const isVigentActivity = isVigent(activity.end);

    if (completed && vigent) {
      return isCompleted;
    } else if (!completed && vigent) {
      return !isCompleted && isVigentActivity;
    } else if (completed && !vigent) {
      return isCompleted && !isVigentActivity;
    } else {
      return true;
    }
  });

  const activityList = document.getElementById('activityList');
  activityList.innerHTML = '';

  filteredActivities.forEach(activity => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';

    const taskText = document.createTextNode(`${activity.task} - Fecha límite: ${activity.end}`);
    listItem.appendChild(taskText);

    const badge = document.createElement('span');
    badge.className = 'badge';

    if (activity.state) {
      badge.classList.add('badge-success');
      badge.textContent = 'Cumplida';
    } else if (isVigent(activity.end)) {
      badge.classList.add('badge-primary');
      badge.textContent = 'Vigente';
    } else {
      badge.classList.add('badge-danger');
      badge.textContent = 'Vencida';
    }

    listItem.appendChild(badge);

    if (!activity.state && isVigent(activity.end)) {
      const completeButton = document.createElement('button');
      completeButton.className = 'btn btn-success float-right';
      completeButton.textContent = 'Marcar como Cumplida';
      completeButton.onclick = () => completeActivity(activity.id);
      listItem.appendChild(completeButton);
    }

    activityList.appendChild(listItem);
  });
}



  
  function completeActivity(id) {
    const index = activities.findIndex(activity => activity.id === id);
    if (index !== -1) {
      activities[index].state = true;
      renderActivities();
    }
  }
  
  function isVigent(date) {
    const currentDate = new Date().toISOString().split('T')[0];
    return date >= currentDate;
  }

  function isDateBeforeToday(dateString) {
    const currentDate = new Date().toISOString().split('T')[0];
    return dateString < currentDate;
  }

  function addActivity() {
    const activityInput = document.getElementById('activityInput');
    const activityDate = document.getElementById('activityDate');
  
    const name = activityInput.value;
    const date = activityDate.value;
  
    if (!name || !date) {
      alert('Por favor, complete todos los campos.');
      return;
    }
  
    if (isDateBeforeToday(date)) {
      alert('La fecha límite debe ser igual o posterior a la actual.');
      return;
    }
  
    if (activities.length >= 20) {
      alert('Límite máximo de actividades alcanzado.');
      return;
    }
  
    const newActivity = {
      id: activities.length + 1,
      task: name,
      end: date,
      state: false
    };
  
    activities.push(newActivity);
    renderActivities();
    activityInput.value = '';
    activityDate.value = '';
  }

  function completeActivity(id) {
    const index = activities.findIndex(activity => activity.id === id);
    if (index !== -1) {
      activities[index].state = true;
      renderActivities();
    }
  }
  
  document.getElementById('addActivityForm').addEventListener('submit', function (event) {
    event.preventDefault();
    addActivity();
  });
  
  
  renderActivities();
  
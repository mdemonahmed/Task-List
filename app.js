//define ul vars
const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const ClearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//load all event Listeners
loadEventListeners();
function loadEventListeners(){
    //Dom load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
     //Remove task event
    tasklist.addEventListener('click', removeTask);
    // cleare tasks event
    ClearBtn.addEventListener('click', clearTaks);
    //filter tasks event
    filter.addEventListener('keyup', filterTasks);
}
// get tasks form ls
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } 
    tasks.forEach(function(task){
        //create li element
        const li = document.createElement('li');
        // Add li class
        li.className = 'collection-item';
        // create text node and append to li
        li.appendChild(document.createTextNode(task));
        //create new link element
        const link = document.createElement('a');
        //add class to link
        link.className = 'delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append the link to li
        li.appendChild(link);
        //append li to ul
        tasklist.appendChild(li);      
    });
}
//add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('add a task');
    }
   //create li element
    const li = document.createElement('li');
   // Add li class
   li.className = 'collection-item';
   // create text node and append to li
   li.appendChild(document.createTextNode(taskInput.value));
   //create new link element
   const link = document.createElement('a');
   //add class to link
   link.className = 'delete-item secondary-content';
   //add icon html
   link.innerHTML = '<i class="fa fa-remove"></i>';
   //append the link to li
   li.appendChild(link);
   //append li to ul
   tasklist.appendChild(li);

   //store in ls
   storeTaskInLocalStorage(taskInput.value);

   //clear input
   taskInput.value = '';

   e.preventDefault();
}
//store taks
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if( confirm('are you sure?')){
            e.target.parentElement.parentElement.remove();
            //remove form ls
            removeTaskFromlocalStorage(e.target.parentElement.parentElement);
        }        
    } 
}
//remove form ls
function removeTaskFromlocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){

        if(taskItem.textContent == task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear tasks
function clearTaks(){
    //tasklist.innerHTML = '';
    //https://jsperf.com/innerhtml-vs-removechild/47

    //faster
    while (tasklist.firstChild) {
        tasklist.removeChild(tasklist.firstChild);
      }
      //clear tasks form ls
      clearTasksFromLocalStorage();
}
//clear tasks from ls
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//filter task
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){      
                task.style.display = 'block';
            } else{
                task.style.display = 'none';
            }
        });  
}
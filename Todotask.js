
class ToDoTasks {
    constructor() {
     
        this.Courses = JSON.parse(localStorage.getItem('CoursesList'));
        if(!this.Courses){
            this.Courses =  [
                { task: 'reactJs Course', isComplete: true },
                { task: 'Angular Course', isComplete: false },
                { task: 'NextJs Course', isComplete: true },
            ];
        }
        
        this.loadCourses();
        this.addEventListener();
    }
    toggleCourseStatus(index) {
        this.Courses[index].isComplete = !this.Courses[index].isComplete;
        this.loadCourses();
    }

    deleteCourse(event, taskIndex){
        event.preventDefault();
        this.Courses.splice(taskIndex, 1);
        localStorage.removeItem('CoursesList');
        this.loadCourses();
    }
    
    addCourse(course){
        let target = document.getElementById('addTask').value;
        if(course || target){
        let newTask = {
            target, course,
            isCompleted: false,
        };
        let parentDiv = document.getElementById('addTask').parentElement;
        if(course === '' || target === ''){
            parentDiv.classList.add('has-error');
        } else {
            parentDiv.classList.remove('has-error');
            parentDiv.classList.add('has-success')
            if(course != undefined && course != null){
                delete newTask.target;
                newTask['task'] = newTask['course'];
                delete newTask['course'];
                this.Courses.push(newTask);
            }
                else if(target != undefined && target != null){
                delete newTask.course;
                newTask['task'] = newTask['target'];
                delete newTask['target'];
                this.Courses.push(newTask);
                }
            this.loadCourses();
        }
        // this.addTask(target.value || course);
        document.getElementById('addTask').value = "";
    }
    }

    generateCoursesHtml(course, index) {
        return `

        <div class="border">
            <li class="check-list"n style=" border:1px solid lightgrey;padding:10px;width: 483px;margin-left: 323px;">
          
                <div class=" checkbox">
                <label><input id="toggleCourseStatus" type="checkbox" onchange="toDo.toggleCourseStatus(${index})" value="" class="" ${course.isComplete ? 'checked' : ''}></label>
                </div>
                <div   id="text" class=" ${course.isComplete ? 'complete' : ''}">
                ${course.task}
                </div>
                <a class="" href="" onClick="toDo.deleteCourse(event, ${index})"><i id="deleteTask" data-id="${index}" class="fa-solid fa-trash"></i></a>
            </li>
            </div>
        `;
    }

    loadCourses() {
     
        localStorage.setItem('CoursesList', JSON.stringify(this.Courses));
        let taskHtml = this.Courses.reduce((html, course, index) => html += this.generateCoursesHtml(course, index), '');
        document.getElementById('taskList').innerHTML = taskHtml;
    }
     addEventListener(){
        document.getElementById('addTask').addEventListener('keypress', event => {
            if(event.keyCode === 13 ){
                this.addCourse(event.target.value);
                event.target.value = "";
            }
        });
    }
}

let toDo;
window.addEventListener("load", () => {
  toDo = new ToDoTasks();
});

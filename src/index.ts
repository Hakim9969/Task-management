class User {
    constructor(public id: number, public name: string, public email: string, public age:number) {
    }
}

class Task {
    constructor(public id: number, public role: string, public assignedTo?: number) {
    }
}

class UserService {
    private users: User[] = [];
    private nextId = 1;

    createUser(name: string, email: string, age: number): User {
        const user = new User(this.nextId++, name, email, age);
        this.users.push(user);
        return user;
    }

    getAllUsers() {
        return this.users;
    }

    getById(id: number) {
        return this.users.find((user) => user.id === id);
    }

    getByEmail(email: string) {
        return this.users.find((user) => user.email === email);
    }

    updateUser(id: number, updates: { name: string, email: string, age: number }) {
        const user = this.getById(id);
        if (!user) return false;
        user.name = updates.name ?? user.name;
        user.email = updates.email ?? user.email;
        user.age = updates.age ?? user.age;
        return true;
    }

    deleteUser(id: number) {
        const userIndex = this.users.findIndex((user) => user.id === id);
        return userIndex !== -1 ? this.users.splice(userIndex, 1) : false;
    }
}

class TaskManager {
    private tasks: Task[] = [];
    private nextTaskId: number = 1;

    createTask(role: string) {
        const task = new Task(this.nextTaskId++, role);
        this.tasks.push(task);
        return task;
    }

    getAllTasks() {
        return this.tasks;
    }

    getById(id: number) {
        const availableTasks = this.tasks.find((task) => task.id === id);
        if (!availableTasks) return false;
        return  this.tasks.find((task) => task.id === id);
    }

    updateTask(id: number, newRole: string) {
        const task = this.getById(id);
        if (!task) return false;
        task.role = newRole;
        return true;
    }

    deleteTask(id: number) {
        const taskIndex = this.tasks.findIndex((task) => task.id === id);
        return taskIndex !== -1 ? this.tasks.splice(taskIndex, 1) : false;
    }

    assignTask(taskId: number, userId: number) {
        const task = this.getById(taskId);
        if (!task) return false;
        task.assignedTo = userId;
        return true;
    }

    unassignTask(taskId: number, userId: number) {
        const task = this.getById(taskId);
        if (!task) return false;
        delete task.assignedTo;
        return true;
    }

    getByUser(userId: number) {
        return this.tasks.filter(task => task.assignedTo === userId);
    }
}

const userService = new  UserService();
const taskManager = new TaskManager();

const user1 =  userService.createUser('Hakim' ,'hakim@gmail.com', 20);
const user2 = userService.createUser('Hak' ,'hak@gmail.com', 22);

const task1 = taskManager.createTask('Read');
const task2 = taskManager.createTask('Research');
const task3 = taskManager.createTask('Build Project');


taskManager.assignTask(task1.id, user1.id);
taskManager.assignTask(task2.id, user2.id);
taskManager.assignTask(task3.id, user1.id);

taskManager.updateTask(task1.id, 'Read');

taskManager.unassignTask(task2.id, user2.id);

taskManager.deleteTask(task2.id);
console.log("All Users:", userService.getAllUsers());
console.log("All Tasks:", taskManager.getAllTasks());
console.log("Tasks for Hakim:", taskManager.getByUser(user1.id));
console.log("Tasks for Hak:", taskManager.getByUser(user2.id));




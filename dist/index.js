"use strict";
class User {
    constructor(id, name, email, age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
    }
}
class Task {
    constructor(id, role, assignedTo) {
        this.id = id;
        this.role = role;
        this.assignedTo = assignedTo;
    }
}
class UserService {
    constructor() {
        this.users = [];
        this.nextId = 1;
    }
    createUser(name, email, age) {
        const user = new User(this.nextId++, name, email, age);
        this.users.push(user);
        return user;
    }
    getAllUsers() {
        return this.users;
    }
    getById(id) {
        return this.users.find((user) => user.id === id);
    }
    getByEmail(email) {
        return this.users.find((user) => user.email === email);
    }
    updateUser(id, updates) {
        var _a, _b, _c;
        const user = this.getById(id);
        if (!user)
            return false;
        user.name = (_a = updates.name) !== null && _a !== void 0 ? _a : user.name;
        user.email = (_b = updates.email) !== null && _b !== void 0 ? _b : user.email;
        user.age = (_c = updates.age) !== null && _c !== void 0 ? _c : user.age;
        return true;
    }
    deleteUser(id) {
        const userIndex = this.users.findIndex((user) => user.id === id);
        return userIndex !== -1 ? this.users.splice(userIndex, 1) : false;
    }
}
class TaskManager {
    constructor() {
        this.tasks = [];
        this.nextTaskId = 1;
    }
    createTask(role) {
        const task = new Task(this.nextTaskId++, role);
        this.tasks.push(task);
        return task;
    }
    getAllTasks() {
        return this.tasks;
    }
    getById(id) {
        const availableTasks = this.tasks.find((task) => task.id === id);
        if (!availableTasks)
            return false;
        return this.tasks.find((task) => task.id === id);
    }
    updateTask(id, newRole) {
        const task = this.getById(id);
        if (!task)
            return false;
        task.role = newRole;
        return true;
    }
    deleteTask(id) {
        const taskIndex = this.tasks.findIndex((task) => task.id === id);
        return taskIndex !== -1 ? this.tasks.splice(taskIndex, 1) : false;
    }
    assignTask(taskId, userId) {
        const task = this.getById(taskId);
        if (!task)
            return false;
        task.assignedTo = userId;
        return true;
    }
    unassignTask(taskId, userId) {
        const task = this.getById(taskId);
        if (!task)
            return false;
        delete task.assignedTo;
        return true;
    }
    getByUser(userId) {
        return this.tasks.filter(task => task.assignedTo === userId);
    }
}
const userService = new UserService();
const taskManager = new TaskManager();
const user1 = userService.createUser('Hakim', 'hakim@gmail.com', 20);
const user2 = userService.createUser('Hak', 'hak@gmail.com', 22);
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

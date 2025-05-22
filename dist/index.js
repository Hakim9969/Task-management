"use strict";
class Member {
    constructor(id, name, email, age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
    }
}
class Job {
    constructor(id, role, assignedTo) {
        this.id = id;
        this.role = role;
        this.assignedTo = assignedTo;
    }
}
class MemberService {
    constructor() {
        this.members = [];
        this.nextId = 1;
    }
    createMember(name, email, age) {
        const member = new Member(this.nextId++, name, email, age);
        this.members.push(member);
        return member;
    }
    getAllMembers() {
        return this.members;
    }
    getById(id) {
        return this.members.find((member) => member.id === id);
    }
    getByEmail(email) {
        return this.members.find((member) => member.email === email);
    }
    updateMember(id, updates) {
        var _a, _b, _c;
        const member = this.getById(id);
        if (!member)
            return false;
        member.name = (_a = updates.name) !== null && _a !== void 0 ? _a : member.name;
        member.email = (_b = updates.email) !== null && _b !== void 0 ? _b : member.email;
        member.age = (_c = updates.age) !== null && _c !== void 0 ? _c : member.age;
        return true;
    }
    deleteMember(id) {
        const index = this.members.findIndex((member) => member.id === id);
        return index !== -1 ? this.members.splice(index, 1) : false;
    }
}
class JobManager {
    constructor() {
        this.jobs = [];
        this.nextJobId = 1;
    }
    createJob(role) {
        const job = new Job(this.nextJobId++, role);
        this.jobs.push(job);
        return job;
    }
    getAllJobs() {
        return this.jobs;
    }
    getById(id) {
        const job = this.jobs.find((job) => job.id === id);
        if (!job)
            return false;
        return job;
    }
    updateJob(id, newRole) {
        const job = this.getById(id);
        if (!job)
            return false;
        job.role = newRole;
        return true;
    }
    deleteJob(id) {
        const index = this.jobs.findIndex((job) => job.id === id);
        return index !== -1 ? this.jobs.splice(index, 1) : false;
    }
    assignJob(jobId, memberId) {
        const job = this.getById(jobId);
        if (!job)
            return false;
        job.assignedTo = memberId;
        return true;
    }
    unassignJob(jobId, memberId) {
        const job = this.getById(jobId);
        if (!job)
            return false;
        delete job.assignedTo;
        return true;
    }
    getByMember(memberId) {
        return this.jobs.filter(job => job.assignedTo === memberId);
    }
}
const memberService = new MemberService();
const jobManager = new JobManager();
const member1 = memberService.createMember('Hakim', 'hakim@gmail.com', 20);
const member2 = memberService.createMember('Hak', 'hak@gmail.com', 22);
const job1 = jobManager.createJob('Read');
const job2 = jobManager.createJob('Research');
const job3 = jobManager.createJob('Build Project');
jobManager.assignJob(job1.id, member1.id);
jobManager.assignJob(job2.id, member2.id);
jobManager.assignJob(job3.id, member1.id);
jobManager.updateJob(job1.id, 'Read');
jobManager.unassignJob(job2.id, member2.id);
jobManager.deleteJob(job2.id);
console.log("All Members:", memberService.getAllMembers());
console.log("All Jobs:", jobManager.getAllJobs());
console.log("Jobs for Hakim:", jobManager.getByMember(member1.id));
console.log("Jobs for Hak:", jobManager.getByMember(member2.id));

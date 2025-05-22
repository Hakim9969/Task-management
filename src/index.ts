class Member {
    constructor(public id: number, public name: string, public email: string, public age: number) {}
}

class Job {
    constructor(public id: number, public role: string, public assignedTo?: number) {}
}

class MemberService {
    private members: Member[] = [];
    private nextId = 1;

    createMember(name: string, email: string, age: number): Member {
        const member = new Member(this.nextId++, name, email, age);
        this.members.push(member);
        return member;
    }

    getAllMembers() {
        return this.members;
    }

    getById(id: number) {
        return this.members.find((member) => member.id === id);
    }

    getByEmail(email: string) {
        return this.members.find((member) => member.email === email);
    }

    updateMember(id: number, updates: { name: string, email: string, age: number }) {
        const member = this.getById(id);
        if (!member) return false;
        member.name = updates.name ?? member.name;
        member.email = updates.email ?? member.email;
        member.age = updates.age ?? member.age;
        return true;
    }

    deleteMember(id: number) {
        const index = this.members.findIndex((member) => member.id === id);
        return index !== -1 ? this.members.splice(index, 1) : false;
    }
}

class JobManager {
    private jobs: Job[] = [];
    private nextJobId: number = 1;

    createJob(role: string) {
        const job = new Job(this.nextJobId++, role);
        this.jobs.push(job);
        return job;
    }

    getAllJobs() {
        return this.jobs;
    }

    getById(id: number) {
        const job = this.jobs.find((job) => job.id === id);
        if (!job) return false;
        return job;
    }

    updateJob(id: number, newRole: string) {
        const job = this.getById(id);
        if (!job) return false;
        job.role = newRole;
        return true;
    }

    deleteJob(id: number) {
        const index = this.jobs.findIndex((job) => job.id === id);
        return index !== -1 ? this.jobs.splice(index, 1) : false;
    }

    assignJob(jobId: number, memberId: number) {
        const job = this.getById(jobId);
        if (!job) return false;
        job.assignedTo = memberId;
        return true;
    }

    unassignJob(jobId: number, memberId: number) {
        const job = this.getById(jobId);
        if (!job) return false;
        delete job.assignedTo;
        return true;
    }

    getByMember(memberId: number) {
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

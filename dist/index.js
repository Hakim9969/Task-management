

class Member {
    constructor(id, name, email, age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
    }
}

class Job {
    constructor(id, role, assignedTo = null) {
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
        return { success: true, member };
    }

    getAllMembers() {
        return this.members;
    }

    getByEmail(email) {
        return this.members.find((member) => member.email = email);
    }

    getById(id) {
        return this.members.find(member => member.id === id);
    }


    updateMember(id, name, email, age) {
        const member = this.getById(id);
        if (member) {
            member.name = name;
            member.email = email;
            member.age = age;
            return true;
        }
        return false;
    }

    deleteMember(id) {
        const index = this.members.findIndex(member => member.id === id);
        if (index !== -1) {
            this.members.splice(index, 1);
            return true;
        }
        return false;
    }
}

class JobService {
    constructor() {
        this.jobs = [];
        this.nextId = 1;
    }

    createJob(role) {
        const job = new Job(this.nextId++, role);
        this.jobs.push(job);
        return job;
    }

    getAllJobs() {
        return this.jobs;
    }

    getById(id) {
        return this.jobs.find(job => job.id === id);
    }

    assignJob(jobId, memberId) {
        const job = this.getById(jobId);
        if (job) {
            job.assignedTo = memberId;
            return true;
        }
        return false;
    }

    unassignJob(jobId) {
        const job = this.getById(jobId);
        if (job) {
            job.assignedTo = null;
            return true;
        }
        return false;
    }

    deleteJob(id) {
        const index = this.jobs.findIndex(job => job.id === id);
        if (index !== -1) {
            this.jobs.splice(index, 1);
            return true;
        }
        return false;
    }
}


const memberService = new MemberService();
const jobService = new JobService();

document.addEventListener('DOMContentLoaded', () => {
    const memberForm = document.getElementById('memberForm');
    const jobForm = document.getElementById('jobForm');
    const membersList = document.getElementById('membersList');
    const jobsList = document.getElementById('jobsList');


    renderMembers();
    renderJobs();

    memberForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('memberName').value;
        const email = document.getElementById('memberEmail').value;
        const age = parseInt(document.getElementById('memberAge').value);

        memberService.createMember(name, email, age);
        renderMembers();
        memberForm.reset();
    });

    jobForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const role = document.getElementById('jobRole').value;

        jobService.createJob(role);
        renderJobs();
        jobForm.reset();
    });

    function renderMembers() {
        membersList.innerHTML = '';
        const members = memberService.getAllMembers();

        members.forEach(member => {
            const li = document.createElement('li');
            li.className = 'member-item';
            li.innerHTML = `
                <div>
                    <strong>${member.name}</strong> (${member.age})<br>
                    <small>${member.email}</small><br>
                    <small>ID: ${member.id}</small>
                </div>
                <div class="member-actions">
                    <button class="btn-secondary edit-member" data-id="${member.id}">Edit</button>
                    <button class="btn-danger delete-member" data-id="${member.id}">Delete</button>
                </div>
                <div class="edit-form" id="edit-form-${member.id}">
                    <input type="text" id="edit-name-${member.id}" value="${member.name}" placeholder="Name">
                    <input type="email" id="edit-email-${member.id}" value="${member.email}" placeholder="Email">
                    <input type="number" id="edit-age-${member.id}" value="${member.age}" placeholder="Age">
                    <button class="save-edit" data-id="${member.id}">Save</button>
                    <button class="cancel-edit" data-id="${member.id}">Cancel</button>
                </div>
            `;
            membersList.appendChild(li);
        });


        document.querySelectorAll('.edit-member').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                document.getElementById(`edit-form-${id}`).style.display = 'block';
            });
        });

        document.querySelectorAll('.delete-member').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                if (confirm('Are you sure you want to delete this member?')) {
                    memberService.deleteMember(id);
                    renderMembers();
                    renderJobs();
                }
            });
        });

        document.querySelectorAll('.save-edit').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const name = document.getElementById(`edit-name-${id}`).value;
                const email = document.getElementById(`edit-email-${id}`).value;
                const age = parseInt(document.getElementById(`edit-age-${id}`).value);

                memberService.updateMember(id, name, email, age);
                renderMembers();
            });
        });

        document.querySelectorAll('.cancel-edit').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                document.getElementById(`edit-form-${id}`).style.display = 'none';
            });
        });
    }

    function renderJobs() {
        jobsList.innerHTML = '';
        const jobs = jobService.getAllJobs();
        const members = memberService.getAllMembers();

        jobs.forEach(job => {
            const li = document.createElement('li');
            li.className = 'job-item';

            const assignedMember = job.assignedTo ? memberService.getById(job.assignedTo) : null;
            const assignedText = assignedMember ?
                `<span class="assigned">Assigned to: ${assignedMember.name}</span>` :
                '<span class="unassigned">Unassigned</span>';

            li.innerHTML = `
                <div class="job-info">
                    <div>
                        <strong>${job.role}</strong><br>
                        <small>ID: ${job.id}</small>
                    </div>
                    <div>
                        ${assignedText}
                    </div>
                </div>
                <div class="job-actions">
                    ${job.assignedTo ?
                    `<button class="btn-danger unassign-job" data-id="${job.id}">Unassign</button>` :
                    `<div class="assign-form">
                            <select id="assign-select-${job.id}">
                                ${members.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
                            </select>
                            <button class="assign-job" data-id="${job.id}">Assign</button>
                        </div>`}
                    <button class="btn-danger delete-job" data-id="${job.id}">Delete</button>
                </div>
            `;
            jobsList.appendChild(li);
        });

        document.querySelectorAll('.assign-job').forEach(button => {
            button.addEventListener('click', (e) => {
                const jobId = parseInt(e.target.dataset.id);
                const memberId = parseInt(document.getElementById(`assign-select-${jobId}`).value);
                jobService.assignJob(jobId, memberId);
                renderJobs();
            });
        });

        document.querySelectorAll('.unassign-job').forEach(button => {
            button.addEventListener('click', (e) => {
                const jobId = parseInt(e.target.dataset.id);
                jobService.unassignJob(jobId);
                renderJobs();
            });
        });

        document.querySelectorAll('.delete-job').forEach(button => {
            button.addEventListener('click', (e) => {
                const jobId = parseInt(e.target.dataset.id);
                if (confirm('Are you sure you want to delete this job?')) {
                    jobService.deleteJob(jobId);
                    renderJobs();
                }
            });
        });
    }
});

// memberService.createMember('Hakim', 'hakim@gmail.com', 22);
// memberService.createMember('Hak', 'h@gmail.com', 23);
// jobService.createJob('Read');
// jobService.createJob('Research');
// jobService.assignJob(1, 1);
// jobService.assignJob(2, 2);

setTimeout(function(){
    window.location.reload(1);
}, 600000);

var clients = [];
var developers = [];
var statuses = [];
var backlog = [];
var work = [];
var milestones = [];
var roadblocks = [];
var planningBacklog = [];
var brds = [];
var brd_approvals = [];
var roms = [];
var rom_approvals = [];
var completed = [];

function importCurrentWork(json) {
    // Read json into array
    $(json.feed.entry).each(function(index, obj) {
        if (obj.gsx$status.$t === 'Roadblocked') {
            roadblocks.push({
                'taskname': obj.gsx$taskname.$t,
                'attask_ref': obj.gsx$taskref.$t
            });
        } else if (obj.gsx$status.$t === 'Completed') {
            completed.push({
                'taskname': obj.gsx$taskname.$t,
                'attask_ref': obj.gsx$taskref.$t
            });
        } else {
            work.push({
                'client': obj.gsx$client.$t,
                'date_added': obj.gsx$dateadded.$t,
                'days_to_completion': obj.gsx$daystocompletion.$t,
                'deadline': obj.gsx$deadline.$t,
                'developer': obj.gsx$developer.$t,
                'status': obj.gsx$status.$t,
                'dev_hours': obj.gsx$dev.$t,
                'qa_hours': obj.gsx$qa.$t,
                'taskname': obj.gsx$taskname.$t,
                'attask_ref': obj.gsx$taskref.$t,
                'ui_hours': obj.gsx$ui.$t,
                'update': obj.gsx$update.$t
            });
        }

    });

    // Sort work
    work.sort(function(task1, task2) {
        task1 = (new Date(task1.deadline).getTime()/1000);
        task2 = (new Date(task2.deadline).getTime()/1000);
        return task1 - task2;
    });

    // Update panel numbers for number of tasks and number completed
    $('.gdx-num-tasks').html(work.length);
    $('.gdx-num-completed').html(completed.length);

    // Generate tasks in timeline format
    var count=1;
    $(work).each(function() {
        var task_title = this.attask_ref + " - " + this.taskname;
        var developer = " Developer: " + this.developer;
        var picked_up = " Picked Up: " + this.date_added;
        var deadline = " Deadline: " + this.deadline;
        var status = " Status: " + this.status;
        var update = this.update;
        var clone = $('.task-template').clone().removeClass('hidden').removeClass('task-template');
        clone.children('.timeline-panel')
            .children('.timeline-heading')
            .children('.task-reference')
            .html('<small class="text-muted"><a href="https://blueacorn.attask-ondemand.com/task/view?ID='+this.attask_ref+'" target="_blank">AtTask Reference</a></small>');
        clone.children('.timeline-panel')
            .children('.timeline-heading')
            .children('.task-title')
            .html(task_title);
        clone.children('.timeline-panel')
            .children('.timeline-heading')
            .children('.task-status')
            .html('<small class="text-muted"><i class="fa fa-cog"></i>'+status+'</small>');
        clone.children('.timeline-panel')
            .children('.timeline-heading')
            .children('.task-developer')
            .html('<small class="text-muted"><i class="fa fa-user"></i>'+developer+'</small>');
        clone.children('.timeline-panel')
            .children('.timeline-heading')
            .children('.task-added')
            .html('<small class="text-muted"><i class="fa fa-clock-o"></i>'+picked_up+'</small>');
        clone.children('.timeline-panel')
            .children('.timeline-heading')
            .children('.task-deadline')
            .html('<small class="text-muted"><i class="fa fa-clock-o"></i>'+deadline+'</small>');
        clone.children('.timeline-panel')
            .children('.timeline-body')
            .children('p')
            .html(update);
        if (count % 2 == 0) {
            clone.addClass('timeline-inverted');
        }
        if (this.status == "Completed") {
            clone.children('.timeline-badge').addClass('success');
        } else if ((new Date(this.deadline).getTime()/1000) < (new Date().getTime()/1000) && this.status !== 'UAT') {
            clone.children('.timeline-badge').addClass('danger');
        } else if (this.status=="UAT") {
            clone.children('.timeline-badge').addClass('primary');
        }
        $('.timeline-work').append(clone);
        count++;
    });

    // Generate roadblocks in the roadblocks panel
    $(roadblocks).each(function () {
        var clone = $('.roadblock-template').clone().removeClass('hidden').removeClass('roadblock-template')
            .attr('href','https://blueacorn.attask-ondemand.com/task/view?ID='+this.attask_ref);
        clone.children('.roadblock-name').html(this.taskname);
        $('.gdx-roadblock').append(clone);
    });
}

function importBacklog(json) {
    // Read json into an array
    $(json.feed.entry).each(function(index, obj) {
        if (obj.gsx$taskname.$t !== '') {
            backlog.push({
                'client': obj.gsx$client.$t,
                'deadline': obj.gsx$deadline.$t,
                'dev_hours': obj.gsx$dev.$t,
                'priority': obj.gsx$priority.$t,
                'qa_hours': obj.gsx$qa.$t,
                'taskname': obj.gsx$taskname.$t,
                'attask_ref': obj.gsx$taskref.$t,
                'ui_hours': obj.gsx$ui.$t,
                'is_defect': obj.gsx$defect.$t
            });
        }
    });

    // Update panel with backlog and defect numbers
    $('.gdx-num-backlog').html(backlog.length);
    $('.gdx-num-defects').html(backlog.filter(function(task) {
        return task.is_defect === 'Yes';
    }).length);
}

function importPlanningBacklog(json) {
    // Read json into an array
    $(json.feed.entry).each(function(index, obj) {
        if (obj.gsx$taskname.$t !== '') {
            planningBacklog.push({
                'client': obj.gsx$client.$t,
                'taskname': obj.gsx$taskname.$t,
                'attask_ref': obj.gsx$taskref.$t,
                'status': obj.gsx$status.$t,
            });
        }

        switch (obj.gsx$status.$t) {
            case 'BRD':
                brds.push({
                    'taskname': obj.gsx$taskname.$t,
                    'attask_ref': obj.gsx$taskref.$t
                });
                break;
            case 'BRD Approval':
                brd_approvals.push({
                    'taskname': obj.gsx$taskname.$t,
                    'attask_ref': obj.gsx$taskref.$t
                });
                break;
            case 'ROM':
                roms.push({
                    'taskname': obj.gsx$taskname.$t,
                    'attask_ref': obj.gsx$taskref.$t
                });
                break;
            case 'ROM Approval':
                rom_approvals.push({
                    'taskname': obj.gsx$taskname.$t,
                    'attask_ref': obj.gsx$taskref.$t
                });
                break;
        }
    });

    // Update panel with backlog and defect numbers
    $('.gdx-num-roms').html(roms.length);
    $('.gdx-num-rom-approvals').html(rom_approvals.length);
    $('.gdx-num-brds').html(brds.length);
    $('.gdx-num-brd-approvals').html(brd_approvals.length);

    // Generate tasks in timeline format
    var count=1;
    $(planningBacklog).each(function() {
        var task_title = this.attask_ref + " - " + this.taskname;
        var status = " Status: " + this.status;
        var clone = $('.task-template').clone().removeClass('hidden').removeClass('task-template');
        clone.children('.timeline-panel')
            .children('.timeline-heading')
            .children('.task-reference')
            .html('<small class="text-muted"><a href="https://blueacorn.attask-ondemand.com/task/view?ID='+this.attask_ref+'" target="_blank">AtTask Reference</a></small>');
        clone.children('.timeline-panel')
            .children('.timeline-heading')
            .children('.task-title')
            .html(task_title);
        clone.children('.timeline-panel')
            .children('.timeline-heading')
            .children('.task-status')
            .html('<small class="text-muted"><i class="fa fa-cog"></i>'+status+'</small>');
        if (count % 2 == 0) {
            clone.addClass('timeline-inverted');
        }
        if (this.status == "Ready for EST") {
            clone.children('.timeline-badge').addClass('success');
        }
        $('.timeline-planning').append(clone);
        count++;
    });
}

function importDataValidation(json) {
    // Read json into an array
    $(json.feed.entry).each(function(index, obj) {
        if (obj.gsx$clients.$t !== '') clients.push(obj.gsx$clients.$t);
        if (obj.gsx$developers.$t !== '') developers.push(obj.gsx$developers.$t);
        if (obj.gsx$statuses.$t !== '') statuses.push(obj.gsx$statuses.$t);
    });
}

function importMilestones(json) {
    // Read json into an array
    $(json.feed.entry).each(function(index, obj) {
        milestones.push({
            'name': obj.gsx$milestonename.$t,
            'date': obj.gsx$date.$t
        });
    });

    // Generate milestones in the milestone panel
    $(milestones).each(function () {
        var clone = $('.milestone-template').clone().removeClass('hidden').removeClass('milestone-template');
        clone.children('.milestone-name').html(this.name);
        clone.children('.milestone-date')
            .children('em')
            .html(this.date);
        $('.gdx-milestones').append(clone);
    });
}
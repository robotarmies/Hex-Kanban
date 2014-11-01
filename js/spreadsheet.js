setTimeout(function(){
    window.location.reload(1);
}, 10000);

var clients = [];
var developers = [];
var statuses = [];
var backlog = [];
var work = [];
var milestones = [];

function importCurrentWork(json) {
    // Read json into array
    $(json.feed.entry).each(function(index, obj) {
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
    });

    // Update panel numbers for number of tasks and number completed
    $('.gdx-num-tasks').html(work.length);
    $('.gdx-num-completed').html(work.filter(function(task) {
        return task.status === 'Completed';
    }).length);

    // Generate tasks in timeline format
    var count=1;
    $(work).each(function() {
        task_title = this.attask_ref + " - " + this.taskname;
        developer = " Developer: " + this.developer;
        picked_up = " Picked Up: " + this.date_added;
        deadline = " Deadline: " + this.deadline;
        status = " Status: " + this.status;
        update = this.update;
        clone = $('.task-template').clone().removeClass('hidden').removeClass('task-template');
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
            .html('<small class="text-muted"><i class="fa fa-clock-o"></i>'+status+'</small>');
        clone.children('.timeline-panel')
            .children('.timeline-heading')
            .children('.task-developer')
            .html('<small class="text-muted"><i class="fa fa-clock-o"></i>'+developer+'</small>');
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
        }
        $('.timeline').append(clone);
        count++;
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
        name = this.name;
        date = this.date;
        clone = $('.milestone-template').clone().removeClass('hidden').removeClass('milestone-template');
        clone.children('.milestone-name').html(this.name);
        clone.children('.milestone-date')
            .children('em')
            .html(this.date);
        $('.gdx-milestones').append(clone);
    });
}
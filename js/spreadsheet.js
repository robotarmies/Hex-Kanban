var clients = [];
var developers = [];
var statuses = [];
var backlog = [];
var work = [];

function importCurrentWork(json) {
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
            'ui_hours': obj.gsx$ui.$t
        });
    });

    $('.gdx-num-tasks').html(work.length);
    $('.gdx-num-completed').html(work.filter(function(task) {
        return task.status === 'Completed';
    }).length);
}

function importBacklog(json) {
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

    $('.gdx-num-backlog').html(backlog.length);
    $('.gdx-num-defects').html(backlog.filter(function(task) {
        return task.is_defect === 'Yes';
    }).length);
}

function importDataValidation(json) {
    $(json.feed.entry).each(function(index, obj) {
        if (obj.gsx$clients.$t !== '') clients.push(obj.gsx$clients.$t);
        if (obj.gsx$developers.$t !== '') developers.push(obj.gsx$developers.$t);
        if (obj.gsx$statuses.$t !== '') statuses.push(obj.gsx$statuses.$t);
    });
}
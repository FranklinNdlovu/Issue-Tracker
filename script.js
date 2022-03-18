var form = document.getElementById('issueInputForm');
form.addEventListener('submit', saveIssue);

function saveIssue(e)
{
  var issueName = document.getElementById('issueName').value;
  var issueDescription = document.getElementById('issueDescription').value;
  var issueSeverity = document.getElementById('issueSeverity').value;
  var issueAssignedTo = document.getElementById('issueAssignedTo').value;
  var issueId = UUIDv4.generate();
  var issueStatus = 'Open';

  var issue = {
    id: issueId,
    name: issueName,
    description: issueDescription,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }

  var issues =(localStorage.getItem('issues') == null) ? [] : JSON.parse(localStorage.getItem('issues'));
  
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));
  
  form.reset();

  fetchIssues();

  e.preventDefault();
}

function setStatusClosed(id)
{
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++)
  {
    if (issues[i].id == id)
    {
      issues[i].status = 'Closed';
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function deleteIssue(id)
{
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++)
  {
    if (issues[i].id == id)
    {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function fetchIssues()
{
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  issues.forEach(issue => {
    var id = issue.id;
    var name = issue.name;
    var description = issue.description;
    var severity = issue.severity;
    var assignedTo = issue.assignedTo;
    var status = issue.status;

    issuesList.innerHTML += `<div class="card">` +
    `<h5 class="card-header">${name}</h5>`+
    `<div class="card-body bg- primary">`+
      `<h6 >Issue ID: ${id} </h6>` +
      '<p><span class="badge bg-info">' + status + '</span></p>' +
      '<h3 class="card-title">' + description + '</h3>' +
      '<p><span class="fa fa-clock"></span> ' + severity + '</p>' +
      '<p><span class="fa fa-user" aria-hidden="true"></span> ' + assignedTo + '</p>' +
      '<a href="#" onclick="setStatusClosed(\'' + id + '\')" class="btn btn-warning">Close</a> ' +
      '<a href="#" onclick="deleteIssue(\'' + id + '\')" class="btn btn-danger">Delete</a>' +
      '</div>'+
      '</div>';
      
  });
 
}

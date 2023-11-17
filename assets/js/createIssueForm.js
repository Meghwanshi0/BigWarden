document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('createIssueModal');
  
    function openCreateIssueModal() {
      modal.style.display = 'block';
      setTimeout(() => {
        modal.classList.add('show');
      }, 100);
    }
  
    function closeCreateIssueModal() {
      modal.classList.remove('show');
  
      setTimeout(() => {
        modal.style.display = 'none';
      }, 500); // waiting for the transition to complete before hiding
    }
  
    window.openCreateIssueModal = openCreateIssueModal;
    window.closeCreateIssueModal = closeCreateIssueModal;
  });
  
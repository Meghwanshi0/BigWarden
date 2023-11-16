document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('createIssueModal');
  
    function openCreateIssueModal() {
      modal.style.display = 'block';
      setTimeout(() => {
        modal.classList.add('show');
      }, 100); // Add a delay of 100 milliseconds
    }
  
    function closeCreateIssueModal() {
      modal.classList.remove('show');
  
      setTimeout(() => {
        modal.style.display = 'none';
      }, 500); // Wait for the transition to complete before hiding
    }
  
    window.openCreateIssueModal = openCreateIssueModal;
    window.closeCreateIssueModal = closeCreateIssueModal;
  });
  
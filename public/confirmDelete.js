const formDelete = document.querySelector("#form-delete");
formDelete.addEventListener("submit", (event) => {
  const confirmDelete = confirm("Deseja Deletar?");
  if (!confirmDelete) {
    event.preventDefault();
  }
});

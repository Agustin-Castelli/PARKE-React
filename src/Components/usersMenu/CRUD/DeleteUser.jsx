

const DeleteUser = () => {
    const deleteUserHandler = (id) => {
        if (!id) {
          setErrorMsg("No se puede eliminar el usuario. ID no válido.");
          return;
        }
        fetch(`https://localhost:7016/api/User/${id}`, {
          method: "DELETE",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        })
          .then(() => {
            toggleChange();
            setSuccessMsg(`Producto ${id} eliminado satisfactoriamente.`);
            setProductSearched(null); // Limpiar el producto buscado
          })
          .catch((error) => {
            console.error(error);
            setErrorMsg("No se pudo eliminar el producto.");
          });
      };
}

export default DeleteUser;
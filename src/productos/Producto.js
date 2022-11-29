import { useState, useEffect } from "react";
import { destroy, getAll } from "../servicios/Producto.service";
import CrearProducto from "./componentes/CrearProducto";

const Producto = () => {
  const [productos, setProducto] = useState([]);

  const handleDelete = async (id) => {
    const { message } = await destroy(id);
    if (message === "¡Eliminación éxitosa!") {
      getProductos();
      alert("Producto eliminado con exito.");
    } else {
      alert("Ha ocurrido un error inesperado.");
    }
  };

  const getProductos = () => {
    (async () => {
      const prod = await getAll();
      setProducto(prod);
    })();
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12 my-3">
            <button
              className="btn btn-success"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Crear
            </button>
          </div>
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col" className="text-center">
                      Cantidad Disponible
                    </th>
                    <th scope="col" className="text-right">
                      Valor Unitario
                    </th>
                    <th scope="col" className="text-right">
                      Fecha Registro
                    </th>
                    <th scope="col" className="text-right">
                      Acción
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {productos.map((producto, i) => (
                    <tr key={producto.id}>
                      <th scope="row">{i + 1}</th>
                      <td>{producto.nombre}</td>
                      <td className="text-center">
                        {producto.cantidadDisponible}
                      </td>
                      <td className="text-right">{producto.valorUnitario}</td>
                      <td className="text-right">{producto.createdAt}</td>
                      <td className="text-right">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(producto.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <CrearProducto eventEmitter={getProductos} />
    </>
  );
};

export default Producto;

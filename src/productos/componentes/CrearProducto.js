import { useState } from "react";
import { store } from "../../servicios/Producto.service";

const CrearProducto = ({ eventEmitter }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [producto, setProducto] = useState({
    nombre: null,
    cantidadDisponible: null,
    valorUnitario: null,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await store(producto);
      setIsLoading(false);
      eventEmitter();
      setProducto({
        nombre: null,
        cantidadDisponible: null,
        valorUnitario: null,
      });
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleInputChange = ({ target }) => {
    setProducto({
      ...producto,
      [target.name]: target.value,
    });
  };

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <form className="modal-dialog" onSubmit={onSubmit}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Producto nuevo
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                name="nombre"
                type="text"
                className="form-control"
                id="nombre"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cantidadDisponible">Cantidad Disponible:</label>
              <input
                name="cantidadDisponible"
                type="text"
                className="form-control"
                id="cantidadDisponible"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="valorUnitario">Valor Unitario</label>
              <input
                name="valorUnitario"
                type="text"
                className="form-control"
                id="valorUnitario"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Cerrar
            </button>
            <button type="submit" className="btn btn-primary">
              {isLoading ? "Cargando..." : "Guardar"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CrearProducto;

import React, { useState } from 'react';
import { Modal, Form, Alert, Table, Row, Col } from 'react-bootstrap';
import useProducts from '../../hooks/useProducts';
import Button from '../atoms/Button';
import PriceTag from '../atoms/PriceTag';
import Badge from '../atoms/Badge';
import { PlusIcon, TrashIcon } from '../../assets/icons/Icons';
import useToast from '../../hooks/useToast';

/**
 * Organism: AdminProductTable
 * Panel de administración para gestión y CRUD en memoria de productos.
 * Soporta responsive design (tabla deslizable / vista en tarjetas),
 * validaciones en tiempo real y asignación de imagen por defecto.
 */
export const AdminProductTable = () => {
  const { products, addProduct, deleteProduct } = useProducts();
  const { showToast } = useToast();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: 'Herramientas Manuales',
    precio: '',
    stock: '',
    unidadMedida: 'Unidad',
    descripcion: '',
    imagen: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateProduct = (name, value) => {
    let error = '';
    if (name === 'nombre' && !value.trim()) {
      error = 'El nombre del producto es obligatorio.';
    }
    if (name === 'precio') {
      if (value === '' || value === null || value === undefined) {
        error = 'El precio es obligatorio.';
      } else if (Number(value) <= 0) {
        error = 'El precio debe ser un número positivo mayor a 0.';
      }
    }
    if (name === 'stock') {
      if (value === '' || value === null || value === undefined) {
        error = 'El stock es obligatorio.';
      } else if (parseInt(value, 10) < 0) {
        error = 'El stock no puede ser negativo.';
      }
    }
    if (name === 'unidadMedida' && !value) {
      error = 'La unidad de medida es requerida.';
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateProduct(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleOpenModal = () => {
    setFormData({
      nombre: '',
      categoria: 'Herramientas Manuales',
      precio: '',
      stock: '',
      unidadMedida: 'Unidad',
      descripcion: '',
      imagen: '',
    });
    setErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameErr = validateProduct('nombre', formData.nombre);
    const priceErr = validateProduct('precio', formData.precio);
    const stockErr = validateProduct('stock', formData.stock);
    const unitErr = validateProduct('unidadMedida', formData.unidadMedida);

    if (nameErr || priceErr || stockErr || unitErr) {
      setErrors({
        nombre: nameErr,
        precio: priceErr,
        stock: stockErr,
        unidadMedida: unitErr,
      });
      return;
    }

    // Agregar producto en memoria
    const created = addProduct({
      nombre: formData.nombre,
      categoria: formData.categoria,
      precio: Number(formData.precio),
      stock: Number(formData.stock),
      unidadMedida: formData.unidadMedida,
      descripcion: formData.descripcion,
      imagen: formData.imagen,
    });

    setSuccessMessage(`Producto "${created.nombre}" creado exitosamente.`);
    showToast({
      title: '🛠️ Nuevo Producto',
      message: `El producto "${created.nombre}" se agregó al inventario con éxito.`,
      variant: 'success',
    });
    handleCloseModal();

    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };

  const handleDeleteProduct = (prod) => {
    deleteProduct(prod.id);
    showToast({
      title: '🗑️ Producto Eliminado',
      message: `"${prod.nombre}" ha sido eliminado del catálogo.`,
      variant: 'danger',
    });
  };

  return (
    <div className="admin-product-management">
      {/* Barra de Herramientas Superior */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px',
          marginBottom: '20px',
        }}
      >
        <div>
          <h3 style={{ margin: 0, color: 'var(--azul-oscuro)', fontWeight: '700' }}>
            Inventario de Productos ({products.length})
          </h3>
          <p style={{ margin: 0, color: 'var(--texto-mutado)', fontSize: '0.9rem' }}>
            Gestiona altas, bajas y existencias en tiempo real dentro del catálogo en memoria.
          </p>
        </div>

        <Button
          type="button"
          variant="primary"
          onClick={handleOpenModal}
          data-testid="btn-add-product"
        >
          <PlusIcon size={18} /> Nuevo Producto
        </Button>
      </div>

      {successMessage && (
        <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      {/* Tabla Adaptativa para Pantallas Medianas/Grandes */}
      <div
        className="admin-table-container"
        style={{
          backgroundColor: 'var(--blanco)',
          borderRadius: '12px',
          border: '1px solid var(--borde-suave)',
          overflow: 'hidden',
          boxShadow: 'var(--sombra-card)',
        }}
      >
        <Table responsive hover className="mb-0 align-middle">
          <thead style={{ backgroundColor: 'var(--azul-claro)', color: 'var(--azul-oscuro)' }}>
            <tr>
              <th style={{ padding: '14px 16px' }}>Producto</th>
              <th>Categoría</th>
              <th>Unidad de Venta</th>
              <th>Precio Unitario</th>
              <th>Stock</th>
              <th style={{ textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} data-testid={`admin-row-${prod.id}`}>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={prod.imagen}
                      alt={prod.nombre}
                      style={{
                        width: '45px',
                        height: '45px',
                        objectFit: 'contain',
                        borderRadius: '6px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid var(--borde-suave)',
                      }}
                      onError={(e) => {
                        e.currentTarget.src = '/images/LOGO-removebg-preview.png';
                      }}
                    />
                    <div>
                      <strong style={{ color: 'var(--azul-oscuro)', display: 'block' }}>{prod.nombre}</strong>
                      <small style={{ color: 'var(--texto-mutado)' }}>ID: {prod.id}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <Badge variant="category">{prod.categoria}</Badge>
                </td>
                <td>
                  <span style={{ fontWeight: '500' }}>{prod.unidadMedida || 'Unidad'}</span>
                </td>
                <td>
                  <PriceTag price={prod.precio} size="sm" />
                </td>
                <td>
                  <Badge variant={prod.stock > 10 ? 'stock' : prod.stock > 0 ? 'lowstock' : 'danger'}>
                    {prod.stock} disp.
                  </Badge>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(prod)}
                    aria-label={`Eliminar producto ${prod.nombre}`}
                    data-testid={`btn-delete-${prod.id}`}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--rojo-error)',
                      cursor: 'pointer',
                      padding: '6px',
                      borderRadius: '6px',
                    }}
                    title="Eliminar del catálogo"
                  >
                    <TrashIcon size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal para Registrar Nuevo Producto */}
      <Modal show={showModal} onHide={handleCloseModal} centered backdrop="static" size="lg">
        <Modal.Header closeButton style={{ backgroundColor: 'var(--azul-oscuro)', color: '#ffffff' }}>
          <Modal.Title style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            🛠️ Registrar Nuevo Producto
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit} noValidate>
          <Modal.Body style={{ backgroundColor: 'var(--blanco)', padding: '24px' }}>
            <p style={{ fontSize: '0.88rem', color: 'var(--texto-mutado)', marginBottom: '16px' }}>
              Complete los datos del producto. Si no ingresa una URL de imagen, el sistema asignará automáticamente la imagen corporativa por defecto de Ferretería Los Maestros.
            </p>

            {/* Nombre */}
            <Form.Group className="mb-3" controlId="prod-nombre">
              <Form.Label className="form-label-custom">Nombre del Producto *</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                placeholder="Ej: Llave Francesa Ajustable 10 pulgadas"
                value={formData.nombre}
                onChange={handleChange}
                isInvalid={Boolean(errors.nombre)}
                className="form-input-custom"
                required
              />
              <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
            </Form.Group>

            <Row>
              {/* Categoría */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="prod-categoria">
                  <Form.Label className="form-label-custom">Categoría *</Form.Label>
                  <Form.Select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    className="form-select-custom"
                  >
                    <option value="Herramientas Manuales">Herramientas Manuales</option>
                    <option value="Herramientas Eléctricas">Herramientas Eléctricas</option>
                    <option value="Fijaciones">Fijaciones y Tornillos</option>
                    <option value="Construcción">Materiales de Construcción</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Unidad de Medida (Contexto Obligatorio) */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="prod-unidadMedida">
                  <Form.Label className="form-label-custom">Unidad de Medida / Venta *</Form.Label>
                  <Form.Select
                    name="unidadMedida"
                    value={formData.unidadMedida}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.unidadMedida)}
                    className="form-select-custom"
                    required
                  >
                    <option value="Unidad">Unidad (ud)</option>
                    <option value="Kilo">Kilo (kg)</option>
                    <option value="Caja">Caja (cj)</option>
                    <option value="Metro">Metro (m)</option>
                    <option value="Tira">Tira (tr)</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.unidadMedida}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              {/* Precio */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="prod-precio">
                  <Form.Label className="form-label-custom">Precio ($ CLP) *</Form.Label>
                  <Form.Control
                    type="number"
                    name="precio"
                    min="1"
                    placeholder="Ej: 12990"
                    value={formData.precio}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.precio)}
                    className="form-input-custom"
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.precio}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              {/* Stock */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="prod-stock">
                  <Form.Label className="form-label-custom">Stock Inicial *</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    min="0"
                    placeholder="Ej: 20"
                    value={formData.stock}
                    onChange={handleChange}
                    isInvalid={Boolean(errors.stock)}
                    className="form-input-custom"
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.stock}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* URL Imagen (Opcional) */}
            <Form.Group className="mb-3" controlId="prod-imagen">
              <Form.Label className="form-label-custom">URL de la Imagen (Opcional)</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                placeholder="Dejar vacío para asignar imagen corporativa por defecto"
                value={formData.imagen}
                onChange={handleChange}
                className="form-input-custom"
              />
              <Form.Text style={{ color: 'var(--texto-mutado)', fontSize: '0.8rem' }}>
                Si no se especifica, se asignará automáticamente el logo/imagen oficial de ferretería.
              </Form.Text>
            </Form.Group>

            {/* Descripción */}
            <Form.Group className="mb-2" controlId="prod-descripcion">
              <Form.Label className="form-label-custom">Descripción Detallada</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                placeholder="Indique características técnicas, usos recomendados y especificaciones."
                value={formData.descripcion}
                onChange={handleChange}
                className="form-input-custom"
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer style={{ backgroundColor: 'var(--gris-fondo)' }}>
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" data-testid="btn-submit-product">
              Guardar en Catálogo
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProductTable;

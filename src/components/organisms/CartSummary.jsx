import React, { useState } from 'react';
import { Modal, Form, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';
import PriceTag from '../atoms/PriceTag';
import Button from '../atoms/Button';
import DeliverySelector, { DELIVERY_OPTIONS } from '../molecules/DeliverySelector';
import { CheckIcon } from '../../assets/icons/Icons';

/**
 * Organism: CartSummary
 * Resumen del carrito, cotizador de despacho (Retiro, Estándar, Express),
 * desglose de impuestos (IVA 19%), formulario de facturación comercial y checkout
 */
export const CartSummary = () => {
  const { cart, totalAmount, neto, iva, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [selectedDelivery, setSelectedDelivery] = useState('pickup');
  const currentDelivery = DELIVERY_OPTIONS.find((o) => o.id === selectedDelivery) || DELIVERY_OPTIONS[0];
  const deliveryCost = cart.length > 0 ? currentDelivery.precio : 0;
  const finalTotal = totalAmount + deliveryCost;

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutFinished, setCheckoutFinished] = useState(false);
  const [billingData, setBillingData] = useState({
    nombre: user?.nombre || '',
    rut: user?.rut || '',
    tipoCliente: user?.tipoCliente || 'Particular',
    giro: user?.giro || 'Construcción',
    metodoPago: 'Transferencia Bancaria',
    despacho: 'Retiro en tienda (Gratis)',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleOpenCheckout = () => {
    setBillingData((prev) => ({
      ...prev,
      despacho: `${currentDelivery.nombre} (${currentDelivery.etiqueta})`,
    }));
    setShowCheckoutModal(true);
    setCheckoutFinished(false);
  };

  const handleCloseCheckout = () => {
    setShowCheckoutModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();

    const errors = {};
    if (!billingData.nombre.trim()) errors.nombre = 'Ingrese el nombre o razón social.';
    if (!billingData.rut.trim()) errors.rut = 'Ingrese el RUT o identificación tributaria.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setCheckoutFinished(true);
    setTimeout(() => {
      clearCart();
    }, 1500);
  };

  return (
    <div
      className="cart-summary-card"
      style={{
        backgroundColor: 'var(--blanco)',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid var(--borde-suave)',
        boxShadow: 'var(--sombra-card)',
      }}
    >
      <h3 style={{ margin: '0 0 16px', color: 'var(--azul-oscuro)', fontSize: '1.25rem', fontWeight: '700' }}>
        Resumen de Compra
      </h3>

      {/* Cotizador y Selector de Despacho */}
      <DeliverySelector
        selectedDelivery={selectedDelivery}
        onSelectDelivery={setSelectedDelivery}
      />

      {/* Desglose de Precios */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.95rem' }}>
        <span style={{ color: 'var(--texto-mutado)' }}>Monto Neto:</span>
        <span style={{ fontWeight: '600' }}>
          ${neto.toLocaleString('es-CL')}
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.95rem' }}>
        <span style={{ color: 'var(--texto-mutado)' }}>IVA (19%):</span>
        <span style={{ fontWeight: '600' }}>
          ${iva.toLocaleString('es-CL')}
        </span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '0.95rem' }}>
        <span style={{ color: 'var(--texto-mutado)' }}>Despacho:</span>
        <span
          style={{
            color: deliveryCost === 0 ? 'var(--verde-exito)' : 'var(--naranja-rojo)',
            fontWeight: '700',
          }}
        >
          {deliveryCost === 0 ? 'Gratis ($0)' : `+$${deliveryCost.toLocaleString('es-CL')}`}
        </span>
      </div>

      <hr style={{ borderColor: 'var(--borde-suave)', margin: '14px 0' }} />

      {/* Total a Pagar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <strong style={{ fontSize: '1.1rem', color: 'var(--azul-oscuro)' }}>Total a Pagar:</strong>
        <PriceTag price={finalTotal} size="lg" />
      </div>

      {/* Botón de Checkout */}
      <Button
        type="button"
        variant="primary"
        disabled={cart.length === 0}
        onClick={handleOpenCheckout}
        style={{ width: '100%', padding: '14px' }}
      >
        Proceder al Pago / Facturación
      </Button>

      <div style={{ textAlign: 'center', marginTop: '14px' }}>
        <Link to="/productos" style={{ color: 'var(--azul-medio)', fontSize: '0.88rem', textDecoration: 'none' }}>
          ← Continuar comprando herramientas
        </Link>
      </div>

      {/* Modal React Bootstrap para Checkout & Facturación Ferretera */}
      <Modal show={showCheckoutModal} onHide={handleCloseCheckout} centered backdrop="static" size="lg">
        <Modal.Header closeButton style={{ backgroundColor: 'var(--azul-oscuro)', color: '#ffffff' }}>
          <Modal.Title style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            🧾 Finalizar Compra - Ferretería Los Maestros
          </Modal.Title>
        </Modal.Header>

        {checkoutFinished ? (
          <Modal.Body style={{ padding: '40px 24px', textAlign: 'center', backgroundColor: 'var(--blanco)' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#dcfce7',
                color: '#16a34a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              <CheckIcon size={32} />
            </div>
            <h3 style={{ color: 'var(--azul-oscuro)', marginBottom: '8px' }}>
              ¡Orden Confirmada con Éxito!
            </h3>
            <p style={{ color: 'var(--texto-mutado)', maxWidth: '450px', margin: '0 auto 16px' }}>
              Hemos emitido la boleta/factura electrónica para <strong>{billingData.nombre}</strong> (RUT: {billingData.rut}) por un total de <strong>${finalTotal.toLocaleString('es-CL')}</strong>.
            </p>
            <Alert variant="info" style={{ textAlign: 'left', fontSize: '0.88rem' }}>
              <strong>Datos de despacho:</strong> {billingData.despacho}<br />
              <strong>Método de pago:</strong> {billingData.metodoPago}<br />
              <strong>Giro comercial:</strong> {billingData.giro}
            </Alert>
            <div style={{ marginTop: '20px' }}>
              <Button
                type="button"
                variant="primary"
                onClick={() => {
                  handleCloseCheckout();
                  navigate('/');
                }}
              >
                Volver al Inicio
              </Button>
            </div>
          </Modal.Body>
        ) : (
          <Form onSubmit={handleConfirmOrder}>
            <Modal.Body style={{ backgroundColor: 'var(--blanco)', padding: '24px' }}>
              <h5 style={{ color: 'var(--azul-oscuro)', marginBottom: '14px', fontWeight: '600' }}>
                Datos de Facturación del Rubro
              </h5>

              <Row>
                <Col md={7}>
                  <Form.Group className="mb-3" controlId="check-nombre">
                    <Form.Label className="form-label-custom">Nombre o Razón Social *</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre"
                      value={billingData.nombre}
                      onChange={handleInputChange}
                      isInvalid={Boolean(formErrors.nombre)}
                      placeholder="Ej: Constructora San Juan SpA"
                      className="form-input-custom"
                      required
                    />
                    <Form.Control.Feedback type="invalid">{formErrors.nombre}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group className="mb-3" controlId="check-rut">
                    <Form.Label className="form-label-custom">RUT / Identificación *</Form.Label>
                    <Form.Control
                      type="text"
                      name="rut"
                      value={billingData.rut}
                      onChange={handleInputChange}
                      isInvalid={Boolean(formErrors.rut)}
                      placeholder="76.123.456-7"
                      className="form-input-custom"
                      required
                    />
                    <Form.Control.Feedback type="invalid">{formErrors.rut}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="check-tipoCliente">
                    <Form.Label className="form-label-custom">Tipo de Cliente (Rubro) *</Form.Label>
                    <Form.Select
                      name="tipoCliente"
                      value={billingData.tipoCliente}
                      onChange={handleInputChange}
                      className="form-select-custom"
                    >
                      <option value="Particular">Particular</option>
                      <option value="Contratista">Contratista</option>
                      <option value="Empresa">Empresa</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="check-giro">
                    <Form.Label className="form-label-custom">Giro u Oficio *</Form.Label>
                    <Form.Select
                      name="giro"
                      value={billingData.giro}
                      onChange={handleInputChange}
                      className="form-select-custom"
                    >
                      <option value="Construcción">Construcción</option>
                      <option value="Carpintería">Carpintería</option>
                      <option value="Electricidad">Electricidad</option>
                      <option value="Gasfitería">Gasfitería</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="check-pago">
                    <Form.Label className="form-label-custom">Método de Pago</Form.Label>
                    <Form.Select
                      name="metodoPago"
                      value={billingData.metodoPago}
                      onChange={handleInputChange}
                      className="form-select-custom"
                    >
                      <option value="Transferencia Bancaria">Transferencia Bancaria Inmediata</option>
                      <option value="Tarjeta de Débito/Crédito (WebPay)">Tarjeta de Débito / Crédito</option>
                      <option value="Efectivo contra entrega">Pago en Caja / Sucursal</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="check-despacho">
                    <Form.Label className="form-label-custom">Modalidad de Despacho</Form.Label>
                    <Form.Select
                      name="despacho"
                      value={billingData.despacho}
                      onChange={handleInputChange}
                      className="form-select-custom"
                    >
                      {DELIVERY_OPTIONS.map((opt) => (
                        <option key={opt.id} value={`${opt.nombre} (${opt.etiqueta})`}>
                          {opt.nombre} ({opt.etiqueta})
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <div
                style={{
                  backgroundColor: 'var(--azul-claro)',
                  padding: '14px',
                  borderRadius: '8px',
                  marginTop: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <small style={{ color: 'var(--azul-medio)', display: 'block' }}>Total de la compra (IVA y Despacho incluido):</small>
                  <PriceTag price={finalTotal} size="lg" />
                </div>
                <small style={{ color: 'var(--texto-mutado)' }}>{cart.length} tipo(s) de productos</small>
              </div>
            </Modal.Body>

            <Modal.Footer style={{ backgroundColor: 'var(--gris-fondo)' }}>
              <Button type="button" variant="outline" onClick={handleCloseCheckout}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                Confirmar y Emitir Orden
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default CartSummary;

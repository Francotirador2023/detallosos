import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderNotification(orderData: any) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY no configurada. Saltando envío de correo.');
        return;
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Detallosos <pedidos@resend.dev>', // Usar dominio verificado en prod
            to: ['jonyrivera.jr@gmail.com'], // Cambiar al correo del admin
            subject: `Nuevo Pedido - ${orderData.customerName}`,
            html: `
                <h1>Nuevo Pedido Recibido</h1>
                <p><strong>Cliente:</strong> ${orderData.customerName}</p>
                <p><strong>Teléfono:</strong> ${orderData.phone}</p>
                <p><strong>Dirección:</strong> ${orderData.address}</p>
                <p><strong>Fecha de Entrega:</strong> ${orderData.deliveryDate || 'No especificada'}</p>
                <p><strong>Dedicatoria:</strong> ${orderData.message || 'Sin mensaje'}</p>
                
                <h2>Productos</h2>
                <ul>
                    ${orderData.items.map((item: any) => `
                        <li>${item.name} x${item.quantity} - S/ ${(item.price * item.quantity).toFixed(2)}</li>
                    `).join('')}
                </ul>
                
                <p><strong>Total Estimado:</strong> S/ ${orderData.total.toFixed(2)}</p>
                <br/>
                <p><a href="https://wa.me/${orderData.phone.replace(/\D/g, '')}">Contactar Cliente por WhatsApp</a></p>
            `,
        });

        if (error) {
            console.error('Error enviando correo:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Error inesperado al enviar correo:', err);
        return { success: false, error: err };
    }
}

export async function sendComplaintNotification(complaintData: any) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY no configurada. Saltando envío de correo.');
        return;
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Detallosos <reclamaciones@resend.dev>',
            to: ['jonyrivera.jr@gmail.com'],
            subject: `Nueva Reclamación - ${complaintData.fullName}`,
            html: `
                <h1>Nueva Hoja de Reclamaciones</h1>
                <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-PE')}</p>
                <hr/>
                <h2>Información del Consumidor</h2>
                <p><strong>Nombre completo:</strong> ${complaintData.fullName}</p>
                <p><strong>DNI/CE:</strong> ${complaintData.documentId}</p>
                <p><strong>Email:</strong> ${complaintData.email}</p>
                <p><strong>Teléfono:</strong> ${complaintData.phone}</p>
                <p><strong>Dirección:</strong> ${complaintData.address}</p>
                
                <h2>Detalle de la Reclamación</h2>
                <p><strong>Tipo:</strong> ${complaintData.type === 'reclamo' ? 'Reclamo' : 'Queja'}</p>
                <p><strong>Número de Pedido/Referencia:</strong> ${complaintData.orderNumber || 'No proporcionado'}</p>
                <p><strong>Detalle del bien contratado:</strong> ${complaintData.contractedDetail}</p>
                <p><strong>Detalle de la queja o reclamo:</strong> ${complaintData.claimDetail}</p>
                <p><strong>Pedido del consumidor:</strong> ${complaintData.customerRequest}</p>
                <br/>
                <p>Este es un registro automático del Libro de Reclamaciones Virtual.</p>
            `,
        });

        if (error) {
            console.error('Error enviando correo de reclamación:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Error inesperado al enviar correo de reclamación:', err);
        return { success: false, error: err };
    }
}

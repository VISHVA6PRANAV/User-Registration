import QRCode from 'qrcode';

export async function generateQr(data) {
  // Returns a data URL for PNG QR code
  return await QRCode.toDataURL(JSON.stringify(data), { errorCorrectionLevel: 'M' });
}

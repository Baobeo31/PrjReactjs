const qs = require('qs');
const moment = require('moment');
const {
  vnp_TmnCode,
  vnp_Url,
  vnp_ReturnUrl,
  sortObject,
  createSecureHash,
} = require('../utils/vnpay');

const createVNPayPaymentUrl = async (order) => {
  const date = new Date();
  const createDate = moment(date).format('YYYYMMDDHHmmss');
  const orderId = moment(date).format('HHmmss');

  const ipAddr = '127.0.0.1'; // Nếu dùng thật, lấy từ req.ip

  const amount = order.totalPrice * 100;

  const vnp_Params = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode,
    vnp_Locale: 'vn',
    vnp_CurrCode: 'VND',
    vnp_TxnRef: orderId,
    vnp_OrderInfo: `DonHang-${order._id}`,
    vnp_OrderType: 'other',
    vnp_Amount: amount,
    vnp_ReturnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
    vnp_BankCode: 'NCB',
  };

  const sortedParams = sortObject(vnp_Params);
  const secureHash = createSecureHash(sortedParams);
  sortedParams.vnp_SecureHash = secureHash;

  const paymentUrl = `${vnp_Url}?${qs.stringify(sortedParams, { encode: false })}`;

  return paymentUrl;
};
const verifyVNpayreturn = (query) => {
  const { vnp_SecureHash, ...rest } = query
  const sortParams = sortObject(rest)
  const secureHash = createSecureHash(sortParams)
  return secureHash === vnp_SecureHash
}



module.exports = {
  createVNPayPaymentUrl,
  verifyVNpayreturn
};

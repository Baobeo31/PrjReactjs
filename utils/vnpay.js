const crypto = require('crypto')

const vnp_TmnCode = process.env.VNP_TMNCODE;
const vnp_HashSecret = process.env.VNP_HASHSECRET;
const vnp_Url = process.env.VNP_URL;
const vnp_ReturnUrl = process.env.VNP_RETURNURL;


const sortObject = (obj) => {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  keys.forEach((key) => {
    sorted[key] = obj[key];
  })
  return sorted
  // Sắp xếp thứ tự key trong object theo bảng chữ cái
  // Vnpay yếu cầu thứ tự đúng để có thể hash
}


const createSecureHash = (params) => {
  const { vnp_SecureHash, ...dataForHash } = params;

  const sorted = sortObject(dataForHash);

  // Dùng qs.stringify để đảm bảo escape đúng, giữ nguyên encode: false
  const signData = require('qs').stringify(sorted, { encode: false });

  const hash = crypto.createHmac('sha512', vnp_HashSecret);
  return hash.update(signData).digest('hex');
};



module.exports = {
  vnp_TmnCode,
  vnp_Url,
  vnp_ReturnUrl,
  vnp_HashSecret,
  sortObject,
  createSecureHash
}
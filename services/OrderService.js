const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { orderItems, paymethod, itemsPrice, shippingPrice, totalPrice, fullname, address, city, phone, user, isPaid, paidAt, email } = newOrder;
      const promise = orderItems.map(async (item) => {
        const productData = await Product.findOneAndUpdate(
          //FindOneAndUpdate tìm kiếm sản phẩm theo ID và cập nhật số lượng tồn kho
          {
            _id: item.product,
            countInStock: { $gte: item.quantity }
          }, //filter
          // Nếu sản phẩm tồn tại và số lượng tồn kho đủ, thì cập nhật số lượng
          {
            $inc: {
              countInStock: -item.quantity,
              selled: +item.quantity
            }
            //Đây là cách cập nhật số lượng tồn kho và số lượng đã bán
          },
          { new: true } // new: true trả về tài liệu đã cập nhật
        )
        if (productData) {
          return {
            status: 'OK',
            message: 'Trả về thành công',
            data: productData
          }
        } else {
          return {
            status: 'ERROR',
            message: 'Sản phẩm không đủ số lượng tồn kho',
            id: item.product
          }
        }

      })
      const result = await Promise.all(promise); // Chờ tất cả các sản phẩm được cập nhật 
      const newData = result && result.filter(item => item.id); // Lọc ra các kết quả không null, nếu không có kết quả nào thì trả về mảng rỗng
      if (newData.length) {
        const arrId = []
        newData.forEach(item => {
          arrId.push(item._id) // Lấy ID của các sản phẩm đã cập nhật
          resolve({
            status: 'ERROR',
            message: `Sản phẩm với id ${item.id} không tồn tại`
          })
        })
      } else { // Không có sản phẩm nào hết hàng, đầy đủ số lượng tồn kho
        const createOrder = await Order.create({
          orderItems,
          shippingAddress: {
            fullname,
            address,
            city,
            phone
          },
          paymethod,
          itemsPrice,
          shippingPrice,
          totalPrice,
          user: user,
          isPaid,
          paidAt
        })
        if (createOrder) {
          return resolve({
            status: 'OK',
            message: 'Tạo đơn hàng thành công'
          })
        }
      }
    }
    catch (error) {
      reject(error)
    }
  })
}

const getALlOrderDetail = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const orders = await Order.find({ user: userId })
      if (!orders) {
        return resolve({
          status: 'ERROR',
          message: 'Không có đơn hàng nào'
        })
      }
      return resolve({
        stattus: 'OK',
        message: "Lấy danh sách đơn hàng thành công",
        data: orders
      })
    } catch (error) {
      return reject(error.message)
    }
  })
}

const getOrderDetail = (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById(orderId)
      if (!order) {
        return resolve({
          status: 'ERROR',
          message: 'Không tìm thấy đơn hàng'
        })
      }
      return resolve({
        status: 'OK',
        message: 'Lấy chi tiết đơn hàng thành công',
        data: order
      })
    } catch (error) {
      return reject(error.message)
    }
  })
}
const cancelOrder = (orderId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const promise = data.map(async (item) => { //Duyệt từng sản phẩm trong đơn hàng
        const productData = await Product.findOneAndUpdate({
          _id: item.product,
          countInStock: { $gte: item.quantity }// Kiểm tra sản phẩm có tồn tại và số lượng tồn kho đủ
        },
          {
            $inc: {
              countInStock: +item.quantity, // Cập nhật số lượng tồn kho
              selled: -item.quantity // Cập nhật số lượng đã bán
            }
          },
          {
            new: true
          })
        if (productData) {
          const deleteOrder = await Order.findByIdAndDelete(orderId) // Xóa đơn hàng
          if (!deleteOrder) {
            return resolve({
              status: 'ERROR',
              message: 'Không tìm thấy đơn hàng để hủy'
            })
          }
        } else {
          return resolve({
            status: 'Err',
            message: 'Error',
            id: item.product
          })
        }
      })
      const result = await Promise.all(promise); // Trả về kết quả của tất cả các sản phẩm đã cập nhật
      const newData = result && result[0] && result[0].id; // Lấy ID của sản phẩm đầu tiên
      if (newData) {
        return resolve({
          status: 'ERR',
          message: `Sản phẩm với id ${newData} không tồn tại`
        })
      }
      resolve({
        status: 'OK',
        message: 'Xóa đơn hàng thành công',
        data: newData
      })
    } catch (error) {
      return reject({
        status: 'ERROR',
        message: 'Hủy đơn hàng thất bại: ' + error.message
      })
    }
  })

}
const getAllOrder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const orders = await Order.find()
      return resolve({
        status: 'OK',
        message: 'Lấy danh sách đơn hàng thành công',
        data: orders
      })
    } catch (error) {
      return reject(error.message)
    }
  })
}


module.exports = {
  createOrder,
  getALlOrderDetail,
  getOrderDetail,
  cancelOrder,
  getAllOrder
}
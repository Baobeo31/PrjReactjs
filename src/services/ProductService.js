import axios from "axios";

export const getAllProduct = async ({ limit, page, sort, filter }) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`, {
    params: {
      limit,
      page,
      sort,
      filter: JSON.stringify(filter)
    }
  });
  return res.data;
};
export const getProductDetail = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-detail/${id}`)
  return res.data.data
}

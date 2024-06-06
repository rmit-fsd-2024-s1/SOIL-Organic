//repository.js
import axios from "axios";

// --- Constants
const API_HOST = "http://localhost:4000";

// --- User
async function verifyUser(email, password) {
  try {
    const response = await axios.get(`${API_HOST}/api/users/login`, { params: { email, password } });
    return response.data;
  } catch (error) {
    console.error('Error verifying user:', error);
    throw error;
  }
}

async function findByEmail(email) {
  try {
    const response = await axios.get(`${API_HOST}/api/users/email`, { params: { email } });
    return response.data;
  } catch (error) {
    // Check if the error response status is 404 (User not found)
    if (error.response && error.response.status === 404) {
      return null;
    }
    console.error('Error finding user by email:', error);
    throw error;
  }
}

async function updateUser(userEmail, user) {
  try {
    const response = await axios.put(`${API_HOST}/api/users/${userEmail}`, user);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

async function deleteUser(userEmail) {
  try {
    const response = await axios.delete(`${API_HOST}/api/users/${userEmail}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

async function createUser(user) {
  try {
    const response = await axios.post(`${API_HOST}/api/users/create`, user);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// --- Products
async function getStandardProducts() {
  const response = await axios.get(API_HOST + "/api/products/standard");
  return response.data;
}

async function getSpecialProducts() {
  const response = await axios.get(API_HOST + "/api/products/special");
  return response.data;
}

async function findItem(item_id){
  const response = await axios.get(API_HOST + `/api/products/select/${item_id}`);
  return response.data;
}

async function createItem(product){
  const response = await axios.post(API_HOST + "/api/products", product);
  return response.data;
}

// --- Reviews
async function getPosts() {
  const response = await axios.get(API_HOST + "/api/posts");
  return response.data;
}

async function createPost(post) {
  const response = await axios.post(API_HOST + "/api/posts", post);
  return response.data;
}

// --- Helper functions to interact with database
async function setUser(user) {
  const response = await axios.post(API_HOST + "/api/users/save", user);
  return response.data;
}

async function getUser(email) {
  try {
    const response = await axios.get(`${API_HOST}/api/users/email`, { params: { email } });
    return response.data;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}

// --- Cart
async function getAllOrders() {
  const response = await axios.get(`${API_HOST}/api/carts`);
  return response.data;
}

async function getUserOrders(userEmail) {
  const response = await axios.get(`${API_HOST}/api/carts/user/${userEmail}`);
  return response.data;
}

async function createOrder(order) {
  const response = await axios.post(`${API_HOST}/api/carts`, order);
  return response.data;
}

async function deleteOrder(orderId) {
  const response = await axios.delete(`${API_HOST}/api/carts/${orderId}`);
  return response.data;
}

async function getOrder(orderId) {
  const response = await axios.get(`${API_HOST}/api/carts/${orderId}`);
  return response.data;
}

export {
  verifyUser, updateUser, deleteUser,findByEmail, createUser,
  getSpecialProducts, getStandardProducts, findItem, createItem,
  getPosts, createPost,
  getUser, setUser,
  getAllOrders, getUserOrders, createOrder, deleteOrder, getOrder
}

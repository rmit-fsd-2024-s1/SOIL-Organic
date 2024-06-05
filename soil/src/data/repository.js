import axios from "axios";
// const {User} = require('./database');

// --- Constants
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User
async function verifyUser(email, password) {
  const response = await axios.get(API_HOST + "/api/users/login", { params: { email, password } });
  const user = response.data;
  
  if(user !== null)
    setUser(user);

  return user;
}

async function findUser(user_id) {
  const response = await axios.get(API_HOST + `/api/users/select/${user_id}`);

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
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

async function createItem(){
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

async function getUser() {
  const response = await axios.get(API_HOST + "/api/users/${user_id}");
  return response.data;
}

async function removeUser() {
  const response = await axios.delete(API_HOST + "/api/users/${user_id}");
  return response.data;
}

export {
  verifyUser, findUser, createUser,
  getSpecialProducts, getStandardProducts, findItem, createItem,
  getPosts, createPost,
  getUser, removeUser, setUser
}

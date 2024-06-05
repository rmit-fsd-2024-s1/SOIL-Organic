const db = require('./src/database');

const products = [
  {
    item_name: "Organic Starwberry",
    image: "https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Our organic strawberries come from organic farms around Victoria and sometimes Queensland, free from any harmful pesticides or herbicides. Along with our whole range of organic fruits and vegetables, we don't keep any fresh produce in storage. All our strawberries arrive fresh from the farm, and then we deliver to your door in Melbourne.",
    price: 12.90,
    sale_price: 12.90,
    save_price: 0,
    quantity: 10000,
    type: 'standard'
  },
  {
    item_name: "Watermelon Seedless",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "This week we have organic seedless watermelon available. Sweet, juicy and super refreshing. Enjoy eating them knowing they are organic and spray-free - so every ounce of this fruit will nourish your body without any harmful chemicals. Watermelons are high in water and fibre. They are full of important electrolytes and help prevent dehydration during our beautiful summer months. They also help to prevent constipation and promote regularity for a healthy digestive tract. When you eat watermelon you are really doing your body a favour!",
    price: 7.50,
    sale_price: 7.50,
    save_price: 0,
    quantity: 10000,
    type: 'standard'
  },
  {
    item_name: "Organic Bananas",
    image: "https://images.unsplash.com/photo-1610911434407-54dbc487af49?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Grab yourself a hand of organic bananas when you place your weekly organic veggie box order. Or we do have 6.5kg boxes of these delicious guys if you need more!",
    price: 7.90,
    sale_price: 7.90,
    save_price: 0,
    quantity: 10000,
    type: 'standard'
  },
  {
    item_name: "Organic Lemon",
    image: "https://cdn.stocksnap.io/img-thumbs/960w/fruit-tree_WRLXCFSSOL.jpg",
    description: "Certified organic lemons. Fresh, tangy and delicious organic lemons ready for you this week - very juicy!",
    price: 10.90,
    sale_price: 6.50,
    save_price: 4.40,
    quantity: 10000,
    type: 'special'
  },
  {
    item_name: "Apple Pink Ladies",
    image: "https://images.unsplash.com/photo-1572166365087-96ac83103260?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Need extra apples?  Enjoy these beautiful Australian organic apples knowing there are no chemicals or additives, just good old-fashioned apples.",
    price: 11.90,
    sale_price: 6.90,
    save_price: 5.00,
    quantity: 10000,
    type: 'special'
  },
  {
    item_name: "Plum Queen Garnet",
    image: "https://images.unsplash.com/photo-1564750497011-ead0ce4b9448?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Queen Garnet Plums are firm, juicy & sweet. These delicious dark purple, organic Queen Garnet Plums are full of amazing antioxidants and of course no chemicals or sprays. This variety of plum originated in Queensland and is known as the superfood plum! They stay on the tree for longer and during that time they develop higher levels of antioxidants. In fact they say one Queen Garnet plum can provide all the antioxidants you need in a day.",
    price: 9.30,
    sale_price: 5.40,
    save_price: 3.90,
    quantity: 10000,
    type: 'special'
  },
];

const seedProducts = async () => {
  try {
    await db.product.bulkCreate(products);
    console.log('Products added successfully');
  } catch (error) {
    console.error('Error adding products:', error);
  } finally {
    db.sequelize.close(); // Close the connection after the script runs
  }
};

seedProducts();

<template>
  <div>
    <h5 class="card-header fw-bold">Items for sale:</h5>


    <div class="col-md-12 mt-3 mb-5 p-2">
      <span class="float-end bg-light p-1 px-4">
        <span class="badge badge-pill bg-warning mx-1">{{
          u_val.cart.length
        }}</span>
        <span>
          <button @click="toggleCartModal" class="btn btn-link text-decoration-none btn-sm p-0 mx-1">
            show cart
          </button></span>
      </span>
    </div>

    <div class="table-responsive" v-if="itemsForSale.length">
      <table class="table table-hover table-sm">
        <tbody>
          <tr v-for="item in itemsForSale" :key="item.id">
            <th>Item - {{ item.id }}</th>
            <td><b>Item Name</b> - {{ item.name }}</td>
            <td><b>Price</b> - N{{ item.price }}</td>


            <td v-if="itemExistsOnCart(item.id)">
              <button @click="removeFromCart(item.id)" type="button" class="btn btn-outline-danger btn-sm">
                <i class="bi bi-cart-x"></i> Remove from Cart
              </button>
            </td>
            <td v-else>
              <button @click="addToCart(item)" type="button" class="btn btn-primary btn-sm">
                <i class="bi bi-cart"></i> Add To Cart
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <cartModal v-if="cartModalOpen" @close="toggleCartModal" />
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import cartModal from "@/components/cart/cartModal.vue";

const codeStore = inject("codeStore");
const u_val = codeStore.values;
const itemsForSale = ref([
  {
    id: 1,
    name: "Beans",
    price: 20000,
  },
  {
    id: 2,
    name: "Rice",
    price: 35000,
  },
  {
    id: 3,
    name: "Garri",
    price: 4500,
  },
  {
    id: 4,
    name: "Bread",
    price: 8000,
  },
  {
    id: 5,
    name: "Wheat",
    price: 500,
  },
]);

function addToCart(thisItem) {
  thisItem.qty = 1;
  u_val.cart.push(thisItem);
}

function removeFromCart(id) {
  u_val.cart = u_val.cart.filter((item) => item.id !== id);
}

const itemExistsOnCart = (id) => {
  let itemfound = u_val.cart.some((x) => x.id == id);
  return itemfound ? true : false;
};

//cart
// const cart = ref([])
const cartModalOpen = ref(false);
function toggleCartModal() {
  cartModalOpen.value = cartModalOpen.value == true ? false : true;
}
</script>

<style scoped>
.btn {
  width: 180px;
}
</style>
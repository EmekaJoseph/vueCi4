<template>
  <div>
    <!-- <p> -->
    <h5 class="card-header fw-bold">Items for sale:</h5>
    <!-- </p> -->
    <p class="float-end bg-light mt-1 p-1">
      <b>Cart:</b>
      <span class="badge badge-pill bg-warning mx-1">{{
        u_val.cart.length
        }}</span>
      <span>
        <button @click="toggleCartModal" class="btn btn-link text-decoration-none btn-sm p-0 mx-1">
          open
        </button></span>
    </p>
    <div v-if="itemsForSale.length">
      <table class="table table-hover">
        <tbody>
          <tr v-for="item in itemsForSale" :key="item.id">
            <th>{{ item.id }}</th>
            <td>{{ item.name }}</td>
            <td>N{{ item.price }}</td>
            <td>
              <div v-if="itemExistsOnCart(item.id)">
                <button @click="removeFromCart(item.id)" type="button" style="width: 90px;"
                  class="btn btn-outline-danger btn-sm">
                  Remove
                </button>
              </div>
              <div v-else>
                <button @click="addToCart(item)" type="button" class="btn btn-primary btn-sm">
                  Add To Cart
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <cartModal v-if="cartModalOpen" @close="toggleCartModal" />
    </div>
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

<style lang="scss" scoped>
</style>
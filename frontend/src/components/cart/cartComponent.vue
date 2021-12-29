<template>
    <div>
        <p>
        <h5 class="card-header">Items for sale:</h5>
        </p>
        <p class="float-end">
            <b>Cart:</b>
            <span class="badge badge-pill bg-secondary mx-1">{{u_val.cart.length}}</span>
            <span> <button @click="toggleCartModal" class="btn btn-link btn-sm p-0 mx-1">view cart</button></span>
        </p>
        <div v-if="itemsForSale.length">
            <table class="table table-hover">
                <tbody>
                    <tr v-for="(item) in itemsForSale" :key="item.id">
                        <th>{{item.id}}</th>
                        <td>{{item.name}}</td>
                        <td>N{{item.price}}</td>
                        <td>
                            <div v-if="itemExistsOnCart(item.id)">
                                <button @click="removeFromCart(item.id)" type="button"
                                    class="btn btn-outline-danger btn-sm">Remove fom cart</button>
                            </div>
                            <div v-else>
                                <button @click="addToCart(item.id)" type="button" class="btn btn-primary btn-sm">Add To
                                    Cart</button>
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
    import { ref, inject } from 'vue'
    import cartModal from "@/components/cart/cartModal.vue";


    const codeStore = inject("codeStore");
    const u_val = codeStore.values;
    const itemsForSale = ref([
        {
            id: 1,
            name: 'Beans',
            price: 20000
        },
        {
            id: 2,
            name: 'Rice',
            price: 35000
        },
        {
            id: 3,
            name: 'Garri',
            price: 4500
        },
        {
            id: 4,
            name: 'Bread',
            price: 8000
        }
    ])
    function addToCart(id) {
        let thisItem = itemsForSale.value.find(x => x.id == id)
        thisItem.qty = 1
        u_val.cart.push(thisItem)
        console.log(u_val.cart)
    }
    function removeFromCart(id) {
        const updatedList = u_val.cart.filter(item => item.id !== id)
        u_val.cart = updatedList
    }
    const itemExistsOnCart = (id) => {
        let itemfound = u_val.cart.some((x) => x.id == id)
        return itemfound ? true : false
    }



    //cart
    // const cart = ref([])
    const cartModalOpen = ref(false)
    function toggleCartModal() {
        cartModalOpen.value = (cartModalOpen.value == true) ? false : true
    }

</script>

<style lang="scss" scoped>
</style>
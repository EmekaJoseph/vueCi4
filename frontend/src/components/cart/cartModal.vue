<template>
    <div class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header fw-bold">
                    ITEMS CART
                    <button v-show="u_val.cart.length" @click="u_val.cart = []" class="btn btn-warning btn-sm px-3">
                        empty cart
                    </button>
                </div>
                <div class="modal-body">
                    <div class="text-center" v-if="u_val.cart.length === 0">
                        <h2>Cart is empty</h2>
                    </div>
                    <div class="table-responsive" v-else>
                        <table class="table table-light table-sm">
                            <thead>
                                <tr>
                                    <!-- <th scope="col">S/N</th> -->
                                    <th scope="col">ITEM</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">QTY</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in u_val.cart" :key="index">
                                    <!-- <th scope="row">{{ index + 1 }}</th> -->
                                    <th>{{ item.name }}</th>
                                    <td>{{ item.price }}</td>
                                    <td>
                                        <input @keyup="updateQtyFromInput" :id="item.id" ref="currentInput"
                                            :value="item.qty" style="width: 50px; height: 28px" type="text" />
                                    </td>
                                    <td>
                                        <button @click="item.qty++" class="btn btn-sm p-0 btn-success px-3">
                                            <i class="bx bxs-up-arrow"></i>.
                                        </button>
                                    </td>
                                    <td>
                                        <button :disabled="ifzeroQty(item)" @click="item.qty--"
                                            class="btn btn-sm p-0 btn-dark px-3">
                                            <i class="bx bxs-down-arrow"></i>.
                                        </button>
                                    </td>
                                    <td>
                                        <button @click="removeFromCart(item.id)" class="btn btn-danger btn-sm p-0 px-3">
                                            <i class="bx bx-x"></i>.
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="d-flex justify-content-evenly">
                            <b>Total Amount:</b>
                            <span class="ms-2 w-25 row justify-content-center">
                                <input :value="sumOfPrice()" type="text" class="fw-bold" disabled />
                            </span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button v-show="u_val.cart.length" @click="checkOut" class="btn btn-sm btn-primary">
                        Proceed to checkOut!
                    </button>
                    <button @click="close" class="btn btn-sm btn-secondary">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, inject, watch } from "vue";

    const codeStore = inject("codeStore");
    const u_val = codeStore.values;
    // const u_methd = codeStore.methods;

    //emit
    const emits = defineEmits(["close"]);
    function close() {
        emits("close");
    }

    function removeFromCart(id) {
        u_val.cart = u_val.cart.filter((item) => item.id !== id);
    }

    const sumOfPrice = () => {
        let sum = 0.0;
        u_val.cart.forEach((item) => {
            sum += item.price * item.qty;
        });
        return sum;
    };

    const ifzeroQty = (thisItem) => {
        return thisItem.qty <= 1 ? true : false;
    };

    function updateQtyFromInput(e) {
        let thisItem = u_val.cart.find((x) => x.id == e.target.id);
        thisItem.qty = e.target.value;
    }

    function checkOut() {
        let itemsToBuy = {
            items: u_val.cart,
            total: sumOfPrice(),
        };
        console.log(itemsToBuy);
        close();
    }
</script>

<style scoped>
    .modal {
        display: inline;
        background-color: rgba(0, 0, 0, 0.5);
    }

    input:focus,
    select:focus,
    textarea:focus,
    button:focus {
        outline: none;
        box-shadow: none;
    }
</style>
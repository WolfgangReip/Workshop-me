Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `<div class="product">
  <div class="product-image">
    <img :src="image" :title="titre" alt="Une belle chaussette" />
  </div>
  <div class="product-info">
    <h1>{{ product }}</h1>
    <div>Shipping {{shipping}}</div>
    <p v-if="inventory >= 10">In Stock</p>
    <p v-else-if="inventory > 0">
      Only {{ inventory }} left
    </p>
    <p v-else>Out of Stock</p>

    <div v-for="detail in details">
      <ul>
        <li>{{detail}}</li>
      </ul>
    </div>
    <div
      v-for="(variant, index) in variants"
      :key="variant.variantId"
      class="color-box"
      :style="{ backgroundColor: variant.variantColor }"
      @mouseover="updateProduct(index)"
    ></div>
    <button
      v-on:click="addToCart"
      :disabled="!inStock"
      :class="{ disabledButton: !inStock }"
    >
      Add to Cart
    </button>
    <button v-on:click="resetCart">Reset Cart</button>
    
  </div>
</div>`,
  data() {
    return {
      brand: "Super cheval",
      product: "Happy Horse goes to the beach",
      titre: new Date().toLocaleString(),
      selectedVariant: 0,
      inventory: 4,
      details: [
        "Always Happy",
        "Can always find his way to the nearest beach",
        "15 years old, plenty of years left to make you smile"
      ],
      variants: [
        {
          variantId: 2234,
          variantMood: "Happy",
          variantImage: "./img/download (2).jpeg",
          variantColor: "red"
        },
        {
          variantId: 2235,
          variantMood: "Metal",
          variantImage: "./img/download (1).jpeg",
          variantColor: "black"
        }
      ],
      cart: 0,
      inStock: true
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart");
      this.inventory -= 1;
    },
    updateProduct(index) {
      this.selectedVariant = index;
      console.log(index);
    },
    resetCart() {
      this.$emit("reset-cart");
      this.cart = 0;
    }
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    shipping() {
      if (this.premium) {
        return "free";
      }
      return "2.99";
    }
  },
  watch: {
    inventory() {
      if (this.inventory == 0) {
        this.inStock = false;
      }
    }
  }
});

const app = new Vue({
  el: "#app",

  data: {
    premium: true,
    cart: 0
  },
  methods: {
    updateCard() {
      this.cart += 1;
    },
    resetCart() {
      this.cart = 0;
    }
  }
});

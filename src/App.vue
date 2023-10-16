<template>
  <div id="app">
    <header>
      <!-- <div class="logo">
        <img src="@/assets/CLARA.png" alt="Logo">
      </div>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </nav> -->
    </header>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Arial', sans-serif;
  background-color: #ffffff;
}

nav {
  background-color: transparent;
}

nav a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  margin: 0 15px; /* Adjust spacing between links */
  transition: color 0.3s ease-in-out;
}

nav a.router-link-exact-active {
  color: #6797ff;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 5%;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.logo img {
  max-height: 80px;
}

router-view {
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
</style>

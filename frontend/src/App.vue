<template>
  <div id="app">
    <header>
      <div class="logo">
        <img src="@/assets/CLARA.png" alt="Logo">
      </div>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
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
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
  background-color: #f2f2f2;
}

nav {
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav a {
  text-decoration: none;
  margin: 0 10px;
  color: #333;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
}

nav a.router-link-exact-active {
  color: #42b983;
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
  padding: 15px 400px;
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

<template>
  <header class="app-header">
    <div class="container">
      <div class="navbar-header">
        <a class="navbar-brand logo">
          <i class="iconfont icon-logo"></i>
        </a>
        <form class="header-search search-form" role="search" @submit.stop.prevent="handleSearch">
          <div class="navbar-search">
            <input name="search" id="search" class="search-input"
              ref="searchInput"
              type="search"
              autocomplete="off"
              autofocus="true"
              placeholder="搜索..."
              maxlength="200"
              v-model.trim="keyword"
              @keyup.enter="handleSearch">
            <i class="iconfont icon-search"></i>
          </div>
        </form>
      </div>
      <div class="navbar-collapse">
        <ul class="navbar-nav">
          <li class="menu-item" v-for="menu in menuSchema" :key="menu.key">
            <a>{{ menu.title }}</a>
          </li>
        </ul>
      </div>
      <div class="mobile-navbar"></div>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {
        menuSchema: [
          { key: 'home', title: '首页' },
          { key: 'home1', title: '首页' },
          { key: 'home2', title: '首页' },
          { key: 'home3', title: '首页' },
          { key: 'home4', title: '首页' }
        ],
        keyword: ''
      }
    },
    methods: {
      handleSearch () {}
    }
  }
</script>

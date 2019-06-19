<template>
  <div class="home">
    <div class="top">
      <!--<van-dropdown-menu>
        <van-dropdown-item v-model="category" :options="categoryList" @change="changeCategory"></van-dropdown-item>
        <van-dropdown-item v-model="sort" :options="sortList" @change="changeSort"></van-dropdown-item>
      </van-dropdown-menu>-->
    </div>
  </div>
</template>

<script>
import { Tab, Tabs, List,PullRefresh,Cell,Image , DropdownMenu, DropdownItem  } from 'vant';
export default {
  name: 'Home',
  data(){
    return {
      active:2,
      dataList:[],
      category: 0,
      sort: 0,
      categoryList: [
        { text: 'wedding ideas', value: 0 },
        { text: 'wedding photography', value: 1 },
        { text: 'wedding dress', value: 2 },
        { text: 'wedding shoes', value: 3 },
        { text: 'wedding invitations', value: 4 },
        { text: 'wedding decoration', value: 5 },
      ],
      sortList: [
        { text: 'ASC', value: 0 },
        { text: 'DESC', value: 0 },
      ]
    }
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    [Cell.name]: Cell,
    [PullRefresh.name]: PullRefresh,
    [Image.name]: Image,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
  },
  methods:{
    onLoad(index) {
      const list = this.list[index];
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          const text = list.items.length + 1;
          list.items.push(text < 10 ? '0' + text : text);
        }
        list.loading = false;

        // show error info in second demo
        list.error = index === 1 && list.items.length === 10 && !list.error;
        if (list.items.length >= 40) {
          list.finished = true;
        }
      }, 500);
    },

    onRefresh(index) {
      const list = this.list[index];
      setTimeout(() => {
        list.items = [];
        list.error = false;
        list.finished = false;
        list.refreshing = false;
        window.scrollTo(0, 10);
      }, 2000);
    }
  }
}
</script>
